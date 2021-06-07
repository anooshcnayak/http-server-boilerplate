require('dotenv').config(); // This should always be the first line of index to load config from env
import Config from "./config/config";
import App from './app';
import { logger } from './utils/logger';
import http from 'http';
import MonitoringHelper from './utils/monitoring/monitoring-helper';

App.init()
	.then(() => {
		logger.info('api-server:: Starting server');

		const httpServerConfig: any = Config.getHttpServerConfig();
		// Create Http Server
		const server: any = http.createServer(App.getExpress());

		server.listen(httpServerConfig.PORT, () => {
			MonitoringHelper.publishServerStartSuccess();
			logger.info(`API Server Started :: Server is listening on ${httpServerConfig.PORT}`);
		});
	})
	.catch((err: Error) => {
		logger.error('Unable to Start Server::: %s', JSON.stringify(err));
		logger.error(err);

		MonitoringHelper.publishServerStartFailed();
		process.exit(1);
	});
