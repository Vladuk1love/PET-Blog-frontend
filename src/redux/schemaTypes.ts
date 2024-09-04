export interface IUser{
  fullName: string,
  email: string,
  password: string,
  avatarUrl: string,
  _id: string
  token: string
}

export interface IUserLogin{
  email: string,
  password: string,
}

export interface IPosts {
  _id: string,
  title: string,
  text:  string,
  tags: any[],
  viewsCount: number,
  user: IUser,
  imageUrl: string,
}

export interface IAuthorsPosts{
  authorId: string,
  page: number
}