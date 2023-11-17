/* eslint-disable sonarjs/no-identical-functions */
import type { NextFunction, Request, Response } from "express";

class ChampionController {
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

  public async show(
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

  public async store(
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

export { ChampionController };
