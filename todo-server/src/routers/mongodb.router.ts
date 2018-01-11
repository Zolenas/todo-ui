import { logger } from "../utils/logger.util";
import { MongoDBService } from "../services/mongodb.service";
import { ObjectID } from "mongodb";
import * as express from "express";


/**
 * MongoDB database router.
 *
 * @class MongoRouter
 */
class MongoRouter {

    /** The Express router. */
    public router: express.Router;

    /** The MongoDB service. */
    private mongodbService: MongoDBService;


    /**
     * Default constructor.
     *
     * @memberof MongoRouter
     */
    constructor() {
        this.mongodbService = new MongoDBService();

        // Create router and register routes
        this.router = express.Router();
        this.registerRoutes();
    }


    /**
     * Returns specified item from given database and collection.
     *
     * @private
     * @param {express.Request} req the request sent by the user
     * @param {express.Response} res the response sent to the user
     * @param {express.NextFunction} next the next function
     * @returns {Promise<void>} void promise
     * @memberof MongoRouter
     */
    private async getOne(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await this.mongodbService.database(req.params.database);
            const collection = await this.mongodbService.collection(req.params.collection);
            const result = await collection.findOne({ _id: new ObjectID(req.params.id) });

            if (!result) {
                res
                    .status(404)
                    .end();

            } else {
                res
                    .status(200)
                    .send(result);
            }

        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            res
                .status(500)
                .end();
        }
    }

    /**
     * Returns all items from given database and collection.
     *
     * @private
     * @param {express.Request} req the request sent by the user
     * @param {express.Response} res the response sent to the user
     * @param {express.NextFunction} next the next function
     * @returns {Promise<void>} void promise
     * @memberof MongoRouter
     */
    private async getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await this.mongodbService.database(req.params.database);
            const collection = await this.mongodbService.collection(req.params.collection);
            const result = await collection.find({}).toArray();

            if (result.length === 0) {
                res
                    .status(404)
                    .end();

            } else {
                res
                    .status(200)
                    .send(result);
            }

        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            res
                .status(500)
                .end();
        }
    }

    /**
     * Creates a new item in given database and collection.
     *
     * @private
     * @param {express.Request} req the request sent by the user
     * @param {express.Response} res the response sent to the user
     * @param {express.NextFunction} next the next function
     * @returns {Promise<void>} void promise
     * @memberof MongoRouter
     */
    private async create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await this.mongodbService.database(req.params.database);
            const collection = await this.mongodbService.collection(req.params.collection);
            req.body.createdOn = Date.now();
            const result = await collection.insertOne(req.body);

            res
                .status(201)
                .send(result.ops[0]);

        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            res
                .status(500)
                .end();
        }
    }

    /**
     * Updates specified item in given database and collection.
     *
     * @private
     * @param {express.Request} req the request sent by the user
     * @param {express.Response} res the response sent to the user
     * @param {express.NextFunction} next the next function
     * @returns {Promise<void>} void promise
     * @memberof MongoRouter
     */
    private async update(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await this.mongodbService.database(req.params.database);
            const collection = await this.mongodbService.collection(req.params.collection);
            req.body.updatedOn = Date.now();
            const result = await collection.updateOne({ _id: new ObjectID(req.params.id) }, { $set: req.body }, { upsert: true });

            res
                .status(200)
                .send(result);

        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            res
                .status(500)
                .end();
        }
    }

    /**
     * Deletes specified item from given database and collection.
     *
     * @private
     * @param {express.Request} req the request sent by the user
     * @param {express.Response} res the response sent to the user
     * @param {express.NextFunction} next the next function
     * @returns {Promise<void>} void promise
     * @memberof MongoRouter
     */
    private async delete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            await this.mongodbService.database(req.params.database);
            const collection = await this.mongodbService.collection(req.params.collection);
            const result = await collection.deleteOne({ _id: new ObjectID(req.params.id) });

            if (result.deletedCount === 0) {
                res
                    .status(404)
                    .end();

            } else {
                res
                    .status(204)
                    .end();
            }

        } catch (err) {
            logger.error(`An error occured: ${err.message}`);
            res
                .status(500)
                .end();
        }
    }

    /**
     * Registers routes and bind them to the Express router.
     *
     * @private
     * @memberof MongoRouter
     */
    private registerRoutes(): void {
        this.router.get("/:database/:collection/:id", this.getOne.bind(this));
        this.router.get("/:database/:collection", this.getAll.bind(this));
        this.router.post("/:database/:collection", this.create.bind(this));
        this.router.put("/:database/:collection/:id", this.update.bind(this));
        this.router.delete("/:database/:collection/:id", this.delete.bind(this));
    }

}

export const Router = new MongoRouter().router;
