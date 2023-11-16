import type { NextFunction, Request, Response } from "express";

class HealthController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response.json({
      status: "HEALTH",
    });
    _next();
  }
}

export { HealthController };
