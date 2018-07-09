import $ from 'jquery';
export abstract class Dom {
  constructor() {
    this.catchDom();
    this.suscribeEvents();
  }
  protected queryDom(st: any): JQuery {
    let dom: JQuery;
    for (let key in st) {
      dom[key] = $(st[key]);
    }
    return dom;
  }

  protected abstract catchDom();
  protected abstract suscribeEvents();
}
