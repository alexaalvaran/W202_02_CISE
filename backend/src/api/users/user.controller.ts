import { 
    NotFoundException,
    Controller,
    Get, 
    HttpException, 
    HttpStatus, 
    Param, 
    Post,
    Body,
    UnauthorizedException
    
    } from "@nestjs/common";
import { error } from 'console';
import { UserService } from "./user.service";

@Controller('/api/users')
export class UserController {
    constructor (private readonly userService: UserService) {}

    // Get all articles
    @Get('/')
    async findAll() {
        try{
            return this.userService.findAll();
        }catch{
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No articles found',
                },
                HttpStatus.NOT_FOUND,
                { cause: error },
            );
        }
    }
   
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
       
       @Post('/')
       async create(@Body() { email, password }: { email: string, password: string }) {
        // Validate if user exists by email
        const isUser = await this.userService.findOne(email);

        
        if (!isUser) {
            throw new NotFoundException('User not found');
        }
        if (isUser.password !== password) {
            throw new UnauthorizedException('Incorrect password');
        }
        return isUser;  // Return the user if email and password match
        }

     }
   
   
