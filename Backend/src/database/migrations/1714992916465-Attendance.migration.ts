import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Attendance1714992916465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "attendance",
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
                        name: "lessonId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "studentId",
                        type: "bigint",
                        unsigned: true,
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
            "attendance",
            new TableForeignKey({
                columnNames: ["lessonId"],
                referencedColumnNames: ["id"],
                referencedTableName: "lessons",
                onDelete: "CASCADE",
            })
        )
        await queryRunner.createForeignKey(
            "attendance",
            new TableForeignKey({
                columnNames: ["studentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
