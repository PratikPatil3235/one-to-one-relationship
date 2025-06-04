import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ProfileService {

  constructor(@InjectRepository(Profile) private readonly profileRepository:Repository<Profile> ) {
    
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile>{
    let profile = new Profile();
    profile.gender = createProfileDto.gender;
    profile.photo = createProfileDto.photo;
    return await this.profileRepository.save(profile)  ;
  }

  findAll():Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findOne(id: number): Promise<Profile | null>{
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile With id ${id} Not Found`);
    }
    return profile;
  }


  async update(id: number, updateProfileDto: UpdateProfileDto):Promise<Profile>{
    const profile = await this.profileRepository.preload({
      id,
      ...updateProfileDto,
    });
    if (!profile) {
      throw new NotFoundException(`Profile With id ${id} Not Found`);
    }
    return this.profileRepository.save(profile);
  }

  async remove(id: number) :Promise<DeleteResult>{
    return this.profileRepository.delete(id);
  }
}
