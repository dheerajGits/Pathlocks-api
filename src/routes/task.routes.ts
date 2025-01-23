import { Router } from "express";
import TaskController from "@/controllers/task.controller";

class TaskRouter {
  public router = Router();
  public path = "/tasks";
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, this.taskController.getTasks);
    this.router.post(`${this.path}`, this.taskController.createTask);
    this.router.get(`${this.path}/:id`, this.taskController.getTaskDetails);
    this.router.put(`${this.path}/:id`, this.taskController.updateTask);
    this.router.delete(`${this.path}/:id`, this.taskController.deleteTask);
  }
}

export default TaskRouter;
