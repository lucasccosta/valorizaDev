import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1628866001051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"compliments",
                columns:[
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid",
                    },
                    {
                        name: "user_receiver",
                        type: "uuid",
                    },
                    {
                        name: "tag_id",
                        type: "uuid",
                    },
                    {
                        name: "message",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys:[
                    {     // FK Nome tabela + nome tabela destino
                        name:"FKUserSenderCompliments",
                        // A qual tabela to referenciando // de onde vem a fk
                        referencedTableName:"users",
                        // qual coluna dentro de "users" que será representada em "user_sender"
                        referencedColumnNames: ["id"],
                        // a coluna que está sendo representada aqui nessa tabela "Compliments"
                        columnNames: ["user_sender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {   
                        name:"FKUserReceiverCompliments",
                        referencedTableName:"users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {   
                        name:"FKTagCompliments",
                        referencedTableName:"tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )

        // A OUTRA FORMA DE FAZER É CRIANDO UMA NOVA TABLE FK
        // await queryRunner.createForeignKey(
        //     "compliments",
        //     new TableForeignKey({
        //         name:"FkUserSenderCompliments",
        //         referencedTableName:"users",
        //         referencedColumnNames: ["id"],
        //         columnNames: ["user_sender"],
        //         onDelete: "SET NULL",
        //         onUpdate: "SET NULL"
        //     })
        // )

        /*
            A diferença é que ao criar as FKs dentro da tabela, ao fazer um migration:revert, todas as FKs iriam embora também
            Criando fora da tabela, haveria a necessidade de criar um down(queryRunner)... tirando a responsabilidade da tabela copliments
        */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
