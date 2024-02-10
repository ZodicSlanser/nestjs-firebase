import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity, UserLoginEntity } from './entites/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/signin')
  signIn(@Body() body: UserLoginEntity) {
    return this.appService.signIn(body);
  }

  @Post()
  signUp(@Body() body: UserEntity) {
    return this.appService.signUp(body);
  }
}
