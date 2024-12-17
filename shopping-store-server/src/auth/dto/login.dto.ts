import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDto {

    @IsNotEmpty({message: 'User must have an email'})
    @IsEmail()
    email:string;

    @Length(6,100)
    password:string;

}