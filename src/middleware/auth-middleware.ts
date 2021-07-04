import { logger } from '../utils/logger';
import Constants from '../constants/constants';
import Config from '../config/config';
import ClsUtil from '../utils/cls-util';

async function AuthMiddleware(request: any, res: any, next: any) {
	// Add Auth if needed
	next();
}

export default AuthMiddleware;
