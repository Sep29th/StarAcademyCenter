import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ParentStudent1714903008778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "parent_student",
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
                        name: "studentId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "parentId",
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
            "parent_student",
            new TableForeignKey({
                columnNames: ["studentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "parent_student",
            new TableForeignKey({
                columnNames: ["parentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "parents",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
