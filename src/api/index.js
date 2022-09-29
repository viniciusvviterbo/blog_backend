import { Router } from 'express';
import users from './routes/users.js';
import articles from './routes/articles.js';

export default () => {
  const app = Router();
  users(app);
  articles(app);
  return app;
};
