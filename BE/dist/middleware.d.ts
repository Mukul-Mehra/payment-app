import type { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}
interface AuthenticatedRequest extends Request {
    userId?: string;
}
declare const authMiddleware: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { authMiddleware };
//# sourceMappingURL=middleware.d.ts.map