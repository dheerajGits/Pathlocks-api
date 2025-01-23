import TaskServices from "@/services/task.services";
import { Request, Response } from "express";
class TaskController {
  public taskServices = new TaskServices();

  public createTask = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (
        !body.name ||
        body.description ||
        body.endDateTime ||
        body.userId ||
        body.projectId
      ) {
        res.status(400).send({ message: "data not fully specified" });
      }
      const task = await this.taskServices.createTask(
        new Date(body.endDateTime),
        body.name,
        body.description,
        body.name,
        body.description
      );
      if (task) {
        res
          .status(200)
          .send({ message: "task created successfully", data: task });
        return;
      }
      res.status(404).send({ message: "something went wrong" });
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getTasks = async (req: Request, res: Response) => {
    try {
      const perPage = (req.body.perPage as number) || 20;
      const pageNumber = (req.body.perPage as number) || 1;
      const skip = (pageNumber - 1) * perPage;
      const tasks = await this.taskServices.getTasks(perPage, skip);
      if (tasks) {
        res.status(200).send({ message: "success", data: tasks });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public getTaskDetails = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        res.status(400).send({ message: "taskId not specified" });
      }
      const task = await this.taskServices.getTaskDetails(taskId);
      if (task) {
        res.status(200).send({ message: "success", data: task });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      if (!taskId) {
        res.status(400).send({ message: "taskId not specified" });
      }
      const task = await this.taskServices.deleteTask(taskId);
      if (task) {
        res.status(200).send({ message: "success", data: task });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };

  public updateTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
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

      if (body.userId) {
        data = {
          ...data,
          userId: body.userId,
        };
      }

      if (body.projectId) {
        data = {
          ...data,
          projectId: body.projectId,
        };
      }

      if (body.status) {
        data = {
          ...data,
          status: body.status,
        };
      }

      const task = await this.taskServices.updateTask(taskId, data);
      if (task) {
        res
          .status(200)
          .send({ message: "task updated successfully", data: task });
      }
    } catch {
      res.status(404).send({ message: "something went wrong" });
    }
  };
}

export default TaskController;
