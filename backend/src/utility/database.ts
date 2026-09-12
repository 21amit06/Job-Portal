import pgPromise from "pg-promise";
import * as dotenv from "dotenv";

dotenv.config({
    path: "./env/dev.env"
});

const pgp = pgPromise();

class Database {

    constructor() {}

    public connect(): any {

        const connection = {
            host: process.env.Db_host,
            database: process.env.Db_name,
            port: Number(process.env.Db_port),
            user: process.env.Db_user,
            password: process.env.Db_password
        };

        const adapter = pgp(connection);

        return adapter;
    }
}

export const db = new Database().connect();