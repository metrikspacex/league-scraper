import bodyParser from "body-parser";
import type { Application } from "express";

const parse = async (
  application: Application,
  limit: string
): Promise<void> => {
  application.use(bodyParser.json({ limit }));
  application.use(bodyParser.urlencoded({ extended: true, limit }));
};
export { parse };
