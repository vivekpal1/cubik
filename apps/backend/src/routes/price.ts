import {
  tokenPriceController,
  tokenPriceMultiple,
} from 'controllers/token.controller';
import { Router } from 'express';

const router = Router();

router.get('/all', tokenPriceMultiple);
router.get('/:token', tokenPriceController);

export default router;
