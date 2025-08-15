import { CoreModule } from "./core.module";
import { ModuleRegistry } from "./module.registry";

// Obtener la metadata del módulo
const metadata = Reflect.getMetadata("module:metadata", CoreModule);

// Registrar el módulo en el registry
ModuleRegistry.register(CoreModule, metadata);

const publicClasses = ModuleRegistry.resolve(CoreModule);

// Lanzar la clase por consola
console.log(publicClasses);
