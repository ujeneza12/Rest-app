const swaggerDefinition = {
    info: {
      title: "API REST de exemplo de uso do Swagger em Node.js",
      description:
        "Mostra como configurar uma aplicação Node.js com expressjs, swagger-ui-express para geração da Swagger UI e swagger-jsdoc para especificar os endpoints implementados com expressjs por meio de comentários JSDoc."
    },
    servers: ["http://localhost:8081"]
  };
  
  const swaggerJsDoc = require("swagger-jsdoc");
  const swaggerUi = require("swagger-ui-express");
  
  const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.js"]
  };
  
  /**
   * configuration of swagger of an application in expressjs.
   * @param {express} app Application express
   */
  const setup = (app) =>
    app.use(
      "/swagger",
      swaggerUi.serve,
      swaggerUi.setup(swaggerJsDoc(swaggerOptions))
    );
  
  module.exports = setup;
  