import ProjectServices from "@/services/project.services";
import { Request, Response } from "express";
import { describe } from "node:test";
class ProjectController {
  public projectServices = new ProjectServices();

  public createProject = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.name || body.description || body.endDateTime) {
        res.status(400).send({ message: "data not fully specified" });
      }
      const project = await this.projectServices.createProject(
        new Date(body.endDateTime),
        body.name,
        body.description
      );
      if (project) {
        res
          .status(200)
          .send({ message: "project created successfully", data: project });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getProjects = async (req: Request, res: Response) => {
    try {
      const perPage = (req.body.perPage as number) || 20;
      const pageNumber = (req.body.perPage as number) || 1;
      const skip = (pageNumber - 1) * perPage;
      const projects = await this.projectServices.getProjects(perPage, skip);
      if (projects) {
        res.status(200).send({ message: "success", data: projects });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getProjectDetails = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      if (!projectId) {
        res.status(400).send({ message: "projectId not specified" });
      }
      const project = await this.projectServices.getProjectDetails(projectId);
      if (project) {
        res.status(200).send({ message: "success", data: project });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public deleteProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      if (!projectId) {
        res.status(400).send({ message: "projectId not specified" });
      }
      const project = await this.projectServices.deleteProject(projectId);
      if (project) {
        res
          .status(200)
          .send({ message: "success, deleted user", data: project });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public updateProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      const body = req.body;
      let data = {};
      if (body.name) {
        data = {
          ...data,
          name: body.name,
        };
      }
      if (body.description) {
        data = {
          ...data,
          description: body.description,
        };
      }
      if (body.endDateTime) {
        data = {
          ...data,
          endDateTime: new Date(body.endDateTime),
        };
      }

      if (body.status) {
        data = {
          ...data,
          status: body.status,
        };
      }

      const project = await this.projectServices.updateProject(projectId, data);
      if (project) {
        res
          .status(200)
          .send({ message: "project updated successfully", data: project });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };
}

export default ProjectController;
