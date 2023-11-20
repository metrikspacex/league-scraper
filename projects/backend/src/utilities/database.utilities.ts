import mongoose from "mongoose";

import { ServerConfigs } from "@/configs";

class Database {
  private static _databaseConnection: Promise<typeof mongoose>;
  private static instance: Database | null = null;
  private constructor() {
    const { databasePass, databaseURL, databaseUser } = ServerConfigs.get();

    Database._databaseConnection = mongoose.connect(databaseURL, {
      pass: databasePass,
      user: databaseUser,
    });
  }

  /**
   * @access public
   * @description Get the instance of Database
   */
  public static get(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * @access public
   * @description Connect to the database
   */
  public async connect(): Promise<typeof mongoose> {
    return Database.get()
      .databaseConnection.then((connection) => {
        return connection;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  /**
   * @access public
   * @description Get the connection to the database
   * @example "mongodb://localhost:27017"
   */
  private get databaseConnection(): Promise<typeof mongoose> {
    return Database._databaseConnection;
  }
  private set databaseConnection(value) {
    Database._databaseConnection = value;
  }
}

export { Database };
