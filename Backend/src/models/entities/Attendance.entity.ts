import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Student } from "./Student.entity";
import { Lesson } from "./Lesson.entity";

@Entity({ name: "attendance" })
export class Attendance {
  /********************
 * EXPOSE(FILLABLE) *
 ********************/
  @Column()
  message: string;

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
  @ManyToOne(() => Student, (student) => student.attendance)
  @JoinColumn({ name: "studentId" })
  student: Promise<Student>

  @ManyToOne(() => Lesson, (lesson) => lesson.attendance)
  @JoinColumn({ name: "lessonId" })
  lesson: Promise<Lesson>
}
