/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction, Request, Response, Router } from "express";

import { ServerConfigs } from "@/configs";

// TODO: Refactor this middleware to use new routes prop on ServerConfigs
const hateos = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  const { hostname, protocol, port } = ServerConfigs.get();
  const routeMap = ServerConfigs.get().routes;
  const routes = Object.values(routeMap);
  const generateLinks = (routes: (Router | undefined)[]) => {
    const links: Record<string, any> = {
      _self: {
        href: `${protocol}://${hostname}:${port}${_request.path}`,
      },
    };

    for (const [_index, route] of routes.entries()) {
      const { stack } = route!;

      for (const layer of stack) {
        const _path = layer.route.path as string;
        const _methods = layer.route.methods;
        const _href = `${protocol}://${hostname}:${port}${_path}`;

        if (links[_path]) {
          links[_path].methods = {
            ...links[_path].methods,
            ..._methods,
          };
        } else {
          links[_path] = {
            href: _href,
            methods: _methods,
          };
        }
      }
    }

    return links;
  };
  _request.hateos = {
    _links: generateLinks(routes),
  };
  _next();
};

export { hateos };
