import { logger } from '../utils/logger';
import Constants from '../constants/constants';
import Config from '../config/config';
import ClsUtils from '../utils/ClsUtils';

async function AuthMiddleware(req: any, res: any, next: any) {
	// Add Auth if needed
	next();
}

export default AuthMiddleware;
