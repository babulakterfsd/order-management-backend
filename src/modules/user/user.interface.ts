import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

export type TUserUpdate = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: TFullName;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: TAddress;
  orders?: TOrder[];
};

//for creating statics
export interface TUserModel extends Model<TUser> {
  isUserExists(userId: string): Promise<TUser | null>;
}
