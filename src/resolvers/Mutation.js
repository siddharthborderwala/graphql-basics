import { generateId } from '../utils';

const Mutation = {
  /**
   * Mutations for User
   */
  createUser(parent, args, { db: { users } }, info) {
    const { name, email, age } = args.data;
    if (users.some((user) => user.email === email))
      throw new Error('Email not available');

    const newUser = {
      name,
      email,
      age,
      id: generateId(),
    };

    users.push(newUser);

    return newUser;
  },
  deleteUser(parent, args, { db: { users, posts, comments } }, info) {
    const { id } = args;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error('User not found');

    const [deletedUser] = users.splice(userIndex, 1);

    posts = posts.filter((post) => {
      const match = post.author === id;

      if (match)
        comments = comments.filter((comment) => comment.post !== post.id);

      return !match;
    });

    comments = comments.filter((comment) => comment.author !== id);

    return deletedUser;
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found');

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) throw new Error('Email in use already');

      user.email = data.email;
    }

    if (typeof data.name === 'string') user.name = data.name;

    if (typeof data.age === 'undefined' || typeof data.age === 'number')
      user.age = data.age;

    return user;
  },
  /**
   * Mutations for Post
   */
  createPost(parent, args, { db: { users, posts } }, info) {
    const { title, body, published, author } = args.data;
    if (!users.some((user) => user.id === author))
      throw new Error('User not found');

    const newPost = {
      id: generateId(),
      title,
      body,
      published,
      author,
    };

    posts.push(newPost);

    return newPost;
  },
  deletePost(parent, args, { db: { comments, users, posts } }, info) {
    const { id } = args;
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) throw new Error('Post not found');

    const [deletedPost] = posts.splice(postIndex, 1);

    comments = comments.filter((comment) => comment.post !== id);

    const postAuthorIndex = users.findIndex(
      (user) => user.id === deletedPost.author
    );
    users[postAuthorIndex].posts = users[postAuthorIndex].posts.filter(
      (postId) => postId === id
    );

    return;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.some((post) => post.id === id);

    if (!post) throw new Error('Post not found');

    if (typeof data.title === 'string') post.title = data.title;

    if (typeof data.body === 'string') post.body = data.body;

    if (typeof data.published === 'boolean') post.published = data.published;

    return post;
  },
  /**
   * Mutations for Comments
   */
  createComment(parent, args, { db: { comments } }, info) {
    const { author, post } = args.data;

    if (!users.some(({ id }) => id === author))
      throw new Error('User not found');
    if (!posts.some(({ id, published }) => id === post && published))
      throw new Error('Post not found');

    const text = args.data.text.trim();
    if (!text) throw new Error('Comment cannot be blank');

    const newComment = {
      text,
      author,
      post,
      id: generateId(),
    };

    comments.push(newComment);

    return newComment;
  },
  deleteComment(parent, args, { db: { comments } }, info) {
    const { id } = args;
    const commentIndex = comments.findIndex((comment) => comment.id === id);

    if (commentIndex === -1) throw new Error('Comment not found');

    const [deletedComment] = comments.splice(commentIndex, 1);

    return deletedComment;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.some((comment) => comment.id === id);

    if (!comment) throw new Error('Comment not found');

    if (typeof data.text === 'string') comment.text = data.text;

    return comment;
  },
};

export { Mutation as default };
