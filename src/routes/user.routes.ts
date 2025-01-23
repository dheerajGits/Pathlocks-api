import { Router } from "express";

class ProjectRoute {
  public router = Router();
  public path = "/users";

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
