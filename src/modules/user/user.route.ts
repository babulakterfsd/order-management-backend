import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);

export const UserRoute = router;
