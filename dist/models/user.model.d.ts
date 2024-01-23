import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}
