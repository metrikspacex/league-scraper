import type { Application, NextFunction, Request, Response } from "express";

import { Logger } from "@/utilities";

const routeLog = async (
  application: Application,
  options: {
    path: string;
  }
): Promise<void> => {
  const { path } = options;

  const routeLogMiddleware = (
    _request: Request,
    _response: Response,
    _next: NextFunction
  ) => {
    const time = () => {
      const time = new Date();
      return time.toLocaleTimeString();
    };

    _response.on("close", () => {
      const bytes = Buffer.from(JSON.stringify(_request.body)).length;
      Logger.get().log(
        "Routes",
        `${time()} - ${_request.method} - Response:[${(
          _response._contentLength / 1000
        ).toFixed(2)}KB] / Request:[${(bytes / 1000).toFixed(2)}KB] - ${
          _request.path
        } - ${_response.statusCode}`
      );
    });

    _next();
  };

  application.use(path, routeLogMiddleware);
};
export { routeLog };
