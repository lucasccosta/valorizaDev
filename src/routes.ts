import {Router} from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateComplimentsController } from "./controllers/CreateComplimentsController"
import { CreateTagsController } from "./controllers/CreateTagsController"
import { CreateUsersController } from "./controllers/CreateUsersController"
import ensureAdmin from "./middlewares/ensureAdmin"
 
const router = Router()

const createUsersController = new CreateUsersController()
const createTagsController = new CreateTagsController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentsController = new CreateComplimentsController()

router.post('/users', createUsersController.handle)
// router.post('/tags', ensureAdmin ,createTagsController.handle)
router.post('/tags',createTagsController.handle)
router.post('/login', authenticateUserController.handleAuthenticate)
router.post('/compliments', createComplimentsController.handle)


export { router }