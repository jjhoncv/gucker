import { QueryDom } from '../../vendor/selector';
import { Event } from '../../vendor/event';

import { FromTo } from './FromTo';
import { Select } from './Select';
import { Tab } from './Tab';
import { IModule } from '../../Interfaces/Module';

export class Search {
  constructor(
    private fromTo: FromTo,
    private select: Select,
    private tab: Tab
  ) {
    this.initialize();
  }
}

let fromTo: FromTo = new FromTo(new QueryDom(), new Event(), {
  fromText: '.js-fromTo-search',
  toText: '.js-toText-search'
});
let select: Select = new Select(new QueryDom(), new Event(), {
  selectBrand: '.js-selectBrand-search',
  selectModel: '.js-selectModel-search'
});
