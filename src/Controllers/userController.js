const { Sequelize } = require('sequelize');
const { successCode, errorCode, failCode } = require('../ultils/response');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const initModel = require('../Models/init-models');
const sequelize = require('../Models/index');
const { fail } = require('assert');
const { generateToken } = require('../ultils/jwt');
const hinh_anh = require('../Models/hinh_anh');
const models = initModel(sequelize);
// const jwt = require('jsonwebtoken');
// SELECT * FROM user WHERE full_name = 'abc'
const getUser = async (req, res) => {
  try {
    let data = await models.nguoi_dung.findAll();
    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
}; // trả ra list obj

const getImage = async (req, res) => {
  try {
    // A JOIN B JOIN C

    let data = await models.hinh_anh.findAll({});

    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    // res.status(500).send('Lỗi BE');
    errorCode(res, 'Lỗi BE');
  }
};

const getImageQuery = async (req, res) => {
  const name = `%${req.query.name}%`
  try {
    // A JOIN B JOIN C

    let data = await models.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: name, // SELECT * FROM user WHERE full_name LIKE '%a%';
        },
      },
    });

    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    // res.status(500).send('Lỗi BE');
    errorCode(res, 'Lỗi BE');
  }
};

const deleteUserImage = async (req, res) => {
  try {
    let { hinh_id,nguoi_dung_id } = req.params;
    let data = await models.hinh_anh.findOne({
      where: {
        nguoi_dung_id,
        hinh_id
      },
    });

    await models.hinh_anh.destroy({
      where: {
        hinh_id,
        nguoi_dung_id,
      },
    });

    //xóa hình
    const fs = require('fs');
    fs.unlink(process.cwd() + data.duong_dan, () => {});

    // res.send('Delete User success');
    successCode(res, 'delete image success',data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};


const uploadUserImage = async(req, res) => {
  let { ten_hinh, mo_ta, nguoi_dung_id } = req.body;
  // file system
  const fs = require('fs');

  let file = req.file;

  // // file.size > 1 000 000

  let newImage = {
    ten_hinh:ten_hinh,
    duong_dan:'/public/img/' + file.filename,
    mo_ta,
    nguoi_dung_id
  };

  await models.hinh_anh.create(newImage);

  fs.readFile(process.cwd() + '/public/img/' + file.filename, (err, data) => {
    res.send(file);
  });
};

// tìm kiếm
const loginUser = async (req, res) => {
  let { email, mat_khau } = req.body;
  let checkUser = await models.nguoi_dung.findOne({
    where: {
      email,
    },
  });
  if (checkUser) {
    let checkPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);
    if (checkPass == true) {
      let token = generateToken(checkUser.dataValues);
      successCode(res, 'login thành công', token);
    } else {
      failCode(res, 'pass word not found !', '');
    }
  } else {
    // login ko thành công
    failCode(res, 'email not found !', '');
  }
};

//create

const signUpUser = async (req, res) => {

  try {
    let { ho_ten, tuoi, email, mat_khau } = req.body;

    let newData = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10), // mã hóa
      ho_ten,
      tuoi
    };

    // check email trùng
    let checkEmail = await models.nguoi_dung.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      failCode(res, 'Email đã tồn tại', '');
      return;
    }

    // INSERT INNTO user VALUES ()
    await models.nguoi_dung.create(newData);

    // res.status(200).send("create User");
    successCode(res, 'sign up success', '');
  } catch (err) {
    // res.status(500).send("Lỗi BE");
    errorCode(res, 'Lỗi BE');
  }
};



const getImageUser = async (req, res) => {
    try {
      let data = await models.hinh_anh.findAll({
        include: ['nguoi_dung'], 
      });
      successCode(res, 'Lấy data thành công', data);
    } catch (error) {
      errorCode(res, 'Lỗi BE');
    }
    
};

const getCommentUser = async (req, res) => {
  try {
    let data = await models.binh_luan.findAll({
      include: ['hinh'], 
    });
    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
  
};

const getSaveImage = async (req, res) => {

  try {
    let { nguoi_dung_id, hinh_id } = req.body;
  
    let newData = {
     nguoi_dung_id,
     hinh_id
    };

    //check image trùng
    let checkImage = await models.luu_anh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id
      },
      include:['hinh','nguoi_dung']
    });
    if (checkImage) {
      failCode(res, 'Image has been saved', checkImage);
      return;
    }

    // INSERT INNTO user VALUES ()
    await models.luu_anh.create(newData);
    successCode(res, 'Lấy data thành công',newData);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

//createCommentImage

const createCommentImage = async (req, res) => {

  try {
    let { nguoi_dung_id, hinh_id,noi_dung } = req.body;
  
    let newData = {
     nguoi_dung_id,
     hinh_id,
     noi_dung
    };

    await models.binh_luan.create(newData);
    successCode(res, 'Lấy data thành công',newData);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

// lấy danh sách ảnh đã lưu theo user id

const getUserSaveImage = async (req, res) => {

  try {
    let data = await models.nguoi_dung.findAll({
      // include: ['luu_anhs'], 
      include: {
        model: models.luu_anh,
        as: 'luu_anhs',
        include:['hinh']
      }
    });
    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
  
};

const getUserImage = async (req, res) => {

  try {
    let data = await models.nguoi_dung.findAll({
        include:['hinh_anhs']
    });
    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
  
};


//yarn add jsonwebtoken

module.exports = {
  getUser,
  getImage,
  getImageQuery,
  getImageUser,
  getCommentUser,
  getSaveImage,
  createCommentImage,
  getUserSaveImage,
  getUserImage,
  deleteUserImage,
  uploadUserImage,
  loginUser,
  signUpUser,
};
