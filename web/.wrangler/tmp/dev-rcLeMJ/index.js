var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/index.js
var MARKDOWN_POR_RUTA = {
  "/": "/index.md",
  "/index.html": "/index.md",
  "/vecinos": "/vecinos.md",
  "/vecinos.html": "/vecinos.md"
};
function prefiereMarkdown(request) {
  const accept = request.headers.get("accept") || "";
  const calidades = /* @__PURE__ */ new Map();
  for (const parte of accept.split(",")) {
    const [tipo, ...params] = parte.trim().split(";");
    const q = params.map((p) => p.trim().match(/^q=([0-9.]+)$/i)).find(Boolean);
    calidades.set(tipo.trim().toLowerCase(), q ? parseFloat(q[1]) : 1);
  }
  const md = calidades.get("text/markdown") ?? -1;
  const html = calidades.get("text/html") ?? -1;
  return md > 0 && md >= html;
}
__name(prefiereMarkdown, "prefiereMarkdown");
function normalizar(pathname) {
  const sinBarra = pathname.replace(/\/+$/, "");
  return sinBarra === "" ? "/" : sinBarra;
}
__name(normalizar, "normalizar");
function markdown404(origen) {
  return `# 404 \u2014 P\xE1gina no encontrada

Esta URL no existe en el sitio de Carreteras 2000 S.A.

## D\xF3nde seguir

- [Inicio](${origen}/) \u2014 empresa, productos, obras y contacto. En markdown: ${origen}/index.md
- [Pavimento para vecinos](${origen}/vecinos) \u2014 calculadora de costo por metro de frente. En markdown: ${origen}/vecinos.md
- [Resumen del sitio para modelos](${origen}/llms.txt)
- [\xCDndice de p\xE1ginas](${origen}/sitemap-index.xml)

## Contacto

WhatsApp +5492915065029 \xB7 info@carreteras2000.com.ar
`;
}
__name(markdown404, "markdown404");
function conCabeceras(respuesta, cabeceras) {
  const salida = new Response(respuesta.body, respuesta);
  for (const [k, v] of Object.entries(cabeceras)) salida.headers.set(k, v);
  return salida;
}
__name(conCabeceras, "conCabeceras");
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origen = url.origin;
    const quiereMd = prefiereMarkdown(request);
    if (quiereMd) {
      const gemela = MARKDOWN_POR_RUTA[normalizar(url.pathname)];
      if (gemela) {
        const md = await env.ASSETS.fetch(new URL(gemela, origen));
        if (md.ok) {
          return conCabeceras(md, {
            "Content-Type": "text/markdown; charset=utf-8",
            Vary: "Accept, Accept-Encoding",
            "Cache-Control": "public, max-age=300"
          });
        }
      }
    }
    const respuesta = await env.ASSETS.fetch(request);
    if (respuesta.status === 404 && quiereMd) {
      return new Response(markdown404(origen), {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept, Accept-Encoding"
        }
      });
    }
    if (url.pathname.endsWith(".md")) {
      return conCabeceras(respuesta, {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept, Accept-Encoding"
      });
    }
    return conCabeceras(respuesta, { Vary: "Accept, Accept-Encoding" });
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-R9zvLb/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-R9zvLb/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
