import CoreController from './core.controller';
import userServices from '../services/user.service';
import { IService } from '../types/service.type';
import { CreateUser, LoginUser, UpdateUser, User } from '../types/user.type';

export default class UserController extends CoreController<User,CreateUser, UpdateUser> {
  entityName: string = 'User';
  service: IService<User, CreateUser, UpdateUser, LoginUser> = userServices;
};
