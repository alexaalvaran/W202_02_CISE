import { User } from './user.schema';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
export declare class UserService {
    private userModel;
    logger: Logger;
    constructor(userModel: Model<User>);
    findOne(email: string): Promise<User>;
    findAll(): Promise<User[]>;
}
