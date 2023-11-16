import type { NextFunction, Request, Response } from "express";

import { Logger } from "@/utilities";

// TODO: Add ability for response time, and status code
const routeLog = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  Logger.get().log("#FFA500", "Routes", `${_request.method} ${_request.path}`);
  _next();
};

export { routeLog };
