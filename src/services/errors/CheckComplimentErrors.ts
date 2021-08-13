import { getCustomRepository } from "typeorm"
import { ICreateCompliments } from "../CreateComplimentsService"
import { UsersRepositories } from "../../repositories/UsersRepository"

class CheckComplimentErrors {

  async checkErrors({ tag_id, user_receiver, user_sender, message}: ICreateCompliments){
    const usersRepositories = getCustomRepository(UsersRepositories)

    if(user_receiver === user_sender){
      throw new Error("User sender and user receiver cant be the same")
    }
    
    if(user_receiver === "" || user_sender === ""){
      throw new Error('None of the users cant be empty')
    }

    const userSenderExists = await usersRepositories.findOne(user_sender)

    const userReceiverExists = await usersRepositories.findOne(user_receiver)
    
    // ao autenticar retirar o userSenderExists pois ele já será verificado
    if(!userSenderExists || !userReceiverExists){
      throw new Error("Choose an existent user")
    }

    if(!tag_id){
      throw new Error("Tag field is needed")
    }

    if(message == ""){
      throw new Error("The message field cant be empty")
    }
    
    if(!message){
      throw new Error("Message field is needed")
    }

    return {tag_id, user_receiver, user_sender, message}
  }
}

export {CheckComplimentErrors}