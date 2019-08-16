export async function nextTick(time = 10) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
