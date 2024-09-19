import { 
    Controller,
    Get, 
    HttpException, 
    HttpStatus, 
    Param, 
    } from "@nestjs/common";
import { error } from 'console';
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Controller('/api/users')
export class UserController {
    constructor (private readonly userService: UserService) {}


    // Find a user
    @Get('/:email')
    async findOne(@Param('email') email: string) {
        try{
            return await this.userService.findOne(email);
        } catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No user found',
                },
                HttpStatus.NOT_FOUND,
                {cause: error},
            );
        }
    }

}
