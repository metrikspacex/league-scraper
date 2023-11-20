import type { NextFunction, Request, Response } from "express";

// TODO: Make a homepage defining routes and their usage
class RootController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response
      .json({
        data: {},
        ..._request.hateos,
      })
      .status(200);
    _next();
  }
  public async incoming(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    console.log(_request.body);
    _response
      .json({
        data: {},
      })
      .status(200);
    _next();
  }
}
export { RootController };
