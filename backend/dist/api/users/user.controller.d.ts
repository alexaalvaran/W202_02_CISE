import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.schema").User[]>;
    findOne(email: string): Promise<import("./user.schema").User>;
    create({ email, password }: {
        email: string;
        password: string;
    }): Promise<import("./user.schema").User>;
}
