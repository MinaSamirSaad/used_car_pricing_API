import { Review } from '../reviews/review.entity';
import { Report } from '../reports/report.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isAdmin: boolean;

    @OneToMany(() => Report, report => report.user)
    reports: Report[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

}
