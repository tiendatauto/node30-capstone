/**
 * @swagger
 * /api/user/get-user:
 *  get:
 *      description: responses
 *      tags: [User]
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 *  /api/user/get-user-paging/{page}/{pageSize}:
 *  get:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: page
 *      - in: path
 *        name: pageSize
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /api/user/create-user:
 *  post:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             full_name:
 *               type: string
 *             email:
 *               type: string
 *             pass_word:
 *               type: string
 *      responses:
 *          200:
 *              description: res
 */

/**
 * @swagger
 * /api/user/update-user/{id}:
 *  put:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: user
 *        schema:
 *           type: object
 *           properties:
 *             full_name:
 *               type: string
 *             email:
 *               type: string
 *             pass_word:
 *               type: string
 *      responses:
 *          200:
 *              description: res
 */

/**
 * @swagger
 * /api/user/delete-user/{id}:
 *  delete:
 *      description: responses
 *      tags: [User]
 *      parameters:
 *      - in: path
 *        name: id
 *      responses:
 *          200:
 *              description: res
 */
