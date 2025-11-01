import { NextFunction, Request, Response, Router } from 'express';
import { FirebaseMiddleware } from '../middleware';
import { PromptService } from '../services';

const router = Router()

router.get('/', FirebaseMiddleware.decodeToken, async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await PromptService.getAllPrompts()
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
})

export default router;
