import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Document1714992867302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "documents",
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
                        name: "classId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "path",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "message",
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
            "documents",
            new TableForeignKey({
                columnNames: ["classId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classes",
                onDelete: "CASCADE",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
