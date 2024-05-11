import { Exclude } from "class-transformer";
import { AfterLoad, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Lesson } from "./Lesson.entity";
import { WEEKDAYTYPE } from "../enum/WeekdayType.enum";

@Entity({ name: "studySessions" })
export class StudySession {
  /********************
   * EXPOSE(FILLABLE) *
   ********************/
  weekday: string;

  @Column()
  timeStart: string;

  @Column()
  timeEnd: string;

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

  @Column({ name: "weekday" })
  @Exclude()
  weekdayType: number;

  /*****************
   * CONFIGURATION *
   *****************/
  @AfterLoad()
  getWeekday() {
    this.weekday = WEEKDAYTYPE.get(this.weekdayType) || 'unknow'
  }

  /************
   * RELATION *
   ************/
  @OneToMany(() => Lesson, (lessons) => lessons.studySession)
  lessons: Promise<Lesson[]>
}
