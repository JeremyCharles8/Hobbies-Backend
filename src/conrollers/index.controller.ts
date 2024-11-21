import userService from "../services/user.service.ts";
import UserController from "./User.controller.ts";


export const userController = new UserController(userService);
