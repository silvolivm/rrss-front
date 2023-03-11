export type LoginData = {
  email: string;
  passwd: string;
};

export type RegisterData = LoginData & {
  firstName: string;
  lastName: string;
  snapUrl: string;
};

export type ProtoUser = RegisterData & {
  friends: User[];
  enemies: User[];
};

export type User = { id: string } & ProtoUser;

export type SuccessLoginData = {
  token: string;
  user: User;
};
