import { Router } from "express";
import UserController from "@/controllers/user.controller";

class UserRoute {
  public router = Router();
  public path = "/users";
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.post(`${this.path}`, this.userController.createUser);
    this.router.get(`${this.path}/:id`, this.userController.getUserDetails);
    this.router.put(`${this.path}/:id`, this.userController.updateUser);
    this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
  }
}

export default UserRoute;
