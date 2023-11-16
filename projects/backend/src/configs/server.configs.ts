class ServerConfigs {
  private static readonly _hostname: string = "127.0.0.1";
  private static readonly _port: number = 3100;
  private static instance: ServerConfigs | null = null;
  private constructor() {}
  public static get(): ServerConfigs {
    if (!ServerConfigs.instance) {
      ServerConfigs.instance = new ServerConfigs();
    }
    return ServerConfigs.instance;
  }
  public get hostname(): string {
    return ServerConfigs._hostname;
  }
  public get port(): number {
    return ServerConfigs._port;
  }
}

export { ServerConfigs };
