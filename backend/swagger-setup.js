/**
 * configuration of swagger of an application in expressjs.
 * @param {express} app Application express
 */

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("./routes/swagger.json");
const setup = (app) =>
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

module.exports = setup;
