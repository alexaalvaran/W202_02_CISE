import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {getModelToken} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { Response } from '@nestjs/common';


describe('UserService', () => {
    let userService: UserService;
    let userModel: Model<User>;
    let res: Response;

    beforeEach(async () => {
         const mockUserModel = {
            create: jest.fn().mockImplementation((dto) => {
                return{...dto, _id:'someUniqueId'};
            }),
         };
         const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                }
            ],
         }).compile();

         userService = module.get<UserService>(UserService);
         userModel = module.get<Model<User>>(getModelToken(User.name));

    });

    describe('authenticateUser', () => {
        it('should authenticate a user', async () => {
            
            // arrange - details of user
            const testUser = new UserDto();
            testUser.email = 'ymw7320@autuni.ac.nz';
            testUser.password = 'cise'
            testUser.isModerator = true;

            // act - create the user and find in database
            const createTest = await userService.userLogin(testUser);

          
            // assert - carry out the tests
            expect(userModel.create).toHaveBeenCalledWith(testUser);

        })
    })
})