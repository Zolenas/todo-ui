import { logger, errorHttpLogger, infoHttpLogger } from "./utils/logger.util";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import * as os from "os";
import { Router as MongoDbRouter } from "./routers/mongodb.router";


/**
 * Server.
 *
 * @export
 * @class Server
 */
export class Server {

    /** The server hostname. */
    public host: string;

    /** The server port number. */
    public port: string | number;

    /** The Express application. */
    private application: express.Express;


    /**
     * Default constructor.
     *
     * @memberof Server
     */
    constructor() {
        this.host = os.hostname();
        this.port = process.env.PORT || 20491;
        this.application = express();

        // Server related actions
        this.addMiddlewares();
        this.registerRoutes();
    }


    /**
     * Starts the server.
     *
     * @memberof Server
     */
    public start(): void {
        const server = http.createServer(this.application).listen(this.port);
        server.on("listening", () => {
            logger.info(`Listening on port ${this.port}`);
        });
    }

    /**
     * Adds middlewares to the Express application.
     *
     * @private
     * @memberof Server
     */
    private addMiddlewares(): void {
        // Enable CORS
        this.application.use(cors());
        // HTTP logging middleware
        this.application.use(errorHttpLogger());
        this.application.use(infoHttpLogger());
        // Body parsing middlewares
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
    }

    /**
     * Register routes used by the application.
     *
     * @private
     * @memberof Server
     */
    private registerRoutes(): void {
        this.application.use("/", MongoDbRouter);
    }

}

