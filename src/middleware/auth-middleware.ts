import { NextFunction } from 'express';

function AuthMiddleware(request: any, res: any, next: NextFunction): void {
	// Add Auth if needed
	return next();
}

export default AuthMiddleware;
