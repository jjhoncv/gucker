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
# Componente Search
> Se divide en componentes dependientes a su contexto.

Se considera realizar estas separaciones cuando tenemos dependencia entre los componentes en un solo contexto.

El componente search esta compuesto por los componentes:
- FromTo
- Radio
- Select
- template: `index.pug`
- estilos: `index.styl`
- implementación: `index.ts`
- comportamiento: `Search.ts`

### Estructura ( Compuesto ) 
```md
+--⏢ Search
|  +--⏢ FromTo
|     +-- index.pug
|     +-- index.styl
|     +-- index.ts 
|     +-- FromTo.ts
|  +--⏢ Radio
|     +-- index.pug
|     +-- index.styl
|     +-- index.ts 
|     +-- Radio.ts 
|  +--⏢ Select
|     +-- index.pug
|     +-- index.styl
|     +-- index.ts 
|     +-- Select.ts 
+-- index.pug
+-- index.styl
+-- index.ts
+-- Search.ts 
```

Por fines prácticos se le puso esos nombres, también se podrían definir asociándolos a su contexto:
- FromTo-Search
- Radio-Search
- Select-Search

La finalidad de realizar una composición de componentes, es facilitar la libertad de construcción.


### Template
Es la estructura del componente, se define en html, en este caso con el preprocesador pug.
Pug nos provee:
- `mixin` encapsulación y extension
- `include`  desacoplamos nuestro componente

### Estilos
Como se ve nuestro componente, usamos stylus considerando:
- `@require`  desacoplamos nuestro componente

### Comportamiento
Dependiendo de la abstracción se considera el desacoplamiento por componentes, usándolos como dependencias del contexto actual.
```typescript
// Search.ts
import { FromTo } from './FromTo';
import { Select } from './Select';
import { Tab } from './Tab';
import { IModule } from '../../Interfaces/Module';

export class Search implements IModule {
  private fromTo: FromTo;
  private select: Select;
  private tab: Tab;
  constructor(
    private fromTo: FromTo,
    private select: Select,
    private tab: Tab
  ){
    this.fromTo = fromTo;
    this.select = select;
    this.tab = tab;
  }
  run():void {
    this.fromTo.blurShow();
    this.select.disabled();
    this.tab.default();
  }
}
```
```typescript
// index.ts
import { FromTo } from './FromTo';
import { Select } from './Select';
import { Tab } from './Tab';

let search: Search = new Search(
  new FromTo({
    fromText: '.js-fromTo-search',
    toText: '.js-toText-search'
  }),
  new Select(),
  new Tab()
);
setTimeout(search.run, 5000)
```
```typescript
// page.ts
import './../../Search';
```
  
