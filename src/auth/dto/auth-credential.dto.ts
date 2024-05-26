import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]/, {
    message: '아니 비밀번호를 거지같이 쓰고 있어 a-z A-Z 0-9에 맞춰서 쓰도록 해라'
  })
  password: string;
}