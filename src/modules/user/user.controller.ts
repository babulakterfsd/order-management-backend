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

export const UserControllers = {
  createUser,
  getAllUsers,
};
