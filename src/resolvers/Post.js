const Post = {
  author(parent, args, { db: { users } }, info) {
    return users.find(({ id }) => id === parent.author);
  },
  comments(parent, args, { db: { comments } }, info) {
    return comments.filter(({ post }) => post === parent.id);
  },
};

export { Post as default };
