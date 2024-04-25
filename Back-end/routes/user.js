/**
 * Rotas de customers.
 * Os endereços definidos para o objeto Router
 * são relativos a /customers,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
 */
const app = express().Router();

const userData = [
  { id: 0, name: "Apotre" },
  { id: 1, name: "Manzi" },
  { id: 2, name: "divine" },
];

/**
 * @swagger
 * /users:
 *  get:
 *    tags: [users]
 *    description: Obtain a list of user
 *    responses:
 *      '200':
 *        description: users obtained succussefully
 *  tags: users
 */
app.get("/", (req, res) => res.json(userData));

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do cliente
 *        required: true
 *        type: integer
 *    tags: [users]
 *    description: Obtém um cliente pelo id
 *    responses:
 *      '200':
 *        description: users obtained succussefully
 *      '404':
 *        description: users not found or retieved successfully
 *
 */
app.get("/users/:id", (req, res) => res.json(userData[req.params.id]));

/**
 * @swagger
 * /login:
 *  post:
 *    parameters:
 *      - name: Body
 *        in: path
 *        description: user need to be added
 *        required: true
 *        type: integer
 *    tags: [users]
 *    description: Obtém um cliente pelo id
 *    responses:
 *      '200':
 *        description: users obtained succussefully
 *      '404':
 *        description: users not found or retieved successfully
 *
 */

module.exports = user;
