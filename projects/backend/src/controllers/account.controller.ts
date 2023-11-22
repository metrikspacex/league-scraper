/* eslint-disable eqeqeq */
import type { NextFunction, Request, Response } from "express";

import { AccountModel } from "@/models";

class AccountController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    _response
      .json({
        response: {},
        ..._request.hateos,
      })
      .status(200);
    _next();
  }

  public async create(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    console.log(_request.body);
    _response
      .json({
        response: {},
        ..._request.hateos,
      })
      .status(201);
    _next();
  }

  public async findByEmail(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    const { email, password } = _request.body;
    const account = await AccountModel.findOne().byEmail(email);

    if (account === null) {
      _response
        .json({
          response: "No account found!",
        })
        .status(200);
    } else if (account.password === password) {
      _response
        .json({
          response: {
            authToken: "1234567890",
          },
        })
        .status(200);
    } else {
      _response
        .json({
          response: "Invalid password for that account",
        })
        .status(200);
    }
    _next();
  }

  public async findByUsername(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    const { password, username } = _request.body;
    const account = await AccountModel.findOne().byUsername(username);

    if (account === null) {
      _response
        .json({
          response: "No account found!",
        })
        .status(200);
    } else if (account.password === password) {
      _response
        .json({
          response: {
            authToken: "1234567890",
          },
        })
        .status(200);
    } else {
      _response
        .json({
          response: "Invalid password for that account",
        })
        .status(200);
    }
    _next();
  }
}
export { AccountController };
