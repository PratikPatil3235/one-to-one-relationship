import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DeleteResult } from 'typeorm';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileServices: ProfileService) {}
  @Get()
  findAll(): Promise<Profile[]> {
    return this.profileServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    return this.findOne(id);
  }

  @Patch(':id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileServices.update(id, updatedProfileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.profileServices.remove(id);
  }
}
