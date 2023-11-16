import type { NextFunction, Request, Response } from "express";

class RootController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.status(200).json({
      ..._request.hateos,
      _response: {},
    });
    _next();
  }
}

export { RootController };
