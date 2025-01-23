import PrismaClient from "utils/PrimsaClient";

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
}

export default ProjectServices;
