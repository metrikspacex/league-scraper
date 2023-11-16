import chalk from "chalk";

class Logger {
  private static instance: Logger | null = null;
  private constructor() {}
  public static get(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public debug(from: string, message: string): void {
    console.debug(
      `[${from.toUpperCase()}:DEBUG]: ${chalk.cyanBright(
        JSON.stringify(message, null, 2)
      )}`
    );
  }
  public error(from: string, message: string): void {
    console.error(`[${from.toUpperCase()}:ERROR]: ${chalk.red(message)}`);
  }
  public info(from: string, message: string): void {
    console.info(`[${from.toUpperCase()}:INFO]: ${chalk.blue(message)}`);
  }
  public warn(from: string, message: string): void {
    console.warn(`[${from.toUpperCase()}:WARNING]: ${chalk.yellow(message)}`);
  }
}

export { Logger };
