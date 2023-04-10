const express = require('express');
const userRouter = require('./userRouter');
const rootRouter = express.Router();

rootRouter.use('/user', userRouter);

//product
// rootRouter.use('/product', productRouter);
module.exports = rootRouter;
