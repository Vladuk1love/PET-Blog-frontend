export interface IUser{
  fullName: string,
  email: string,
  password: string,
  avatarUrl: string,
  token: string
}

export interface IUserLogin{
  email: string,
  password: string,
}

export interface IPosts {
  title: string,
  text:  string,
  tags: any[],
  viewsCount: number,
  user: IUser,
  imageUrl: string,
}