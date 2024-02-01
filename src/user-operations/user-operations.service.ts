import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/models/user.model'
import { ApiResponse, successResponse } from 'src/response-format/response'

@Injectable()
export class UserOperationsService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getAllUsers(): Promise<ApiResponse<any>> {
    const allUsers = await this.userModel.findAll({
      where: {
        role: 'user',
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    if (!allUsers) {
      throw new HttpException(
        'Fetching All Users Failed',
        HttpStatus.BAD_REQUEST,
      )
    }

    return successResponse(
      HttpStatus.OK,
      'Users Fetched Successfully',
      allUsers,
    )
  }

  async getUserById({ id }): Promise<ApiResponse<any>> {
    const user = await this.userModel.findOne({
      where: {
        id,
        role: 'user',
      },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    })

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    return successResponse(HttpStatus.OK, 'User Fetched', user)
  }

  async editUserById({ id }, body): Promise<ApiResponse<any>> {
    const { firstName, lastName, email, role } = body
    const updatedUser = await this.userModel.update(
      { firstName, lastName, email, role },
      { where: { id } },
    )
    if (!updatedUser || updatedUser[0] === 0) {
      throw new HttpException('Updation Failed', HttpStatus.BAD_REQUEST)
    }
    return successResponse(HttpStatus.OK, 'User Updated', updatedUser)
  }

  async deleteById({ id }): Promise<ApiResponse<any>> {
    const deletedUser = await this.userModel.destroy({
      where: { id },
    })
    if (!deletedUser || deletedUser === 0) {
      throw new HttpException('Deletion Failed', HttpStatus.BAD_REQUEST)
    }
    return successResponse(HttpStatus.OK, 'User Updated', deletedUser)
  }
}
