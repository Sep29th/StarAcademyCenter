import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Manager1714904788349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "managers",
                columns: [
                    {
                        name: "id",
                        type: "bigint",
                        isPrimary: true,
                        unsigned: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: true
                    },
                    {
                        name: "age",
                        type: "tinyint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "phoneNumber",
                        type: "varchar",
                        length: "50",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "100",
                        isNullable: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
