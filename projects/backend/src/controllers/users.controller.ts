import type { NextFunction, Request, Response } from "express";

class UserController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({});
    _next();
  }
}

export { UserController };
