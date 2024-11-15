import userService from "../services/user.service";
import UserController from "./user.controller";


export const userController = new UserController(userService);
