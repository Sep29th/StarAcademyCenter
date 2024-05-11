import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Class1714906870259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classes",
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
                        isUnique: true,
                        length: "100",
                        isNullable: true
                    },
                    {
                        name: "numberOfSessions",
                        type: "tinyint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "tuitionPerSession",
                        type: "int",
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
                        name: "courseId",
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
            "classes",
            new TableForeignKey({
                columnNames: ["teacherId"],
                referencedColumnNames: ["id"],
                referencedTableName: "teachers",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "classes",
            new TableForeignKey({
                columnNames: ["courseId"],
                referencedColumnNames: ["id"],
                referencedTableName: "courses",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
