import PrismaClient from "utils/PrimsaClient";

class UserServices {
  public users = PrismaClient.user;

  public getUsers = async (take: number, skip: number) => {
    // skip and take are for pagination
    const users = await this.users.findMany({
      take: take,
      skip: skip,
    });
    return users;
  };

  public createUser = async (name: string, email: string) => {
    const user = await this.users.create({
      data: {
        name,
        email,
      },
    });

    return user;
  };

  public getUserDetails = async (userId: string) => {
    const user = await this.users.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  };

  public updateUser = async (userId: string, data: any) => {
    const user = await this.users.update({
      where: {
        id: userId,
      },
      data: { ...data },
    });

    return user;
  };

  public deleteUser = async (userId: string) => {
    const user = await this.users.delete({
      where: {
        id: userId,
      },
    });

    return user;
  };
}

export default UserServices;
