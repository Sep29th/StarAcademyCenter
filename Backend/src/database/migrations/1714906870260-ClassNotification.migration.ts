import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ClassNotification1714906870260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classNotifications",
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
                        name: "description",
                        type: "text",
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
            "classNotifications",
            new TableForeignKey({
                columnNames: ["classId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classes",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
