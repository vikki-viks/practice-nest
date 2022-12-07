import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { InitiateRegistrationDto } from './dto/initiate-registration.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Public()
  @Post('initiate')
  initiateRegistration(
    @Body() initiateRegistrationDto: InitiateRegistrationDto,
  ) {
    return this.userService.initiateRegistration(initiateRegistrationDto);
  }
}
