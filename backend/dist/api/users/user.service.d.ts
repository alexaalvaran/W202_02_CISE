import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { Logger } from '@nestjs/common';
export declare class UserService {
    private userModel;
    logger: Logger;
    constructor(userModel: Model<User>);
    findOne(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    userLogin(userDto: UserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
