import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import morgan from 'morgan';
import { env } from './config/env';
import HttpException from './models/http-exception.model';
import routes from './routes/routes.v1.';
import { appRouter } from './routes/trpc';
import { createContext } from './trpc';

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/trpc', trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
  onError: (opts) => {
    const { error } = opts;
    console.error('Error:', (error as Error).message)
  }
}))
app.use(routes);

//app.use(FirebaseMiddleware.decodeToken)
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API is running on /api' });
});

// Health check endpoint
app.get('/healthz', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

/* eslint-disable */
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'missing authorization credentials',
    });
    // @ts-ignore
  } else if (err?.message && err?.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err?.message);
  }
});


const PORT = env.PORT || 8080;
const server = app.listen(PORT, () => console.log(
  `🚀 Server ready at: http://localhost:${PORT}`
)
);

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shuting down gracefully');
  shutdownServer(server);
});


process.on('SIGINT', () => {
  console.log('Received SIGINT, shuting down gracefully');
  shutdownServer(server);
});

function shutdownServer(server: http.Server) {
  server.close((err?: Error) => {
    if (err) {
      console.log(`Error while closing server: ${err.message}`);
      process.exit(1);
    }
    else {
      console.log('server closed');
      process.exit(0);
    }
  });
}

