import { Collection, Db, MongoClient } from "mongodb";
import { logger } from "../utils/logger.util";


/**
 * MongoDB wrapper service.
 *
 * @export
 * @class MongoDBService
 */
export class MongoDBService {

    /** The MongoDB database. */
    private db: Db;


    /**
     * Sets the database to use. Connects to the database if not already connected.
     *
     * @param {string} name the database name to connect to
     * @returns {Promise<void>} resolved if switch to specified database successful, rejected otherwise
     * @memberof MongoDBService
     */
    public database(name: string): Promise<void> {
        if (!this.db) {
            const dbHost = process.env.MONGODB_HOST || "127.0.0.1";
            const dbPort = process.env.MONGODB_PORT || 27017;

            const url = `mongodb://${dbHost}:${dbPort}/${name}`;

            logger.debug(`DB URL: ${url}`);

            return this.connect(url);

        } else {
            if (this.db.databaseName !== name) this.db = this.db.db(name);

            return Promise.resolve();
        }
    }

    /**
     * Creates or uses the specified collection.
     *
     * @param {string} name the collection to use
     * @returns {Promise<Collection<any>>} resolved with the collection object, rejected if a problem occured
     * @memberof MongoDBService
     */
    public collection(name: string): Promise<Collection<any>> {
        return this.db.createCollection(name);
    }

    /**
     * Closes the current connection to the database.
     *
     * @returns {Promise<void>} resolved when successfully disconnected, rejected otherwise
     * @memberof MongoDBService
     */
    public close(): Promise<void> {
        this.db.removeAllListeners("close");

        return this.db.close()
            .then(() => {
                this.db = undefined;
                logger.info("Connection closed");
            })
            .catch(err => {
                logger.error(`Could not close connection: ${err.message}`);
                throw err;
            });
    }

    /**
     * Connects to the specified URL and binds connection-related listeners.
     *
     * @private
     * @param {string} url the database URL to connect to
     * @returns {Promise<void>} resolved if connection successful, rejected otherwise
     * @memberof MongoDBService
     */
    private connect(url: string): Promise<void> {
        return MongoClient.connect(url, { autoReconnect: true })
            .then(db => {
                this.db = db;
                logger.info(`Connected to "${url}"`);

                // Listening to connection-related events
                this.db.on("reconnect", () => logger.info(`Reconnected to "${url}"`));
                this.db.on("close", () => logger.error(`Lost connection to "${url}"`));
            })
            .catch(err => {
                logger.error(`Could not establish connection to "${url}"`);
                throw err;
            });
    }

}
