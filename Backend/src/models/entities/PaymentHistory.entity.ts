import { Exclude } from "class-transformer";
import { AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Class } from "./Class.entity";
import { Student } from "./Student.entity";
import { PAYMENTMETHODTYPE } from "../enum/PaymentMethodType.enum";

@Entity({ name: "paymentHistories" })
export class PaymentHistory {
  /********************
   * EXPOSE(FILLABLE) *
   ********************/
  paymentMethod: string;

  @Column()
  amountOfMoney: number;

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

  @Column({ name: "paymentMethod" })
  @Exclude()
  paymentMethodType: number;

  /*****************
   * CONFIGURATION *
   *****************/
  @AfterLoad()
  getPaymentMethod() {
    this.paymentMethod = PAYMENTMETHODTYPE.get(this.paymentMethodType) || 'unknow'
  }

  /************
   * RELATION *
   ************/
  @ManyToOne(() => Class, (classes) => classes.paymentHistories)
  @JoinColumn({ name: "classId" })
  classes: Promise<Class>

  @ManyToOne(() => Student, (student) => student.paymentHistories)
  @JoinColumn({ name: "studentId" })
  student: Promise<Student>
}
