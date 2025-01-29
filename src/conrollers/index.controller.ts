import userService from '../services/user.service.ts';
import UserController from './User.controller.ts';

const userController = new UserController(userService);

export { userController };
