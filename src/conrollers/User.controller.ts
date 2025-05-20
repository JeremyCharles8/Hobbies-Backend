import CoreController from './Core.controller.ts';
import userServices from '../services/user.service.ts';

import { IService } from '../types/service.type.ts';
import { CreateUser, UpdateUser, User } from '../types/user.type.ts';

export default class UserController extends CoreController<
  User,
  CreateUser,
  UpdateUser
> {
  static entityName: string = 'user';
  service: IService<User, CreateUser, UpdateUser, void> = userServices;
}
