import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';

import User from './User';
import Post from './Post';
import Comment from './Comment';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment,
};

export { resolvers as default };
