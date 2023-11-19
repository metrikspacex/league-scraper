import type { NextFunction, Request, Response } from "express";

class AssetController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.status(200).json({
      response: {},
      ..._request.hateos,
    });
    _next();
  }
}
export { AssetController };