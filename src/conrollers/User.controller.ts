import CoreController from './Core.controller.ts';
import userServices from '../services/user.service.ts';

import { IService } from '../types/service.type.ts';
import { CreateUser, LoginUser, UpdateUser, User } from '../types/user.type.ts';

export default class UserController extends CoreController<User,CreateUser, UpdateUser> {
  static entityName: string = 'User';
  service: IService<User, CreateUser, UpdateUser, LoginUser> = userServices;
};
