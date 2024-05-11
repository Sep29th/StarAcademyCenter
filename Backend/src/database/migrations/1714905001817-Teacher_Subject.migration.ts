import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class TeacherSubject1714905001817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teacher_subject",
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
                        name: "subjectId",
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
            "teacher_subject",
            new TableForeignKey({
                columnNames: ["teacherId"],
                referencedColumnNames: ["id"],
                referencedTableName: "teachers",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "teacher_subject",
            new TableForeignKey({
                columnNames: ["subjectId"],
                referencedColumnNames: ["id"],
                referencedTableName: "subjects",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
