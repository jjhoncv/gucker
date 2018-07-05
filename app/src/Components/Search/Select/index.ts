import { QueryDom } from '../../../vendor/selector';
import { Event } from '../../../vendor/event';

export class Select {
  private dom;
  constructor(
    private queryDom: QueryDom,
    private event: Event,
    private st: any
  ) {
    this.initialize();
  }

  private catchDom(): void {
    this.dom = this.queryDom.all(this.st);
  }

  private suscribeEvents(): void {
    this.event.on('blur', this.dom.fromText, this.onBlurFromText.bind(this));
    this.event.on('blur', this.dom.toText, this.onBlurToText.bind(this));
  }

  private onBlurFromText(evt): void {
    let valueFromText = this.dom.fromText[0].value;
    let valueToText = this.dom.toText[0].value;

    if (this.validFields(valueFromText, valueToText)) {
      this.dom.fromText[0].classList.add('u-error');
    }
  }

  private onBlurToText(evt): void {
    let valueFromText = this.dom.fromText[0].value;
    let valueToText = this.dom.toText[0].value;

    if (this.validFields(valueFromText, valueToText)) {
      this.dom.toText[0].classList.add('u-error');
    }
  }

  private validFields(fromText, toText): boolean {
    return fromText > toText;
  }

  private initialize(): void {
    this.catchDom();
    this.suscribeEvents();
  }
}
