const express = require('express');
const userRouter = express.Router();

const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserId,
  getUserPaging,
  createUserRating,
} = require('../Controllers/userController');

userRouter.get('/get-user', getUser);
userRouter.get('/get-user/:user_id', getUserId);
userRouter.get('/get-user-paging/:page/:pageSize', getUserPaging);
userRouter.post('/create-user', createUser);
userRouter.put('/update-user/:user_id', updateUser);
userRouter.delete('/delete-user/:user_id', deleteUser);

//
userRouter.post('/create-rating', createUserRating);
module.exports = userRouter;
