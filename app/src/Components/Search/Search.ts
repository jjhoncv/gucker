import { FromTo } from './FromTo';
import { Select } from './Select';
import { Tabs } from './../Tabs';

export class Search {
  constructor(
    private fromTo: FromTo;
    private select: Select;
    private tabs: Tabs;
  ) {
    this.initialize();
  }
  initialize() {
    alert('ddd');
    // this.fromTo.dom.
  }
}
