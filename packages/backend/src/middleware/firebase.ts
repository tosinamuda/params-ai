import { NextFunction, Request, Response } from 'express';
import admin from '../config/firebase';
class Middleware {

  async verifyToken(bearerToken?: string) {
    try {
      if (bearerToken) {
        const decodedValue = await admin.auth().verifyIdToken(bearerToken)
        if (decodedValue) return decodedValue;
        else return null;
      }
      else return null;
    }
    catch (error) {
      console.error((error as Error).message)
      return null;
    }

  }

  async decodeToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")?.[1]
      if (!token) return res.status(400).json({ status: "error", message: "Missing Bearer Token" })

      const decodedValue = await admin.auth().verifyIdToken(token)
      if (!decodedValue) {
        return res.status(400).json({ status: "error", message: "Invalid Bearer Token" })
      }
      else {
        return next()
      }

    } catch (error) {
      console.error((error as Error).message)
      res.status(500).json({ status: "error", message: "Error occurred validating Token" })
    }

  }
}

export default new Middleware()
