import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Teacher } from "./Teacher.entity";
import { Course } from "./Course.entity";
import { ClassNotification } from "./ClassNotification.entity";
import { ClassToStudent } from "./ClassToStudent.entity";
import { Document } from "./Document.entity";
import { Exercise } from "./Exercise.entity";
import { Lesson } from "./Lesson.entity";
import { PaymentHistory } from "./PaymentHistory.entity";

@Entity({ name: "classes" })
export class Class {
  /********************
   * EXPOSE(FILLABLE) *
   ********************/
  @Column()
  name: string;

  @Column()
  numberOfSessions: number;

  @Column()
  tuitionPerSession: number;

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

  /*****************
   * CONFIGURATION *
   *****************/

  /************
   * RELATION *
   ************/
  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  @JoinColumn({ name: "teacherId" })
  teacher: Promise<Teacher>

  @ManyToOne(() => Course, (course) => course.classes)
  @JoinColumn({ name: "courseId" })
  course: Promise<Course>

  @OneToMany(() => ClassNotification, (classNotifications) => classNotifications.classes)
  classNotifications: Promise<ClassNotification[]>

  @OneToMany(() => ClassToStudent, (classToStudent) => classToStudent.classes)
  classToStudent: Promise<ClassToStudent[]>

  @OneToMany(() => Document, (documents) => documents.classes)
  documents: Promise<Document[]>

  @OneToMany(() => Exercise, (exercises) => exercises.classes)
  exercises: Promise<Exercise[]>

  @OneToMany(() => Lesson, (lessons) => lessons.classes)
  lessons: Promise<Lesson[]>

  @OneToMany(() => PaymentHistory, (paymentHistories) => paymentHistories.classes)
  paymentHistories: Promise<PaymentHistory[]>
}
