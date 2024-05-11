import { Exclude } from "class-transformer";
import { AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Student } from "./Student.entity";
import { Class } from "./Class.entity";
import { Discount } from "./Discount.entity";
import { TUITIONPAYMENTMETHODTYPE } from "../enum/TuitionPaymentMethodType.enum";

@Entity({ name: "class_student" })
export class ClassToStudent {
  /********************
 * EXPOSE(FILLABLE) *
 ********************/
  tuitionPaymentMethod: string;

  @Column()
  isDone: boolean;

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

  @Column({ name: "tuitionPaymentMethod" })
  @Exclude()
  tuitionPaymentMethodType: number

  /*****************
   * CONFIGURATION *
   *****************/
  @AfterLoad()
  getTuitionPaymentMethod() {
    this.tuitionPaymentMethod = TUITIONPAYMENTMETHODTYPE.get(this.tuitionPaymentMethodType) || 'unknow';
  }

  /************
   * RELATION *
   ************/
  @ManyToOne(() => Student, (student) => student.studentToClass)
  @JoinColumn({ name: "studentId" })
  student: Promise<Student>

  @ManyToOne(() => Class, (classes) => classes.classToStudent)
  @JoinColumn({ name: "classId" })
  classes: Promise<Class>

  @ManyToOne(() => Discount, (discount) => discount.classToStudent)
  @JoinColumn({ name: "discountId" })
  discount: Promise<Discount>
}
