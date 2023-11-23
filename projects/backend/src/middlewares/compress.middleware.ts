import compression from "compression";
import type { Application, Request, Response } from "express";

const compress = async (
  application: Application,
  options: {
    level: number;
    memLevel: number;
  }
): Promise<void> => {
  const { level, memLevel } = options;

  const shouldCompress = (_request: Request, _response: Response) => {
    if (_request.headers["x-no-compression"]) return false;
    return compression.filter(_request, _response);
  };

  application.use(
    compression({
      filter: shouldCompress,
      level,
      memLevel,
    })
  );
};
export { compress };
