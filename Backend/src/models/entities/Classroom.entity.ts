import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Lesson } from "./Lesson.entity";

@Entity({ name: "classrooms" })
export class Classroom {
  /********************
   * EXPOSE(FILLABLE) *
   ********************/
  @Column()
  name: string;

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

  /*****************
   * CONFIGURATION *
   *****************/

  /************
   * RELATION *
   ************/
  @OneToMany(() => Lesson, (lessons) => lessons.classroom)
  lessons: Promise<Lesson[]>
}
