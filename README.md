# Modulight

[![npm version](https://img.shields.io/npm/v/modulight.svg)](https://www.npmjs.com/package/modulight)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Estado:** 🚧 En desarrollo temprano

**Modulight** es una librería ligera para **Node.js** que ofrece:
- Gestión modular de tu aplicación
- Inyección e inversión de dependencias
- Uso de decoradores para un código más declarativo y limpio

Ideal para proyectos que buscan la flexibilidad de un sistema modular sin la sobrecarga de frameworks pesados.

---

## Instalación

```bash
npm install modulight
```

## Uso Basico

```typescript
import { Module, Injectable, Inject } from "modulight";

@Injectable()
class MyService {
  sayHello() {
    return "Hola desde MyService";
  }
}

@Module({
  providers: [MyService]
})
class AppModule {
  constructor(@Inject(MyService) private myService: MyService) {}

  start() {
    console.log(this.myService.sayHello());
  }
}

new AppModule().start();
```

## Características

* 🎯 Ligero: sin dependencias innecesarias

* 🧩 Modular: organiza tu aplicación en módulos independientes

* 🛠 Inyección de dependencias: fácil gestión de instancias y dependencias

* 🪄 Decoradores: para un código más expresivo y limpio

## Roadmap

* Soporte para middlewares

* Integración con aplicaciones HTTP

* CLI para generación de módulos

* Documentación avanzada y ejemplos

## Contribuir

Las contribuciones son bienvenidas 🤝.

Para cambios grandes, abre primero un issue para discutir lo que te gustaría modificar.

## Licencia

MIT © Microcosmix