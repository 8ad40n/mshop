import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class RegisterUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @Matches(/^[0-9]{10,15}$/, { message: 'Phone number must be between 10 and 15 digits' })
    phone: string;

    // @IsString()
    // @IsOptional()
    // role?: string;
}
