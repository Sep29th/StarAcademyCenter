import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { History } from "./History.entity";
import { Teacher } from "./Teacher.entity";

@Entity({ name: "managers" })
export class Manager {
   /********************
      * EXPOSE(FILLABLE) *
      ********************/
   @Column()
   name: string;

   @Column()
   age: number;

   @Column()
   phoneNumber: string;

   @Column()
   email: string;

   @Column()
   avatar: string;

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
   @OneToMany(() => History, (histories) => histories.manager)
   histories: Promise<History[]>

   @OneToMany(() => Teacher, (teachers) => teachers.manager)
   teachers: Promise<Teacher[]>
}
