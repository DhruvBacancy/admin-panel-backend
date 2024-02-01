import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidationOptions,
} from 'class-validator'

export class IdDto {
  @IsUUID()
  @IsNotEmpty()
  id: string
}

export class EditUserDto {
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

  @IsNotEmpty()
  @IsString()
  role: string
}
