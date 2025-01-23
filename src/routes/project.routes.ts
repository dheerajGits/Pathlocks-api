import ProjectController from "@/controllers/project.controller";
import { Router } from "express";

class ProjectRoute {
  public router = Router();
  public path = "/project";
  public projectController = new ProjectController();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(`${this.path}`, this.projectController.getProjects);
    this.router.post(`${this.path}`, this.projectController.createProject);
    this.router.get(
      `${this.path}/:id`,
      this.projectController.getProjectDetails
    );
    this.router.put(`${this.path}/:id`, this.projectController.updateProject);
    this.router.delete(
      `${this.path}/:id`,
      this.projectController.deleteProject
    );
  }
}

export default ProjectRoute;
