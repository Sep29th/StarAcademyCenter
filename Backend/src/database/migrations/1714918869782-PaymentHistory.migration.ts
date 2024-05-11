import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PaymentHistory1714918869782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "paymentMethodType",
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
                name: "paymentHistories",
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
                        name: "classId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "paymentMethod",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "amountOfMoney",
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
            "paymentHistories",
            new TableForeignKey({
                columnNames: ["studentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "paymentHistories",
            new TableForeignKey({
                columnNames: ["classId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classes",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "paymentHistories",
            new TableForeignKey({
                columnNames: ["paymentMethod"],
                referencedColumnNames: ["id"],
                referencedTableName: "paymentMethodType",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
