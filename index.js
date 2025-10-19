import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema, { root } from './schemas/character.schema.js';
import loggerMiddleware from './middlewares/logger.js';
import { sequelize } from './database.js';
import './services/redis.config.js';

const app = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

sequelize.sync().then(() => {
  console.log('✅ Database connected');
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}/graphql`)
  );
});
