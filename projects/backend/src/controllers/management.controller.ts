import type { NextFunction, Request, Response } from "express";

class ManagementController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({
      status: "MANAGEMENT",
    });
    _next();
  }
}

export { ManagementController };
