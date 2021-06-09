const HealthCheckController = {
	isHealthy(request: any, res: any): void {
		// TODO Add other application related checks
		res.sendStatus(200);
	},
};

export default HealthCheckController;
