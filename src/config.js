import dotenv from "dotenv";
dotenv.config();

class Config {
  constructor() {
    this.configPort = process.env.PORT || 8080;
    this.configDatabaseURL = process.env.MONGO_URL || process.env.MONGO_LOCAL;
    this.configTokenLife = process.env.ACCESS_TOKEN_LIFE;
    this.configTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    this.configDbName = process.env.DB_NAME;
    this.configSalt = process.env.SALT;
    this.configRefreshTokenSize = process.env.REFRESH_TOKEN_SIZE;
  }
  get port() {
    return this.configPort;
  }

  get env() {
    return process.env.NODE_ENV;
  }

  get salt() {
    return this.configSalt;
  }

  get refreshTokenSize() {
    return this.configRefreshTokenSize;
  }

  get databaseURL() {
    return this.configDatabaseURL;
  }

  get tokenLife() {
    return this.configTokenLife;
  }

  get tokenSecret() {
    return this.configTokenSecret;
  }

  get dbName() {
    return this.configDbName;
  }
}

const config = new Config();
export default config;
