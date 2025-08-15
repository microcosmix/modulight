import { describe, it, expect, vi } from "vitest";
import { Module } from "../../src/decorators/module.decorator";
import { ModuleRegistry } from "../../src/module.registry";

describe("Module decorator", () => {
  it("debe definir metadata y registrar el módulo", () => {
    const registerSpy = vi.spyOn(ModuleRegistry, "register");

    @Module({ declarations: ["Foo"], exports: ["Bar"], imports: [] })
    class TestModule {}

    const metadata = Reflect.getMetadata("module:metadata", TestModule);
    expect(metadata).toEqual({
      declarations: ["Foo"],
      exports: ["Bar"],
      imports: [],
    });

    expect(registerSpy).toHaveBeenCalledWith(TestModule, metadata);
  });

  it("debe manejar metadata sin propiedades definidas", () => {
    @Module({})
    class EmptyModule {}

    const metadata = Reflect.getMetadata("module:metadata", EmptyModule);
    expect(metadata).toEqual({});
  });

  it("debe importar y combinar exportaciones de módulos importados", () => {
    class ExportA {}
    class ExportB {}

    @Module({ exports: [ExportA] })
    class SubModuleA {}

    @Module({ exports: [ExportB] })
    class SubModuleB {}

    @Module({ imports: [SubModuleA, SubModuleB] })
    class MainModule {}

    const mainMetadata = Reflect.getMetadata("module:metadata", MainModule);
    expect(mainMetadata.imports).toHaveLength(2);

    expect(() => ModuleRegistry.resolve<any>("ExportA")).toThrow();
    expect(() => ModuleRegistry.resolve<any>(ExportA)).not.toThrow();

    expect(() => ModuleRegistry.resolve<any>("ExportB")).toThrow();
    expect(() => ModuleRegistry.resolve<any>(ExportB)).not.toThrow();
  });

  it("debe lanzar error si se intenta resolver algo no exportado", () => {
    class HiddenService {}

    @Module({ exports: [] })
    class SubModule {}

    expect(() => ModuleRegistry.resolve(HiddenService)).toThrowError(
      "No export found for token: HiddenService",
    );
  });

  it("debe lanzar error si se repite la misma clase en declarations", () => {
    class MyService {}

    expect(() => {
      @Module({
        declarations: [MyService, MyService],
      })
      class RepeatedDeclModule {}
    }).toThrowError("Clase duplicada en declarations: MyService");
  });
});
