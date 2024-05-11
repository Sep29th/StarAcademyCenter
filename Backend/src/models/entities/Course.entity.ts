import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Class } from "./Class.entity";
import { Subject } from "./Subject.entity";

@Entity({ name: "courses" })
export class Course {
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
  @OneToMany(() => Class, (classes) => classes.course)
  classes: Promise<Class[]>

  @ManyToOne(() => Subject, (subject) => subject.courses)
  @JoinColumn({ name: "subjectId" })
  subject: Promise<Subject>
}
