import type { Application, NextFunction, Request, Response } from "express";

import { ServerConfigs } from "@/configs";

const hateos = async (
  application: Application,
  options: {
    path: string;
  }
): Promise<void> => {
  const { path } = options;

  const hateosMiddleware = (
    _request: Request,
    _response: Response,
    _next: NextFunction
  ) => {
    const { base, hostname, port, protocol, routes, version } =
      ServerConfigs.get();
    const _curr = _request.path.slice(1);
    const _links = {
      _self: {
        href: `${protocol}://${hostname}:${port}/${_curr}`,
      },
    };

    if (
      `${_request.baseUrl}${_request.path.slice(1)}` === `${base}/${version}`
    ) {
      _links._self.href = `${protocol}://${hostname}:${port}${base}/${version}`;
    }

    for (const [_map, router] of Object.entries(routes)) {
      router?.stack.map((layer) => {
        const pathValue = layer.route.path as string;
        const methodType = Object.keys(layer.route.methods);
        const methodValue = Object.values(layer.route.methods);
        const _methods = [
          methodType.join(", ") === "_all" ? "all" : methodType.join(", "),
          methodValue.join(", "),
        ];

        // TODO: Define _links type
        // @ts-expect-error
        if (_links[pathValue] === undefined) {
          // @ts-expect-error
          _links[pathValue] = {
            href: `${protocol}://${hostname}:${port}${pathValue}`,
            methods: {
              [`${_methods[0]}`]: Boolean(_methods[1]),
            },
          };
        } else {
          // @ts-expect-error
          _links[pathValue].methods = {
            // @ts-expect-error
            ..._links[pathValue].methods,
            [`${_methods[0]}`]: Boolean(_methods[1]),
          };
        }
      });
    }

    const json_ = _response.json;
    _response.json = (object) => {
      object.hateos = {
        ..._links,
      };
      json_.call(_response, object);
      return _response;
    };

    _next();
  };

  application.use(path, hateosMiddleware);
};
export { hateos };
