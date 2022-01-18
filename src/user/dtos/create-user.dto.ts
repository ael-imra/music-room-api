import {
  IsEmail,
  IsDate,
  Length,
  IsAlphanumeric,
  IsAlpha,
  IsEnum,
  IsString,
} from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
}
export class RegisterBodyDto {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  @Length(4, 20)
  username: string;
  @IsString()
  @Length(8)
  password: string;
  @IsAlpha()
  @Length(4, 20)
  first_name?: string;
  @IsAlpha()
  @Length(4, 20)
  last_name?: string;
  @IsDate()
  date_birthday?: string;
  @IsEnum(Gender)
  gender?: string;
}

export class FindUserDto {
  email?: string;

  username?: string;

  first_name?: string;

  last_name?: string;

  date_birthday?: string;

  gender?: string;
}

export class LoginBodyDto {
  @IsEmail()
  email: string;
  @Length(8)
  password: string;
}
