import { QueryDom } from '../../../Vendor/selector';
import { Event } from '../../../vendor/event';
import { IModule } from '../../../Interfaces/Module';

export class FromTo implements IModule {
  private dom;
  constructor(
    private queryDom: QueryDom,
    private event: Event,
    private st: any
  ) {
    this.initialize();
  }

  public catchDom(): void {
    this.dom = this.queryDom.all(this.st);
  }

  public suscribeEvents(): void {
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

  public initialize(): void {
    this.catchDom();
    this.suscribeEvents();
  }
}
