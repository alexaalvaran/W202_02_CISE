import { User } from './user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findOne(email: string): Promise<User>;
    findAll(): Promise<User[]>;
}
