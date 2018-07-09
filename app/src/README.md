# Component Web
> Controla una zona de espacio de la pantalla que podríamos denominar vista

Un componente define propiedades y métodos que están disponibles en su template, pero eso no te da licencia para meter ahí todo lo que te parezca. Es importante seguir una aproximación de diseño SOLID, y extraer toda la lógica en capas para que el componente solo se encargue de gestionar 1 única cosa: la vista.

Tenemos el siguiente componente.

```md
+--⏢ FromTo
|   +-- index.pug
|   +-- index.styl
|   +-- index.ts 
|   +-- FromTo.ts
```
```pug
//- index.pug
mixin FromTo(data)
  .c-fromTo&attributes(attributes)
    each item in data
      span #{item.label}
      input(type="text" name=item.from)
      input(type="text" name=item.to)	  
```
```stylus
// index.styl
.c-from
  display: flex;
  input[type=text]
    border 1px solid #ccc
```
```typescript
// vendor/Dom.ts
import $ from 'jquery'
export class Dom {
  private queryDom(st: any){
    let  dom = {};
    for (let  key  in  st) {
      dom[key] = $(st[key]);
    }
    return  dom;
  }
}
```
```typescript
// interfaces/module.ts
export interface Component {
  suscribeEvents(): void;
  catchDom(): void;
  initialize(): void;
  dom: object;
}
```
```typescript
// FromTo.ts
import { Component } from './Component'
export interface stFromTo {
  fromText: string;
  toText: string;
}
export class FromTo extends Dom implements Component {
  private dom;
  private constructor(private st: stFromTo) {
    this.initialize()
  }
  public catchDom(): void {
    this.dom = this.queryDom(this.st)
  }
  public suscribeEvents(): void {
    this.dom.fromText.on("blur", this.blurFromText);
    this.dom.toText.on("blur", this.blurToText);
  }
  private blurFromText(evt): void {
    
  }
  private blurShow() {
    this.dom.fromText.trigger('blur')
  }
  public initialize(): void {
    this.catchDom();
    this.suscribeEvents();
  }
}
```
```typescript
// index.ts
import { FromTo } from './FromTo'
let fromto: FromTo = new FromTo({
  fromText: '.js-fromTo-search',
  toText: '.js-toText-search'
})
```
