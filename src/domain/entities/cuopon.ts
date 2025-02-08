import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    code!: string;

    @Column('int', {name: 'discountpercentage'})
    discountPercentage!: number;

    @Column('timestamp', {name: 'expirationdate'})
    expirationDate!: Date;

    @Column({
        type: 'varchar', 
        length: 10,
        default: 'Activo',
        name: 'isactive',
    })
    isActive!: string;
}  