const { Sequelize } = require('sequelize');
const { successCode, errorCode } = require('../ultils/response');
const Op = Sequelize.Op;

const initModel = require('../Models/init-models');
const sequelize = require('../Models/index');
const models = initModel(sequelize);
// SELECT * FROM user WHERE full_name = 'abc'
const getUser = async (req, res) => {
  try {
    // A JOIN B JOIN C

    // let data = await models.user.findAll({
    //   where: {
    //     full_name: {
    //       [Op.like]: '%ang%',  // SELECT * FROM user WHERE full_name LIKE '%a%';
    //     },
    //   },
    // });

    // Tìm xem từng thằng food nó thuộc thằng food_type nào
    // let data = await models.food.findAll({
    //   // include : [models.food_type] // truyền chuỗi hoặc mảng, mảng dùng cho 3 bảng trở lên,
    //   include: ['type'], //food.belongsTo(food_type, { as: 'type', foreignKey: 'type_id' });
    // });

    // Tìm xem từng thằng food_type có bao nhiêu thằng food
    // let data = await models.food_type.findAll({
    //   // include : [models.food_type] // truyền chuỗi hoặc mảng, mảng dùng cho 3 bảng trở lên,
    //   include: ['foods'], //food_type.hasMany(food, { as: 'foods', foreignKey: 'type_id' });
    // });

    // let data = await models.order.findAll({
    //   include: ['food', 'user'],
    // }); // lấy dữ liệu 3 bảng

    // xem thằng user đó đặt những món gì
    // let data = await models.user.findAll({
    //   include: ['food_id_foods'], //user.belongsToMany(food, { as: 'food_id_foods', through: order, foreignKey: "user_id", otherKey: "food_id" });
    // });

    // xem bao nhiêu người đặt món đó
    // let data = await models.food.findAll({
    //   include: ['lst_user_order'], //food.belongsToMany(user, { as: 'lst_user_order', through: order, foreignKey: "food_id", otherKey: "user_id" });
    // });

    //----------------------------------------//

    // Bài tập
    // Xem bao nhiêu người like nhà hàng đó
    // let data = await models.restaurant.findAll({
    //   include: ['user_id_users'], //food.belongsToMany(user, { as: 'lst_user_order', through: order, foreignKey: "food_id", otherKey: "user_id" });
    // });

    // Xem từng người like những nhà hàng nào
    let data = await models.user.findAll({
      include: ['res_id_restaurants'], //food.belongsToMany(user, { as: 'lst_user_order', through: order, foreignKey: "food_id", otherKey: "user_id" });
    });

    // res.status(200).send(data);
    successCode(res, 'Lấy data thành công', data);
  } catch (error) {
    // res.status(500).send('Lỗi BE');
    errorCode(res, 'Lỗi BE');
  }
}; // trả ra list obj

const getUserId = async (req, res) => {
  try {
    let { user_id } = req.params;
    let data = await models.user.findOne({
      where: {
        user_id,
      },
    });
    // res.send(data);
    successCode(res, 'lấy user thành công', data);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

const createUser = async (req, res) => {
  try {
    let { user_id, full_name, email, pass_word } = req.body;

    //insert into user Values()
    await models.user.create({ full_name, email, pass_word });
    res.status(200).send(req.body);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
    // res.status(500).send('Lỗi BE');
  }
};

const updateUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    let { full_name, email, pass_word } = req.body;
    let newData = {
      full_name,
      email,
      pass_word,
    };

    console.log('user_id ', user_id);
    await models.user.update(newData, {
      where: {
        user_id,
      },
    });
    // res.send('Update thành công');
    successCode(res, 'update thành công', newData);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

const deleteUser = async (req, res) => {
  try {
    let { user_id } = req.params;
    await models.user.destroy({
      where: {
        user_id,
      },
    });
    // res.send('Delete User success');
    successCode(res, 'delete user thành công');
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

const getUserPaging = async (req, res) => {
  let { page, pageSize } = req.params;
  // let pageSize = 4;

  const index = (page - 1) * pageSize;

  let data = await models.user.findAll({
    offset: index,
    limit: +pageSize, //Number(pageSize)
  });
  res.send(data);
};

// User Rating

const createUserRating = async (req, res) => {
  try {
    // let { user_id } = req.params;
    let { user_id, res_id } = req.body;
    let newData = {
      user_id,
      res_id,
    };

    await models.rate_res.create({ user_id, res_id });
    // res.send('Update thành công');
    successCode(res, 'create rating user thành công', newData);
  } catch (error) {
    errorCode(res, 'Lỗi BE');
  }
};

module.exports = {
  getUser,
  createUser,
  getUserId,
  updateUser,
  deleteUser,
  getUserPaging,
  createUserRating,
};
