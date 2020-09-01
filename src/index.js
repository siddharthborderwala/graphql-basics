import { GraphQLServer } from 'graphql-yoga';

function generateId() {
  const id = [];
  for (let i = 0; i < 24; i++) {
    id.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
    if ((i + 1) % 6 === 0 && i !== 23) id.push('-');
  }
  return id.join('');
}

const users = [
  {
    id: '1',
    name: 'Siddharth',
    email: 'sid@hi.com',
    age: 19,
    comments: ['2'],
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@hi.com',
    age: 29,
    comments: ['3'],
  },
  {
    id: '3',
    name: 'Angela',
    email: 'angela@hi.com',
    comments: ['1'],
  },
];

const posts = [
  {
    id: '1',
    title: 'Development',
    body: 'Development is a tech job',
    published: true,
    author: '1',
    comments: ['2'],
  },
  {
    id: '2',
    title: 'Architecture',
    body: 'Architecture is very important',
    published: false,
    author: '2',
    comments: ['3'],
  },
  {
    id: '3',
    title: 'Developer',
    body: 'A developer makes houses',
    published: true,
    author: '3',
    comments: ['1'],
  },
];

const comments = [
  {
    id: '1',
    text: 'Awesome',
    post: '1',
    author: '3',
  },
  {
    id: '2',
    text: 'Superb',
    post: '2',
    author: '1',
  },
  {
    id: '3',
    text: 'Nice',
    post: '3',
    author: '2',
  },
];

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`;

const resolvers = {
  Query: {
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
    users(parent, args, ctx, info) {
      const { query } = args;
      if (!query) return users;

      return users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    posts(parent, args, ctx, info) {
      const query = (args.query || '').toLowerCase();
      if (!query) return posts;

      return posts.filter((post) => {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();

        return title.includes(query) || body.includes(query);
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const { name, email, age } = args;
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
    createPost(parent, args, ctx, info) {
      const { title, body, published, author } = args;
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
    createComment(parent, args, ctx, info) {
      const { author, post } = args;

      if (!users.some(({ id }) => id === author))
        throw new Error('User not found');
      if (!posts.some(({ id, published }) => id === post && published))
        throw new Error('Post not found');

      const text = args.text.trim();
      if (!text) throw new Error('Comment cannot be empty');

      const newComment = {
        text,
        author,
        post,
        id: generateId(),
      };

      comments.push(newComment);

      return newComment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(({ post }) => post === parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(({ author }) => author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(({ author }) => author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(({ id }) => id === parent.post);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start().then((value) => {
  console.log(`Server listening on http://localhost:${value.address().port}`);
});
