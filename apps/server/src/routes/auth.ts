import { Router } from 'express';
import { auth } from '../lib/auth';
import { toExpressHandler } from 'better-auth/express';

const router = Router();

// Mount BetterAuth routes
const authHandler = toExpressHandler(auth);
router.use('/auth', authHandler);

export default router;
