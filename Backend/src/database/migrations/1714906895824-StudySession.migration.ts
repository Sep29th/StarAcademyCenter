import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class StudySession1714906895824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "weekdayType",
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
                        name: "values",
                        type: "varchar",
                        length: "10",
                        isNullable: true
                    }
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
                name: "studySessions",
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
                        name: "timeStart",
                        type: "time",
                        isNullable: true
                    },
                    {
                        name: "timeEnd",
                        type: "time",
                        isNullable: true
                    },
                    {
                        name: "weekDay",
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
            "studySessions",
            new TableForeignKey({
                columnNames: ["weekDay"],
                referencedColumnNames: ["id"],
                referencedTableName: "weekdayType",
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
