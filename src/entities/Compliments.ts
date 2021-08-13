import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tags } from "./Tags";
import { User } from "./Users";



@Entity("compliments")
class Compliments {

  @PrimaryColumn()
  readonly id: string

  @Column()
  user_sender:string

  @JoinColumn({name: "user_sender"})
  @ManyToOne(()=> User)
  userSender: User
  
  @Column()
  user_receiver:string

  @JoinColumn({name: "user_receiver"})
  @ManyToOne(() => User)
  userReceiver: User

  @Column()
  tag_id: string

  // Essa relação é feita 
  // Se for feita uma busca de compliment por id, o retrieve trará todas as infos da tag referente
  // Caso quisesse apenas a referencia do id, não seria necessário o @JoinColumn
  // A que coluna dessa tabela ele está referenciando
  @JoinColumn({name: "tag_id"})
  // O tipo de relacionamento "mts compliments podem receber uma só tag"
  @ManyToOne(()=> Tags)
  tag: Tags

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date

  constructor(){
    if (!this.id){
      this.id = uuid()
    }
  }
}

export { Compliments }