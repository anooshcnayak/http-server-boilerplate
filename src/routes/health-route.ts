import express from 'express';
import HealthController from '../controller/health-check-controller';

const HealthRoute = express.Router();

const basePath = '/health/';

HealthRoute.get(basePath, HealthController.isHealthy);

export default HealthRoute;
