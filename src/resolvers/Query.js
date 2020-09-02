const Query = {
  me() {
    return {
      id: '123-123-123-123',
      name: 'Siddharth',
      email: 'hi@hi.com',
      age: 19,
    };
  },
  post() {
    return {
      id: '456-456-456-456',
      title: 'Graph QL is Great',
      body: 'Super duper awesome',
      published: true,
      author: 'Sid',
    };
  },
  users(parent, args, { db: { users } }, info) {
    const { query } = args;
    if (!query) return users;

    return users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  },
  posts(parent, args, { db: { posts } }, info) {
    const query = (args.query || '').toLowerCase();
    if (!query) return posts;

    return posts.filter((post) => {
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      return title.includes(query) || body.includes(query);
    });
  },
  comments(parent, args, { db: { comments } }, info) {
    return comments;
  },
};

export { Query as default };
