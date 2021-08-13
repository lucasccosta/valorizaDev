import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepository"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest){
    const usersRepository = getCustomRepository(UsersRepositories)

    // Verificar se email existe
    const user = await usersRepository.findOne({ email })

    if(!user){
      throw new Error("Email/Password incorrect")
    }

    // Verificar se senha está correta
    // Comparar senha que o user passou com a hash
    //                    password // passwordHash
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }

    const token = sign({
      email: user.email
    }, "sd4asd6ea8f4asf6as5da",{
      subject: user.id,
      expiresIn: "1d"
    }
    )

    return token
  }
}

export {AuthenticateUserService}