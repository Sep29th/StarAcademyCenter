import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Attendance } from "./Attendance.entity";
import { Exercise } from "./Exercise.entity";
import { Classroom } from "./Classroom.entity";
import { Class } from "./Class.entity";
import { StudySession } from "./StudySession.entity";
import { Teacher } from "./Teacher.entity";

@Entity({ name: "lessons" })
export class Lesson {
  /********************
 * EXPOSE(FILLABLE) *
 ********************/
  @Column()
  date: Date;

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
  @OneToMany(() => Attendance, (attendance) => attendance.lesson)
  attendance: Promise<Attendance[]>

  @OneToMany(() => Exercise, (exercisesExpires) => exercisesExpires.lessonExpires)
  exercisesExpires: Promise<Exercise[]>

  @ManyToOne(() => Classroom, (classroom) => classroom.lessons)
  @JoinColumn({ name: "classroomId" })
  classroom: Promise<Classroom>

  @ManyToOne(() => Class, (classes) => classes.lessons)
  @JoinColumn({ name: "classId" })
  classes: Promise<Class>

  @ManyToOne(() => StudySession, (studySession) => studySession.lessons)
  @JoinColumn({ name: "studySessionId" })
  studySession: Promise<StudySession>

  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  @JoinColumn({ name: "teacherId" })
  teacher: Promise<Teacher>
}
