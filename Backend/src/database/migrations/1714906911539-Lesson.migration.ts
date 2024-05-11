import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Lesson1714906911539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "lessons",
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
                        name: "date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "classroomId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "classId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "studySessionId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "teacherId",
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
            "lessons",
            new TableForeignKey({
                columnNames: ["classroomId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classrooms",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "lessons",
            new TableForeignKey({
                columnNames: ["classId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classes",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "lessons",
            new TableForeignKey({
                columnNames: ["studySessionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "studySessions",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "lessons",
            new TableForeignKey({
                columnNames: ["teacherId"],
                referencedColumnNames: ["id"],
                referencedTableName: "teachers",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
