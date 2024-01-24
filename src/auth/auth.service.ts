import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../models/user.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
  }): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await this.userModel.create({
        id: uuidv4(),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
      })
      return 'Registration Successful'
    } catch (error) {
      console.error(error)
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST)
    }
  }

  async loginUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ token: string; role: string; id: string }> {
    try {
      const user = await this.userModel.findOne({ where: { email } })

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials')
      }

      const expiresIn = process.env.JWT_EXPIRATION_TIME
      const payload = { id: user.id, role: user.role }
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn,
      })
      return { token, role: user.role, id: user.id }
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException('Login failed')
    }
  }
}
