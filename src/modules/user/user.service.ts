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

// get single user from the database
const getSingleUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('User does not exists');
  } else {
    const result = await UserModel.find({ userId }).select('-_id');
    return result[0];
  }
};

export const userServices = {
  createUserInTheDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
