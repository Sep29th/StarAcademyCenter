import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Class } from "./Class.entity";
import { Lesson } from "./Lesson.entity";

@Entity({ name: "exercises" })
export class Exercise {
  /********************
 * EXPOSE(FILLABLE) *
 ********************/
  @Column()
  path: string;

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
  @ManyToOne(() => Class, (classes) => classes.exercises)
  @JoinColumn({ name: "classId" })
  classes: Promise<Class>

  @ManyToOne(() => Lesson, (lessonExpires) => lessonExpires.exercisesExpires)
  @JoinColumn({ name: "lessonExpiresId" })
  lessonExpires: Promise<Lesson>
}
