import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidationOptions,
} from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail(undefined, {
    message: 'Please enter a valid email address.',
  } as ValidationOptions)
  email: string

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  role: string
}

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail(undefined, {
    message: 'Please enter a valid email address.',
  } as ValidationOptions)
  email?: string

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({
    message: 'Invalid Password.',
  } as ValidationOptions)
  password?: string
}
