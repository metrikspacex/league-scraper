import type { NextFunction, Request, Response } from "express";

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
