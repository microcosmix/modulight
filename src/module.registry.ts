import { ModuleMetadata } from "./decorators/module.decorator";

export class ModuleRegistry {
  private static declarations = new Map<any, any>();
  private static exports = new Map<any, any>();

  static register(moduleClass: any, metadata: ModuleMetadata) {
    // Registrar declaraciones locales
    for (const decl of metadata.declarations || []) {
      if (this.declarations.has(decl)) {
        throw new Error(`Clase duplicada en declarations: ${decl.name}`);
      }
      this.declarations.set(decl, decl);
    }

    // Registrar exportaciones locales
    for (const exp of metadata.exports || []) {
      this.exports.set(exp, exp);
    }

    // Registrar exportaciones de módulos importados
    for (const importedModule of metadata.imports || []) {
      const importedMeta = Reflect.getMetadata(
        "module:metadata",
        importedModule,
      );
      if (!importedMeta) continue;

      for (const exp of importedMeta.exports || []) {
        this.exports.set(exp, exp);
      }
    }
  }

  static resolve<T extends new (...args: any[]) => any>(
    token: T,
  ): InstanceType<T> {
    if (!this.exports.has(token)) {
      throw new Error(`No export found for token: ${token.name}`);
    }
    return new token();
  }
}
