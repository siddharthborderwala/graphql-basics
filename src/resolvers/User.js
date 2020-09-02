const User = {
  posts(parent, args, { db: { posts } }, info) {
    return posts.filter(({ author }) => author === parent.id);
  },
  comments(parent, args, { db: { comments } }, info) {
    return comments.filter(({ author }) => author === parent.id);
  },
};

export { User as default };
