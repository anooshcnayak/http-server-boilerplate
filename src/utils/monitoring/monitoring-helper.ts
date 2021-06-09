const SDC = require('statsd-client');

const sdc = new SDC({
	host: 'localhost',
	port: 8125,
	prefix: 'api-server-boilerplate',
});

class MonitoringHelper {
	public static publishApiError(name: string): void {
		sdc.timing(`error.api.${name}`, 1);
	}

	public static publishApiLatency(name: string, startTime: number): void {
		sdc.timing(`api.latency.${name}`, Date.now() - startTime);
	}

	public static publishApiOps(name: string): void {
		sdc.timing(`api.ops.${name}`, 1);
	}

	public static publishAnomaly(name: string): void {
		sdc.timing(`anomaly.${name}`, 1);
	}

	public static publishDBError(name: string): void {
		sdc.timing(`error.db.${name}`, 1);
	}

	public static publishDBLatency(name: string, time: number): void {
		sdc.timing(`db.latency.${name}`, time);
	}

	public static publishDBOps(name: string): void {
		sdc.timing(`db.ops.${name}`, 1);
	}

	public static publishUncaughtException(name: string): void {
		sdc.increment(`app.uncaughtException.${name}`, 1);
	}

	public static publishServerStartFailed(): void {
		sdc.increment(`app.serverStart.failed`, 1);
	}

	public static publishServerStartSuccess(): void {
		sdc.increment(`app.serverStart.success`, 1);
	}
}

export default MonitoringHelper;
