import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Parent } from "./Parent.entity";
import { Attendance } from "./Attendance.entity";
import { ClassToStudent } from "./ClassToStudent.entity";
import { PaymentHistory } from "./PaymentHistory.entity";

@Entity({ name: "students" })
export class Student {
  /********************
   * EXPOSE(FILLABLE) *
   ********************/
  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  phoneNumber: string;

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

  @Column()
  @Exclude()
  loginName: string;

  @Column()
  @Exclude()
  password: string;

  /*****************
   * CONFIGURATION *
   *****************/

  /************
   * RELATION *
   ************/
  @ManyToMany(() => Parent, (parent) => parent.students)
  @JoinTable({ name: "parent_student", joinColumn: { name: "studentId", referencedColumnName: "id" }, inverseJoinColumn: { name: "parentId", referencedColumnName: "id" } })
  parents: Promise<Parent[]>

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Promise<Attendance[]>

  @OneToMany(() => ClassToStudent, (studentToClass) => studentToClass.student)
  studentToClass: Promise<ClassToStudent[]>

  @OneToMany(() => PaymentHistory, (paymentHistories) => paymentHistories.student)
  paymentHistories: Promise<PaymentHistory[]>
}
