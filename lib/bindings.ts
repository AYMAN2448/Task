interface Env {
  DB: any;  // استخدام any لتجنب خطأ النوع
}

declare global {
  function getBindings(): Env;
}

export function getBindings() {
  return process.env as any as Env;
}
