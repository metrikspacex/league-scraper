import type { NextFunction, Request, Response } from "express";

import { ServerConfigs } from "@/configs";

const redirect = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  const { base, version } = ServerConfigs.get();
  if (!_request.url.includes(`${base}/${version}`)) {
    _response.redirect(`${base}/${version}`);
    _next();
  }
  _next();
};

export { redirect };
