import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Student } from "./Student.entity";

@Entity({ name: "parents" })
export class Parent {
  /********************
     * EXPOSE(FILLABLE) *
     ********************/
  @Column()
  name: string;

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
  password: string;

  /*****************
   * CONFIGURATION *
   *****************/

  /************
   * RELATION *
   ************/
  @ManyToMany(() => Student, (student) => student.parents)
  students: Promise<Student[]>
}
