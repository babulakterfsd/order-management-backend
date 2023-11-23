/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidation from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParsedData = userValidation.parse(userData);
    const result = await userServices.createUserInTheDB(zodParsedData);

    const modifiedResult = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: modifiedResult,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong while creating user! Please try again.',
      error: {
        code: 404,
        description:
          err.message || `${err?.issues[0]?.path} : ${err?.issues[0]?.message}`,
      },
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong while fetching users! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// get single user by userId
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Something went wrong while fetching user! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// update single user by userId
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userDataToBeUpdated } = req.body;
    const result = await userServices.updateSingleUserInTheDB(
      userId,
      userDataToBeUpdated
    );

    const modifiedResult = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    };

    res.status(200).json({
      success: true,
      message: 'User info updated successfully!',
      data: modifiedResult,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message:
        'Something went wrong while updating the user! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// delete single user by userId
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userServices.deleteSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User got deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message:
        'Something went wrong while deleting the user! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// add order to user
const addAnOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderToBeAdded = req.body;
    await userServices.addOrderToUser(userId, orderToBeAdded);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message:
        'Something went wrong while creating an order to the user! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

// get all orders of a user
const getAllOrdersOfAUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrdersOfAUser(userId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message:
        'Something went wrong while fetching orders of the user! Please try again.',
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addAnOrderToUser,
  getAllOrdersOfAUser,
};
