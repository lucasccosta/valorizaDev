import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UsersRepositories } from "../repositories/UsersRepository"
import { CheckComplimentErrors } from './errors/CheckComplimentErrors'

export interface ICreateCompliments {
  tag_id:string
  user_receiver:string
  user_sender:string
  message:string
}

class CreateComplimentsService {

  async execute({ tag_id, user_receiver, user_sender, message}: ICreateCompliments){
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
    const usersRepositories = getCustomRepository(UsersRepositories)
    const checkComplimentErrors = new CheckComplimentErrors()

    // if(user_receiver === user_sender){
    //   throw new Error("Incorret user")
    // }
    
    // if(user_receiver === "" || user_sender === ""){
    //   throw new Error('None of the users cant be empty')
    // }

    // if(!tag_id){
    //   throw new Error("Incorrect tag")
    // }
    // if(!message || message == ""){
    //   throw new Error("Incorrect message")
    // }

    // const userReceiverExists = await usersRepositories.findOne(user_receiver)

    // if(!userReceiverExists){
    //   throw new Error("Incorret user")
    // }

    await checkComplimentErrors.checkErrors({tag_id, user_receiver, user_sender, message})

    const compliment = complimentsRepository.create({
      tag_id,
      message,
      user_receiver,
      user_sender
    })

    await complimentsRepository.save(compliment)

    return compliment
  }
}

export { CreateComplimentsService }