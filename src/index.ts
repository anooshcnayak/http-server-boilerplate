// This should always be the first line of index to load config from env
import http from 'node:http';
import Config from './config/config';
import App from './app';
import { logger } from './utils/logger';
import MonitoringHelper from './utils/monitoring/monitoring-helper';

require('dotenv').config();

App.init()
	.then(() => {
		logger.info('api-server:: Starting server');

		const httpServerConfig: any = Config.getHttpServerConfig();
		// Create Http Server
		const server: any = http.createServer(App.getExpress());

		server.listen(httpServerConfig.PORT, () => {
			MonitoringHelper.publishServerStartSuccess();
			logger.info(
				`API Server Started :: Server is listening on ${httpServerConfig.PORT}`,
			);
		});
	})
	.catch((error: Error) => {
		logger.error('Unable to Start Server::: %s', JSON.stringify(error));
		logger.error(error);

		MonitoringHelper.publishServerStartFailed();
		process.exit(1);
	});
