import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ClassStudent1714918828738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tuitionPaymentMethodType",
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
                name: "class_student",
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
                        name: "isDone",
                        type: "boolean",
                        default: false,
                        isNullable: true
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
                        name: "discountId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: "tuitionPaymentMethod",
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
            "class_student",
            new TableForeignKey({
                columnNames: ["studentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "class_student",
            new TableForeignKey({
                columnNames: ["classId"],
                referencedColumnNames: ["id"],
                referencedTableName: "classes",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "class_student",
            new TableForeignKey({
                columnNames: ["discountId"],
                referencedColumnNames: ["id"],
                referencedTableName: "discounts",
                onDelete: "CASCADE",
            }),
        )
        await queryRunner.createForeignKey(
            "class_student",
            new TableForeignKey({
                columnNames: ["tuitionPaymentMethod"],
                referencedColumnNames: ["id"],
                referencedTableName: "tuitionPaymentMethodType",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
