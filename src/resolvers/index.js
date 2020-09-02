import Query from './Query';
import Mutation from './Mutation';
import User from './User';
import Post from './Post';
import Comment from './Comment';

const resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Comment,
};

export { resolvers as default };
