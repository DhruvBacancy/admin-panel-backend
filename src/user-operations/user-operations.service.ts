import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/models/user.model'

@Injectable()
export class UserOperationsService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
//   async findAllUsers () : Promise<any>{}
}

