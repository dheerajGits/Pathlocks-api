import PrismaClient from "utils/PrimsaClient";
import { Status } from "@prisma/client";

class ProjectServices {
  public projects = PrismaClient.project;

  public getProjects = async (take: number, skip: number) => {
    // skip and take are for pagination
    const projects = await this.projects.findMany({
      take: take,
      skip: skip,
    });
    return projects;
  };

  public createProject = async (
    endDateTime: Date,
    name: string,
    description: string
  ) => {
    const project = await this.projects.create({
      data: {
        endDateTime,
        name,
        description,
      },
    });

    return project;
  };

  public getProjectDetails = async (projectId: string) => {
    const project = await this.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    return project;
  };

  public updateProject = async (projectId: string, data: any) => {
    const project = await this.projects.update({
      where: {
        id: projectId,
      },
      data: { ...data },
    });

    return project;
  };

  public deleteProject = async (projectId: string) => {
    const project = await this.projects.delete({
      where: {
        id: projectId,
      },
    });

    return project;
  };

  public checkProjectCompleted = async (projectId: string) => {
    const project = await this.projects.findUnique({
      where: {
        id: projectId,
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
    let isCompleted = true;
    project.task.map((task) => {
      if (task.status != Status.COMPLETED) isCompleted = false;
    });
    if (isCompleted) {
      await this.projects.update({
        where: {
          id: projectId,
        },
        data: {
          status: Status.COMPLETED,
        },
      });
    }
  };
}

export default ProjectServices;
