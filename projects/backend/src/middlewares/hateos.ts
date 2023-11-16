import type { NextFunction, Request, Response } from "express";

import { ServerConfigs } from "@/configs";

const hateos = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  _request.hateos = {
    _links: {
      _self: {
        href: `${ServerConfigs.get().protocol}://${
          ServerConfigs.get().hostname
        }:${ServerConfigs.get().port}/${_request.path.slice(1)}`,
      },
      health: {
        href: `${ServerConfigs.get().protocol}://${
          ServerConfigs.get().hostname
        }:${ServerConfigs.get().port}/health`,
      },
      management: {
        href: `${ServerConfigs.get().protocol}://${
          ServerConfigs.get().hostname
        }:${ServerConfigs.get().port}/management`,
      },
      root: {
        href: `${ServerConfigs.get().protocol}://${
          ServerConfigs.get().hostname
        }:${ServerConfigs.get().port}/`,
      },
      user: {
        href: `${ServerConfigs.get().protocol}://${
          ServerConfigs.get().hostname
        }:${ServerConfigs.get().port}/user`,
      },
    },
  };
  _next();
};

export { hateos };
