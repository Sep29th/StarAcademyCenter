import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Class } from "./Class.entity";

@Entity({ name: "documents" })
export class Document {
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
  @ManyToOne(() => Class, (classes) => classes.documents)
  @JoinColumn({ name: "classId" })
  classes: Promise<Class>
}
