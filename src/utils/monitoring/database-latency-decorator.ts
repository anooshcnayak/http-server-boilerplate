import { performance } from 'perf_hooks';
import MonitoringHelper from './monitoring-helper';
import DatabaseError from '../../errors/db-error';

export default function DatabaseLatencyDecorator(
	target: Object,
	propertyKey: string,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const originalMethod = descriptor.value;
	if (typeof originalMethod === 'function') {
		descriptor.value = function descriptorFunction (...arguments_: any) {
			const start = performance.now();

			const metricName = `${propertyKey}`;
			MonitoringHelper.publishDBOps(metricName);
			return originalMethod
				.apply(this, arguments_)
				.then((data: any) => {
					MonitoringHelper.publishDBLatency(
						metricName,
						performance.now() - start,
					);
					return data;
				})
				.catch((error: DatabaseError) => {
					MonitoringHelper.publishDBError(`${metricName}.${error.getName()}`);
					throw error;
				});
		};
	}

	return descriptor;
}
