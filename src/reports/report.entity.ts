import { Review } from '../reviews/review.entity';
import { User } from '../users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, AfterInsert, AfterUpdate, OneToMany } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column({ default: false })
    approved: boolean;

    @ManyToOne(() => User, user => user.reports, { onDelete: 'CASCADE', eager: true })
    user: User;

    @OneToMany(() => Review, review => review.report, { eager: true })
    reviews: Review[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted Report with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Report with id', this.id);
    }

}
