import { connect } from "http2";
import PrismaClient from "utils/PrimsaClient";
import ProjectServices from "./project.services";

class TaskServices {
  public tasks = PrismaClient.task;
  public users = PrismaClient.user;
  public projectServices = new ProjectServices();

  public getTasks = async (take: number, skip: number) => {
    // skip and take are for pagination
    const tasks = await this.tasks.findMany({
      take: take,
      skip: skip,
    });
    return tasks;
  };

  public createTask = async (
    endDateTime: Date,
    name: string,
    description: string,
    userId: string,
    projectId
  ) => {
    // first we need to check that the user is available

    const user = await this.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        task: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    if (!user) return null;
    let numberOfActiveTask = 0;
    user.task.map((task: any) => {
      if (task.status == "1") numberOfActiveTask += 1;
    }); // here we will check the number of active task a user has

    if (numberOfActiveTask >= 5) return null;

    const task = await this.tasks.create({
      data: {
        dueDate: endDateTime,
        name,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
        Project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return task;
  };

  public getTaskDetails = async (taskId: string) => {
    const task = await this.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    return task;
  };

  public updateTask = async (taskId: string, data: any) => {
    const task = await this.tasks.update({
      where: {
        id: taskId,
      },
      data: { ...data },
    });
    await this.projectServices.checkProjectCompleted(task.projectId); // to mark project completed if all the task is marked completed

    return task;
  };

  public deleteTask = async (taskId: string) => {
    const task = await this.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return task;
  };
}

export default TaskServices;
