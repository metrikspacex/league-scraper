import type { NextFunction, Request, Response } from "express";

import { ServerConfigs } from "@/configs";

const hateos = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  const { base, hostname, port, protocol, routes, version } =
    ServerConfigs.get();
  const _curr = _request.path.slice(1);
  const _links = {
    _self: {
      href: `${protocol}://${hostname}:${port}${base}/${version}/${_curr}`,
    },
  };

  if (`${_request.baseUrl}${_request.path.slice(1)}` === `${base}/${version}`) {
    _links._self.href = `${protocol}://${hostname}:${port}${base}/${version}`;
  }

  for (const [map, router] of Object.entries(routes)) {
    router?.stack.map((layer) => {
      const methodType = Object.keys(layer.route.methods);
      const methodValue = Object.values(layer.route.methods);

      /**
       * Note, assumption is you can't have multiple methods for a single
       * route. I don't understand why layer.route.methods of type
       * ['methodType']. Hence, the join to bring it back to a string.
       * Thus, ['methodType', 'booleanType'] can be used.
       */
      const _methods = [
        methodType.join(", ") === "_all" ? "all" : methodType.join(", "),
        methodValue.join(", "),
      ];

      /*
        const _links: {
          _self: {
              href: string;
          };
          "/api/v1/account": {
              href: string;
              methods: {
                  get: boolean;
              };
          };
          ...
        }
      */

      // TODO: Define _links type
      // @ts-expect-error
      if (_links[map] === undefined) {
        // @ts-expect-error
        _links[map] = {
          href: `${protocol}://${hostname}:${port}${map}`,
          methods: {
            [`${_methods[0]}`]: Boolean(_methods[1]),
          },
        };
      } else {
        // @ts-expect-error
        _links[map].methods = {
          // @ts-expect-error
          ..._links[map].methods,
          [`${_methods[0]}`]: Boolean(_methods[1]),
        };
      }
    });
  }

  _request.hateos = {
    _links,
  };

  _response.on("finish", () => {
    console.log(_response);
  });

  _next();
};
export { hateos };
