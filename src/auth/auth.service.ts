import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../models/user.model'
import { ApiResponse } from '../response-format/response'
import { successResponse } from 'src/response-format/response'

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
  }): Promise<ApiResponse<any>> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userModel.create({
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    })
    if (!user) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST)
    }
    return successResponse(HttpStatus.CREATED, 'Registration Successful', {
      msg: 'Registration Successful',
    })
  }

  async loginUser({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<any> {
    const user = await this.userModel.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Login Failed', HttpStatus.UNAUTHORIZED)
    }

    const expiresIn = process.env.JWT_EXPIRATION_TIME
    const payload = { id: user.id, role: user.role }
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn,
    })
    return successResponse(HttpStatus.OK, 'Login Successful', {
      token,
      role: user.role,
      id: user.id,
    })
  }
}
