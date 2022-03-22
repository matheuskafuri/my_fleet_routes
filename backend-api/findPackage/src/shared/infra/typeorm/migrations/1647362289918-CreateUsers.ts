import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1647362289918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "isDriver",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "isEnterprise",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true
                    }
                ]

            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
