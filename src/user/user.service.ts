import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    } else {
      return user;
    }
  }
  async update(id: number, userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    } else {
      const updatedUser = await this.userRepository.update(id, userData);
      return updatedUser.raw[0];
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signup(user: Partial<UserEntity>): Promise<void> {
    const email = user.email;
    const userWithEmail = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOne();
    if (userWithEmail) {
      throw new NotFoundException('Email already exists.');
    }
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException('Combinaison doit être unique');
    }
  }

  async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {
    const user = this.userRepository.create({ ...userData });

    await this.signup(user);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async login(credentials: LoginCredentialsDto, res: Response) {
    const { email, password } = credentials;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Wrong Credentials');
    }

    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      };
      const nbHours = 3;
      const expirationTime = nbHours * 3600; // 1 hour in seconds
      const jwt = this.jwtService.sign(payload, { expiresIn: expirationTime });
      // Set the JWT in an HTTP-only cookie
      const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + expirationTime * 1000),
        path: '/',
        // You can set other cookie options here, such as `secure: true` for HTTPS
      };

      res.cookie('jwtToken', jwt, cookieOptions);

      // You can now send a response indicating success
      return res.send({ message: 'Login successful' });
    } else {
      throw new UnauthorizedException('Wrong credentials');
    }
  }
}
