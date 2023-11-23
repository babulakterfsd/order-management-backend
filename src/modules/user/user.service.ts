import { TOrder, TUser } from './user.interface';
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
    const result = await UserModel.find({ userId }).select('-_id -orders -__v');
    return result[0];
  }
};

// update single user in the database
const updateSingleUserInTheDB = async (
  userId: string,
  userDataToBeUpdated: TUser
) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('Can not update user as user does not exists');
  } else {
    const result = await UserModel.findOneAndUpdate(
      { userId },
      userDataToBeUpdated,
      {
        new: true,
      }
    );
    return result;
  }
};

//delete single user from the database
const deleteSingleUserFromDB = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('Can not delete user as user does not exists');
  } else {
    const result = await UserModel.deleteOne({ userId });
    return result;
  }
};

// add order to the user
const addOrderToUser = async (userId: string, order: TOrder) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('Can not add order as user does not exists');
  } else {
    const userToBeUpdated = await UserModel.find({ userId });
    userToBeUpdated[0]?.orders?.push(order);
    const result = await userToBeUpdated[0]?.save();
    return result;
  }
};

// get all orders of a user
const getAllOrdersOfAUser = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('Can not fetch orders as user does not exists');
  } else {
    const result = await UserModel.find({ userId }).select('orders -_id');
    return result[0];
  }
};

// calculate total price of all orders of a user
const calculateTotalPriceOfAllOrdersOfAUser = async (userId: string) => {
  const userExists = await UserModel.isUserExists(userId);

  if (!userExists) {
    throw new Error('Can not calculate total price as user does not exists');
  } else {
    const result = await UserModel.find({ userId }).select('orders -_id');
    const totalPrice = result[0]?.orders?.reduce(
      (acc: number, order: TOrder) => {
        return acc + order.price * order.quantity;
      },
      0
    );
    return totalPrice;
  }
};

export const userServices = {
  createUserInTheDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserInTheDB,
  deleteSingleUserFromDB,
  addOrderToUser,
  getAllOrdersOfAUser,
  calculateTotalPriceOfAllOrdersOfAUser,
};
