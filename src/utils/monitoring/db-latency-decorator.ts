import { performance } from 'perf_hooks';
import MonitoringHelper from './monitoring-helper';
import DbError from "../../errors/db-error";

export default function DBLatencyDecorator(
	target: Object,
	propertyKey: string,
	descriptor: any,
) {
	const originalMethod = descriptor.value;
	if (typeof originalMethod === 'function') {
		descriptor.value = function (...args: any) {
			const start = performance.now();

			const metricName = `${propertyKey}`;
			MonitoringHelper.publishDBOps(metricName);
			return originalMethod
				.apply(this, args)
				.then((data: any) => {
					MonitoringHelper.publishDBLatency(
						metricName,
						performance.now() - start,
					);
					return data;
				})
				.catch((err: DbError) => {
					MonitoringHelper.publishDBError(
						metricName + '.' + err.getName()
					);
					throw err;
				});
		};
	}

	return descriptor;
}