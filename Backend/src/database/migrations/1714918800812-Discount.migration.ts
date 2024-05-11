import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Discount1714918800812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "discountType",
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
                        length: "50",
                        isNullable: true
                    }
                ]
            })
        )
        await queryRunner.createTable(
            new Table({
                name: "discounts",
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
                        name: "code",
                        type: "varchar",
                        length: "10",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "type",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "value",
                        type: "int",
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
            "discounts",
            new TableForeignKey({
                columnNames: ["type"],
                referencedColumnNames: ["id"],
                referencedTableName: "discountType",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
