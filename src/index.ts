import http, { Server } from 'http';
import Config, { HttpServerConfig } from './config/config';
import App from './app';
import { logger } from './utils/logger';
import MonitoringHelper from './utils/monitoring/monitoring-helper';

App.init()
	.then(() => {
		logger.info('api-server:: Starting server');

		const httpServerConfig: HttpServerConfig = Config.getHttpServerConfig();
		// Create Http Server
		const server: Server = http.createServer(App.getServer());

		server.listen(httpServerConfig.Port, () => {
			MonitoringHelper.publishServerStartSuccess();
			logger.info(
				`API Server Started :: Server is listening on ${httpServerConfig.Port}`,
			);
		});

		return true;
	})
	.catch((error: Error) => {
		logger.error('Unable to Start Server::: %s', JSON.stringify(error));
		logger.error(error);

		MonitoringHelper.publishServerStartFailed();
		throw new Error('Unable to start server');
	});
