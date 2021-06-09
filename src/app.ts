import bodyParser from 'body-parser';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { createNamespace, Namespace } from 'cls-hooked';
import { logger } from './utils/logger';
import ClsMiddleware from './middleware/cls-middleware';
import ApiTracingMiddleware from './middleware/api-tracing-middleware';
import AuthMiddleware from './middleware/auth-middleware';
import MonitoringHelper from './utils/monitoring/monitoring-helper';
import ErrorHandlingMiddleware from './middleware/error-handling-middleware';

import ClsUtils from './utils/ClsUtils';
import Constants from './constants/constants';
import HealthRoute from './routes/health-route';
import ArticlesRoute from './routes/articles-route';
import DatabaseService from './db/database-service';
import Config from './config/config';

class App {
	public express: Express;

	constructor() {
		this.express = express();
		// this.express.use(helmet());
		this.express.use(bodyParser.json({ limit: '2mb' })); // to support JSON-encoded bodies
		this.express.use(
			bodyParser.urlencoded({
				// to support URL-encoded bodies
				extended: true,
			}),
		);

		this.express.disable('x-powered-by');

		// ClsNamespace for Request namespace. RequestId, userId in logs
		const clsNS: Namespace = createNamespace(
			Constants.CLS.requestNamespaceName,
		);
		ClsUtils.initNS(clsNS); // Cls Namespace

		this.express.use(
			cookieParser(),
			ClsMiddleware, // Cls Middleware
			ApiTracingMiddleware, // Api Tracing & Latency
		);

		// Add Health Check Before other Middlewares
		this.express.use(HealthRoute);

		// Mount Internal Routes
		this.mountInternalRoutes();

		this.express.use(AuthMiddleware);

		// Mount All Public Routes
		// this.mountRoutes();

		// Error Handling Middleware
		this.express.use(ErrorHandlingMiddleware);

		process.on('uncaughtException', (error: Error) => {
			logger.error(
				'************************ Caught uncaughtException ************************',
			);
			logger.error(`Uncaught:: ${JSON.stringify(error || {})}`);
			if (error && error.stack) logger.error(error);
			logger.error(
				'**************************************************************************',
			);
			MonitoringHelper.publishUncaughtException(error.name);
		});
	}

	private mountInternalRoutes(): void {
		this.express.use(ArticlesRoute);
	}

	// Public Routes
	// private mountRoutes(): void {
	//
	// }

	static async init(): Promise<void> {
		// Init Configs/Database Connections/Queues/ etc
		DatabaseService.init(Config.getDBConfig());
	}

	getExpress(): Express {
		return this.express;
	}
}

export default new App();
