import type { NextFunction, Request, Response } from "express";

// TODO: Make a homepage defining routes and their usage
class RootController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({}).status(200);
    _next();
  }
}
export { RootController };
