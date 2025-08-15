import { ModuleRegistry } from "../module.registry";
import "reflect-metadata";

export interface ModuleMetadata {
  declarations?: any[];
  exports?: any[];
  imports?: any[];
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata("module:metadata", metadata, target);
    ModuleRegistry.register(target, metadata); // Auto-registro
  };
}
