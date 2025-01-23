import UserServices from "@/services/user.services";
import { Request, Response } from "express";
class UserController {
  public userServices = new UserServices();

  public createUser = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.name || !body.email) {
        res.status(400).send({ message: "name or email not specified" });
      }
      const user = await this.userServices.createUser(body.name, body.email);
      if (user) {
        res
          .status(200)
          .send({ message: "user created successfully", data: user });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const perPage = (req.body.perPage as number) || 20;
      const pageNumber = (req.body.perPage as number) || 1;
      const skip = (pageNumber - 1) * perPage;
      const users = await this.userServices.getUsers(perPage, skip);
      if (users) {
        res.status(200).send({ message: "success", data: users });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getUserDetails = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        res.status(400).send({ message: "userId not specified" });
      }
      const user = await this.userServices.getUserDetails(userId);
      if (user) {
        res.status(200).send({ message: "success", data: user });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        res.status(400).send({ message: "userId not specified" });
      }
      const user = await this.userServices.deleteUser(userId);
      if (user) {
        res.status(200).send({ message: "success, deleted user", data: user });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const body = req.body;
      let data = {};
      if (body.name) {
        data = {
          ...data,
          name: body.name,
        };
      }
      if (body.email) {
        data = {
          ...data,
          email: body.email,
        };
      }

      const user = await this.userServices.updateUser(userId, data);
      if (user) {
        res
          .status(200)
          .send({ message: "user updated successfully", data: user });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };
}

export default UserController;
