/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  TUserModel,
  TUserUpdate,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

const userSchema = new Schema<TUser, TUserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    fullName: fullNameSchema,
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    isActive: {
      type: Boolean,
      required: [true, 'isActive is required'],
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, 'Hobbies is required'],
    },
    address: addressSchema,
    orders: [orderSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

// hashing the password before saving it to the database
userSchema.pre<TUser>('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// hashing the password before updating it to the database
userSchema.pre('findOneAndUpdate', async function (next) {
  const dataToBeUpdated: TUserUpdate = this.getUpdate() as TUserUpdate;
  if (dataToBeUpdated && dataToBeUpdated?.password) {
    dataToBeUpdated.password = await bcrypt.hash(
      dataToBeUpdated.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  next();
});

// another layer of making sure that the password is not returned in the response
userSchema.post<TUser>('save', function (doc, next) {
  doc.password = '';

  next();
});

//custom static method to check if the user exists or not
userSchema.statics.isUserExists = async function (userId: string) {
  const userExists = await UserModel.findOne({ userId });
  return userExists;
};

export const UserModel = model<TUser, TUserModel>('users', userSchema);
