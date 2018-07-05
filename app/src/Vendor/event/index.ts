export class Event {
  public on(event: string, selector: any, callback) {
    if (!selector.length || window === selector) {
      selector = [selector];
    }
    for (var i = 0; i < selector.length; i++) {
      try {
        selector[i].addEventListener(event, callback);
      } catch (e) {
        continue;
      }
    }
  }
}
