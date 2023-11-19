import type { NextFunction, Request, Response } from "express";

class VersionController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response
      .json({
        response: {},
        ..._request.hateos,
      })
      .status(200);
    _next();
  }
}
export { VersionController };
