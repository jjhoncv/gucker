export interface Component {
  suscribeEvents(): void;
  catchDom(): void;
  dom: object;
}
