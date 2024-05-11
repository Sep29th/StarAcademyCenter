import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class History1714904808224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "histories",
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
                        name: "teacherId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "managerId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "action",
                        type: "varchar",
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
            "histories",
            new TableForeignKey({
                columnNames: ["teacherId"],
                referencedColumnNames: ["id"],
                referencedTableName: "teachers",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "histories",
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
