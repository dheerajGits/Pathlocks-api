import { Router } from "express";

class TaskRouter {
  public router = Router();
  public path = "/tasks";

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`);
    this.router.post(`${this.path}`);
    this.router.post(`${this.path}/:id`);
    this.router.put(`${this.path}/:id`);
    this.router.delete(`${this.path}/:id`);
  }
}

export default TaskRouter;
