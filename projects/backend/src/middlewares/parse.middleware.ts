import bodyParser from "body-parser";
import type { Application } from "express";

const parse = async (
  application: Application,
  options: {
    extended: boolean;
    limit: ParseLimit;
  }
): Promise<void> => {
  const { extended, limit } = options;

  application.use(bodyParser.json({ limit }));
  application.use(bodyParser.urlencoded({ extended, limit }));
};
export { parse };
