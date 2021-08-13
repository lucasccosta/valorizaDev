import { Request, Response } from "express";
import { CreateUsersService } from "../services/CreateUsersService";


class CreateUsersController {

  async handle(request: Request, response: Response): Promise<Response>{
    const {name, email, admin, password} = request.body

    const createUsersService = new CreateUsersService()
    
    const user = await createUsersService.run({name, email, admin, password})

    return response.json(user)
  }
}

export { CreateUsersController }