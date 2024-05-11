import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Class } from "./Class.entity";
import { History } from "./History.entity";
import { Lesson } from "./Lesson.entity";
import { Manager } from "./Manager.entity";
import { Subject } from "./Subject.entity";

@Entity({ name: "teachers" })
export class Teacher {
  /********************
    * EXPOSE(FILLABLE) *
    ********************/
  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

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
  password: string;

  /*****************
   * CONFIGURATION *
   *****************/

  /************
   * RELATION *
   ************/
  @OneToMany(() => Class, (classes) => classes.teacher)
  classes: Promise<Class[]>

  @OneToMany(() => History, (histories) => histories.teacher)
  histories: Promise<History[]>

  @OneToMany(() => Lesson, (lessons) => lessons.teacher)
  lessons: Promise<Lesson[]>

  @ManyToOne(() => Manager, (manager) => manager.teachers)
  @JoinColumn({ name: "managerId" })
  manager: Promise<Manager>

  @ManyToMany(() => Subject, (subjects) => subjects.teachers)
  @JoinTable({ name: "teacher_subject", joinColumn: { name: "teacherId", referencedColumnName: "id" }, inverseJoinColumn: { name: "subjectId", referencedColumnName: "id" } })
  subjects: Promise<Subject[]>
}
