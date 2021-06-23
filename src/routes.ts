import {Router} from "express"
import { CreateTagsController } from "./controllers/CreateTagsController"
import { CreateUsersController } from "./controllers/CreateUsersController"
import ensureAdmin from "./middlewares/ensureAdmin"
 
const router = Router()

const createUsersController = new CreateUsersController()
const createTagsController = new CreateTagsController()

router.post('/users', createUsersController.handle)
// router.post('/tags', ensureAdmin ,createTagsController.handle)
router.post('/tags',createTagsController.handle)

export { router }