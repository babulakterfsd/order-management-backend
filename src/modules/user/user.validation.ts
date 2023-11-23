import { z } from 'zod';

const fullNameValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const OrderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const addressValidation = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userValidation = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameValidation,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidation,
  orders: z.array(OrderValidation),
});

export default userValidation;
