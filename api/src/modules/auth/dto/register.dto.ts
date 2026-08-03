import { IsEmail , IsNotEmpty, IsOptional, IsString, Matches, MinLength, } from 'class-validator';

// DTO => Data Transfer Object

export class RegisterDto {
   @IsEmail({}, { message: 'Please provide a valid email address' })
   @IsNotEmpty({ message: 'Email is required' })
   email: string;

   @IsString()
   @IsNotEmpty({ message: 'Password is required' })
   @MinLength(8, { message: 'Password must be at least 8 characters long' })
   @matchesGlob(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,{
      messsage: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
   })
   password: string;

   @IsOptional()
   @isString()
   firstName?: string;

   @IsOptional()
   @IsString()
   lastName?: string;
}