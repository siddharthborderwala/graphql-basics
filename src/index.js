import { GraphQLServer } from 'graphql-yoga';

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
        id: '456-456-456-456-',
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
      const query = args.query.toLowerCase();
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
