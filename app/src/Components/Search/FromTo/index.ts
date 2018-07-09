import { Component } from './../../../Interfaces/Component';
import { Dom } from './../../../Vendor/Dom';

export interface stFromTo {
  fromText: string;
  toText: string;
}

export interface domFromTo {
  fromText: JQuery;
  toText: JQuery;
}

export class FromTo extends Dom implements Component {
  public dom: {
    fromText: JQuery;
    toText: JQuery;
  };
  private constructor(private st: stFromTo) {
    super();
  }
  public catchDom(): void {
    this.dom.fromText = this.queryDom(this.st.fromText);
    this.dom.toText = this.queryDom(this.st.toText);
  }
  public suscribeEvents(): void {
    this.dom.fromText.on('blur', this.blurFromText);
  }
  public blurFromText(evt: Event): void {}
  public blurShow() {
    this.dom.fromText.trigger('blur');
  }
  public asyncInitialize(): void {
    this.catchDom();
    this.suscribeEvents();
  }
}
