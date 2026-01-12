import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['role', 'organization'],
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      role: user.role.name,
      organizationId: user.organization.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
