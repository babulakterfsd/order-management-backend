import { TUser } from './user.interface';
import { UserModel } from './user.model';

// create user in the database
const createUserInTheDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// get all users from the database
const getAllUsersFromDB = async () => {
  const result = await UserModel.find().select(
    'username fullName age email address -_id'
  );
  return result;
};

export const userServices = {
  createUserInTheDB,
  getAllUsersFromDB,
};
