const express = require('express');
require('dotenv').config();
require('./config/database');
const PORT = process.env.PORT;
const userRouter = require('./routes/userRouter');
const roomRouter = require('./routes/roomRouter');
const categoryRouter = require('./routes/categoryRouter');
const EXPRESS_SECRET = process.env.EXPRESS_SECRET;
const session = require('express-session');
const passport = require('passport');
require('./middleware/passport');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();
app.use(express.json());

//This is used for the passport
app.use(session({
    secret: EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false
})) 

app.use(passport.initialize());
app.use(passport.session());


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My First Swagger Documentation',
      version: '1.0.0',
      description:
        'This is the first swagger documentation i have ever done',
      license: {
        name:'Base_URL: https://authentication-4hec.onrender.com',
        // url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Ai Engineer',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },

    "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      },

      security: [{BearerAuth: []}],

    //Two urls in the server object, one is the development server and the other is the production server
    servers: [
        {
            url: 'https://authentication-4hec.onrender.com',
            description: 'Production server',
          },
      {
        url: 'http://localhost:4060',
        description: 'Development server',
      },
     
    ],
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
  };

    app.get('/', (req, res) => {
        res.send('Welcome to Ai First Swagger Documentation');
    });

  const swaggerSpec = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    
  


// app.use('/api/v1', userRouter);
app.use(userRouter);
app.use(roomRouter);
app.use(categoryRouter);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});