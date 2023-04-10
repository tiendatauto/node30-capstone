// tạo server BE bằng express
const express = require('express'); // import thư viện
const app = express();
// middleware
// chuyển dữ liệu sang dạng json để req.body có thể hiểu
app.use(express.json());

const cors = require('cors');
app.use(cors());

// khởi tạo server với port bất kỳ
app.listen(8080);

const rootRouter = require('./Router/rootRouter');
const sequelize = require('./Models');

app.use('/api', rootRouter);

// ORM: sequelize => findAll, prisma => findMany

// kết nối CSDL
// kết nối các table (CSDL) với model (javascript) lại với nhau => ORM(Object Relational mapping)
// không cần phải viết các câu truy vấn bằng SQL

// yarn add swagger-ui-express swagger-jsdoc

// yarn add swagger-ui-express swagger-jsdoc
// yarn add swagger-ui-express swagger-jsdoc
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'api',
      version: '1.0.100',
      description: 'abc',
    },
  },
  apis: ['src/swagger/index.js'],
};

const specs = swaggerJsDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
