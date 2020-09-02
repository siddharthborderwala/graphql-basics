const users = [
  {
    id: '1',
    name: 'Siddharth',
    email: 'sid@hi.com',
    age: 19,
    comments: ['2'],
    posts: ['1'],
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@hi.com',
    age: 29,
    comments: ['3'],
    posts: ['2'],
  },
  {
    id: '3',
    name: 'Angela',
    email: 'angela@hi.com',
    comments: ['1'],
    posts: ['3'],
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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
