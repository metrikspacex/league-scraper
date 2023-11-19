import type { NextFunction, Request, Response } from "express";

// TODO: Lock down access to this controller.
class PublicController {
  public async access(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _next();
  }
}
export { PublicController };
