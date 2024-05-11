import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Manager } from "./Manager.entity";
import { Teacher } from "./Teacher.entity";

@Entity({ name: "histories" })
export class History {
  /********************
    * EXPOSE(FILLABLE) *
    ********************/
  @Column()
  action: string;

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
  @ManyToOne(() => Manager, (manager) => manager.histories)
  @JoinColumn({ name: "managerId" })
  manager: Promise<Manager>

  @ManyToOne(() => Teacher, (teacher) => teacher.histories)
  @JoinColumn({ name: "teacherId" })
  teacher: Promise<Teacher>
}
