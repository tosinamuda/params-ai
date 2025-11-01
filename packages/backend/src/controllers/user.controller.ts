import { NextFunction, Request, Response, Router } from 'express';
import { UserCreate } from "../models/UserCreate";
import { UserService } from '../services';

const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as UserCreate
    // VerifyToken Middleware
    const result = await UserService.createUser(user)
    res.status(200).json(result)
  }
  catch (error) {
    next(error);
  }
})

export default router;
