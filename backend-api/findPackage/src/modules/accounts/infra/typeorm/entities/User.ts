import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity("users")
class User {
    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
    @PrimaryColumn()
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    email: string;
    @CreateDateColumn()
    created_at: Date;
    @Column()
    isAdmin: boolean;
    @Column()
    isDriver: boolean;
    @Column()
    isEnterprise: boolean;
    @Column()
    avatar: string;

}

export { User }