import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BooleanSchemaDefinition, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    isModerator: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);