import { IGistService } from './igist.service';
import { injectable } from 'inversify-hooks';
import { TodoCollection, Todo } from '~/app/shared';
import { SettingsStoreState } from '~/store';
import { TodoState } from '../todo';

const FILE_NAME = 'opentodo.md';
const DONE_SYMBOL = 'X';
const LIST_ITEM_REGEX = /- \[([X| ])\] (.*) \$%\$ (.*)/gm;

@injectable()
export class GistService implements IGistService {
  private apiUrl = 'https://api.github.com/gists';
  public isLoading = false;

  public async sync(settings: SettingsStoreState, todos: TodoCollection): Promise<string | null> {
    if (this.isLoading) {
      return null;
    }

    this.isLoading = true;
    this.checkToken(settings);
    const id = await this.createIfNotExist(settings);

    await this.uploadTodos({gistId: id, gistToken: settings.gistToken}, todos);

    this.isLoading = false;
    return id;
  }

  public async merge(settings: SettingsStoreState, todos: TodoCollection): Promise<TodoCollection> {
    this.checkToken(settings);

    const response = await fetch(`${this.apiUrl}/${settings.gistId}?access_token=${settings.gistToken}`);

    if (!response.ok) {
      throw new Error(`Cannot get items from the gist`);
    }

    const results = await response.json();

    if (!results || !results.files || !results.files[FILE_NAME]) {
      return todos;
    }

    return this.deepMerge(results.files[FILE_NAME].content, todos);
  }

  private checkToken(settings: SettingsStoreState): void {
    if (!settings.gistToken) {
      throw new Error('Gist token is mandatory');
    }
  }

  private async createIfNotExist(settings: SettingsStoreState): Promise<string> {
    if (settings.gistId) {
      const response = await fetch(`${this.apiUrl}/${settings.gistId}?access_token=${settings.gistToken}`);

      if (!response.ok) {
        throw new Error(`Cannot get gist: ${settings.gistId}`);
      }

      return settings.gistId;
    }

    const response = await fetch(`${this.apiUrl}?access_token=${settings.gistToken}`, {
      method: 'POST',
      body: `
      {
        "description": "OpenTodo List",
        "public": false,
        "files": {
          "${FILE_NAME}": {
            "content": "- [ ] My first Todo"
          }
        }
      }
      `
    });

    if (!response.ok) {
      throw new Error(`Cannot create new gist.`);
    }

    const results = await response.json();

    return results.id;
  }

  private todosToTemplate(todos: TodoCollection): string {
    const listParts = Object.values(todos).map((todo: Todo) => {
      return `- [${todo.state === TodoState.Done ? DONE_SYMBOL : ' '}] ${todo.value} $%$ ${todo.id}`;
    });

    return listParts.join('\\r');
  }

  private async uploadTodos(settings: SettingsStoreState, todos: TodoCollection): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${settings.gistId}?access_token=${settings.gistToken}`, {
      method: 'PATCH',
      body: `
      {
        "files": {
          "${FILE_NAME}": {
            "content": "${this.todosToTemplate(todos)}"
          }
        }
      }
      `
    });

    if (!response.ok) {
      throw new Error(`Cannot update the gist: ${settings.gistId}`);
    }
  }

  private deepMerge(serverTodosRaw: string, todos: TodoCollection): TodoCollection {
    const serverTodos = this.extractTodosFromRaw(serverTodosRaw);
    // TODO: better approach for deleted todos in offline
    return {...todos, ...serverTodos};
  }

  private extractTodosFromRaw(todosRaw: string): TodoCollection {
    if (!todosRaw) {
      return {};
    }

    const todoCollection = {} as TodoCollection;
    const found = todosRaw.match(LIST_ITEM_REGEX);
    if (!found || found.length < 1) {
      return {};
    }

    found.forEach(part => {

      const result = LIST_ITEM_REGEX.exec(part);
      LIST_ITEM_REGEX.lastIndex = 0;
      if (!result || result.length < 1 || !result[1] || !result[2] || !result[3]) {
        return;
      }

      const [, state, value, id] = result;
      const idn = Number(id);

      todoCollection[idn] = {
        id: idn,
        state: state === DONE_SYMBOL ? TodoState.Done : TodoState.Pending,
        value: value
      };
    });

    return todoCollection;
  }
}
