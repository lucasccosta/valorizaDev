import { Request, Response } from "express";
import { CreateComplimentsService } from "../services/CreateComplimentsService";



class CreateComplimentsController {
  async handle(request: Request, response: Response){
    const {tag_id, user_receiver, user_sender, message } = request.body

    const createComplimentsService = new CreateComplimentsService()

    const compliment = await createComplimentsService.execute({
      tag_id,
      message,
      user_receiver,
      user_sender
    })

    return response.json(compliment)
  }

}

export { CreateComplimentsController }