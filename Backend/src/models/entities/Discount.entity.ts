import { Exclude } from "class-transformer";
import { AfterLoad, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ClassToStudent } from "./ClassToStudent.entity";
import { DISCOUNTTYPE } from "../enum/DiscountType.enum";

@Entity({ name: "discounts" })
export class Discount {
  /********************
 * EXPOSE(FILLABLE) *
 ********************/
  type: string;

  @Column()
  code: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /*******************
   * EXCLUDE(HIDDEN) *
   *******************/

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ name: "type" })
  @Exclude()
  discountType: number;

  /*****************
   * CONFIGURATION *
   *****************/
  @AfterLoad()
  getType() {
    this.type = DISCOUNTTYPE.get(this.discountType) || 'unknow'
  }

  /************
   * RELATION *
   ************/
  @OneToMany(() => ClassToStudent, (classToStudent) => classToStudent.discount)
  classToStudent: Promise<ClassToStudent[]>
}
