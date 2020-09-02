const Comment = {
  author(parent, args, { db: { users } }, info) {
    return users.find(({ id }) => id === parent.author);
  },
  post(parent, args, { db: { posts } }, info) {
    return posts.find(({ id }) => id === parent.post);
  },
};

export { Comment as default };
