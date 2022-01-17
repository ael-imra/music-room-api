import {
  IsEmail,
  IsDate,
  Length,
  IsAlphanumeric,
  IsAlpha,
  IsEnum,
} from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
}
export class registerBodyDto {
  @IsEmail()
  email: string;
  @IsAlphanumeric()
  @Length(4, 20)
  username: string;
  @IsAlpha()
  @Length(4, 20)
  first_name: string;
  @IsAlpha()
  @Length(4, 20)
  last_name: string;
  @IsDate()
  date_birthday: string;
  @IsEnum(Gender)
  gender: string;
}
