const CONF: any = {
	APP_NAME: process.env.APP_NAME || 'api-server-boilerplate',
	HTTP_SERVER: {
		PORT: process.env.HTTP_SERVER_PORT || '4000'
	},

	MONITORING: {
		PREFIX: process.env.MONITORING_PREFIX || 'api-server-boilerplate',
		PORT: process.env.MONITORING_PORT || 8125
	},

	DATABASE: {

	}
};

export interface MonitoringConfig {
	PREFIX: string;
	PORT: number;
}

export interface HttpServerConfig {
	PORT: string;
}

export interface DBConfig {
	Endpoint      :string;
	Port          :number;
	Username      :string;
	Password      :string;
	DatabaseName  :string;
	DriverName    :string;
	SslMode       :string;
	MaxConnection :number;
}

class Config {

	static getAppName(): string {
		return CONF.appName;
	}

	static getHttpServerConfig(): HttpServerConfig {
		return CONF.HTTP_SERVER;
	}

	static getDBConfig(): DBConfig {
		return CONF.DATABASE;
	}
}

export default Config;
