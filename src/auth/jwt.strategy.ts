import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { User } from '../models/user.model'
import { InjectModel } from '@nestjs/sequelize'
import { ApiResponse } from '../response-format/response'

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: any) {
    const user = await this.userModel
      .findOne({
        where: {
          id: payload.id,
        },
      })
      .then((user) => {
        if (user) {
          return { id: user.id, role: user.role }
        } else {
          console.log('in else')
          throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
        }
      })
      .catch((err) => {
        console.log('in error')

        console.log(err)
        // throw new ApiException(
        //   'Internal Server Error',
        //   500,
        //   'An error occurred while validating the user',
        // )
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
      })
    return user
  }
}
