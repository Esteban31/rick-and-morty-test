import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema, { root } from './src/schemas/character.schema.js';
import loggerMiddleware from './src/middlewares/logger.js';
import { sequelize } from './database.js';
import './src/services/redis.service.js';

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

sequelize.sync().then(() => {
  console.log('MYSQL Connection established successfully');
  app.listen(process.env.PORT, () =>
    console.log(`Server running at http://localhost:${process.env.PORT}/`)
  );
});
