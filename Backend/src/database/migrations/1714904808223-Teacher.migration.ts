import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Teacher1714904808223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teachers",
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
                        name: "managerId",
                        type: "bigint",
                        unsigned: true,
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
        await queryRunner.createForeignKey(
            "teachers",
            new TableForeignKey({
                columnNames: ["managerId"],
                referencedColumnNames: ["id"],
                referencedTableName: "managers",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
