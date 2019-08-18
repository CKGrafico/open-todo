import { IGistService } from './igist.service';
import { injectable } from 'inversify-hooks';
import { TodoCollection } from '~/app/shared';
import { SettingsStoreState } from '~/store';

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
    return id === settings.gistId ? null : id;
  }

  public async merge(settings: SettingsStoreState, todos: TodoCollection): Promise<TodoCollection> {
    this.checkToken(settings);
    return todos;
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
          "opentodo.md": {
            "content": "[ ] Todo"
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

  private async uploadTodos(settings: SettingsStoreState, todos: TodoCollection): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${settings.gistId}?access_token=${settings.gistToken}`, {
      method: 'PATCH',
      body: `
      {
        "files": {
          "opentodo.md": {
            "content": "[ ] Updated ${Date.now()}"
          }
        }
      }
      `
    });

    if (!response.ok) {
      throw new Error(`Cannot update the gist: ${settings.gistId}`);
    }
  }
}
