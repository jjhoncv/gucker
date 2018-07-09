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
  
