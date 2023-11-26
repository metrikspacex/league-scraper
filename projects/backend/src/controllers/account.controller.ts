import type { NextFunction, Request, Response } from "express";

class AccountController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({}).status(200);
    _next();
  }

  public async create(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({}).status(200);
    _next();
  }

  public async findByEmail(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({}).status(200);
    _next();
  }

  public async findByUsername(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({}).status(200);
    _next();
  }
}
export { AccountController };
