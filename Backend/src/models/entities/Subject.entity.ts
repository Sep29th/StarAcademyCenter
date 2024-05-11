import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Course } from "./Course.entity";
import { Teacher } from "./Teacher.entity";

@Entity({ name: "subjects" })
export class Subject {
  /********************
    * EXPOSE(FILLABLE) *
    ********************/
  @Column()
  name: string;

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
  @OneToMany(() => Course, (courses) => courses.subject)
  courses: Promise<Course[]>

  @ManyToMany(() => Teacher, (teachers) => teachers.subjects)
  teachers: Promise<Teacher[]>
}
