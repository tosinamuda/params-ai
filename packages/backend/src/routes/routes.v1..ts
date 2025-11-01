import { Router } from 'express'

import { promptController, userController } from '../controllers'

const api = Router()
  .use('/user', userController)
  .use('/prompt', promptController)

export default Router().use('/api/v1', api)
