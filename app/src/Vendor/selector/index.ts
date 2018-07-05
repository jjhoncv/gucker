/**
 * @class Functionality
 * @desc description
 */

export class QueryDom {
  private querys = {
    '#': 'getElementById',
    '.': 'getElementsByClassName',
    ':': 'getElementsByName',
    '=': 'getElementsByTagName',
    '*': 'querySelectorAll'
  };
  public element(selector: string) {
    let typeSelector = this.getTypeQuery(selector);
    let identifier = this.getPureSelector(selector);
    return document[typeSelector](identifier);
  }

  public all(st: any): any {
    let dom = {};
    for (let key in st) {
      dom[key] = this.element(st[key]);
    }
    return dom;
  }

  public parents(children: any, parent: any) {
    let parentNew = children.parentNode;
    while (parentNew !== document.body) {
      if (parentNew.classList.contains(parent)) {
        return parentNew;
      } else {
        parentNew = parentNew.parentNode;
      }
    }
    throw new Error('no existe su padre' + parent);
  }

  private getTypeQuery(selector: string) {
    return this.querys[selector[0]];
  }
  private getPureSelector(selector: string): string {
    return selector.substr(1, selector.length);
  }
}
