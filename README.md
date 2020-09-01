# GraphQL

## Overview

- A query language for apis
- Super fast
- Gives more power to requests

## Types

- ### Scalar Types

  - String
  - Boolean
  - Int
  - Float
  - ID

- ### Custom Types

## Requirements

- Type definitions

  - ! suffixing a Scalar type signifies the value cannot be `null`

```js
const typeDefs = `
  type Query {
    hello: String!
    name: String!,
    location: String!,
    bio: String!
  }
`;
```

- Resolvers

```js
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    name() {
      return 'Siddharth';
    },
    location() {
      return 'Surat, IN';
    },
    bio() {
      return 'Like to sleep';
    },
  },
};
```

- Operation Arguments - To pass data from client to server
