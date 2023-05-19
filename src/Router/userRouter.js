const express = require('express');
const userRouter = express.Router();

const {
  getUser,
  loginUser,
  signUpUser,
  getImage,
  getImageQuery,
  getImageUser,
  getCommentUser,
  getSaveImage,
  createCommentImage,
  getUserSaveImage,
  getUserImage,
  uploadUserImage,
  deleteUserImage,
} = require('../Controllers/userController');


const upload = require('../ultils/upload');
const { checkToken, privateAPI } = require('../ultils/jwt');

// login - sign-up
userRouter.post('/login', loginUser);
userRouter.post('/sign-up', signUpUser);

// Homepage - Get Image
userRouter.get("/get-image",privateAPI, getImage);
userRouter.get("/get-image/search",privateAPI, getImageQuery); // tìm theo tên

// Detail Page 
userRouter.get('/get-image-user',privateAPI, getImageUser); // get image include user
userRouter.get('/get-comment-image',privateAPI, getCommentUser); // get comment include image
userRouter.get('/get-save-image',privateAPI, getSaveImage); // get saved image
userRouter.post('/create-comment-image',privateAPI, createCommentImage); // get comment include image

// Manage Image Page
userRouter.get("/get-user",privateAPI, getUser);
userRouter.get('/get-user-saveimage',privateAPI, getUserSaveImage); // get user include save image
userRouter.get('/get-user-image',privateAPI, getUserImage); // get user include image
userRouter.post('/upload', upload.single('file'), uploadUserImage);
userRouter.delete('/deleteimage-byuser/:hinh_id/:nguoi_dung_id',privateAPI, deleteUserImage);

module.exports = userRouter;
