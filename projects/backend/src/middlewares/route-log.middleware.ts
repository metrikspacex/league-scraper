import type { NextFunction, Request, Response } from "express";

import { Logger } from "@/utilities";

const routeLog = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  const time = () => {
    const time = new Date();
    return time.toLocaleTimeString();
  };
  _response.on("finish", () => {
    Logger.get().log(
      "#FFA500",
      "Routes",
      `${time()} - ${_request.method} - ${_request.path} - ${
        _response.statusCode
      }`
    );
  });

  _next();
};
export { routeLog };
