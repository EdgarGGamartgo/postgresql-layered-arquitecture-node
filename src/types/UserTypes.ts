import { BuildOptions, Model } from "sequelize";

export interface UserAttrs {
    id?: number;
    login: string;
    password: string;
    age: number;
    is_deleted: boolean;
    // createdAt?: Date;
    // updatedAt?: Date;
  }

export interface UserModel extends Model<UserAttrs>, UserAttrs {}
export class User extends Model<UserModel, UserAttrs> {}

export type UserStatic = typeof Model & {
     new (values?: object, options?: BuildOptions): UserModel;
};

