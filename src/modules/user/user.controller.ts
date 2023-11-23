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

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
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

    res.status(200).json({
      success: true,
      message: 'User info updated successfully!',
      data: result,
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

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
};
