interface Env {
  DB: D1Database;
}

declare global {
  function getBindings(): Env;
}

export function getBindings() {
  // في بيئة Cloudflare، يتم حقن المتغيرات عبر `env`
  return process.env as any as Env;
}
