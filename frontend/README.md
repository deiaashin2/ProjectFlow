# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## MockApi Endpoints

API Endpoint Base URL: https://67c79ebcc19eb8753e7a2f85.mockapi.io/api/v1

### User Endpoints

| Endpoint                   | Description                     | Resource |
|----------------------------|---------------------------------|----------|
| GET /users                 | Get a list of users             | User[]   |
| GET /user/{userId}         | Get a user by ID                | User     |
| POST /users                | Create a new group              | User     |
| PUT /users/{userId}        | Update a group                  | User     |
| DELETE /users/{userId}     | Delete a group                  | User     |
| GET /users/{userId}/groups | Get a list of groups for a user | Group[]  |


Example Data: https://67c79ebcc19eb8753e7a2f85.mockapi.io/api/v1/users

```
[
  {
    "createdAt": "2025-03-05T05:33:33.116Z",
    "username": "Dayne.Rosenbaum98",
    "avatar": "https://loremflickr.com/640/480",
    "email": "Celestino_DAmore@example.net",
    "online": true,
    "role": "Owner",
    "password": "cow",
    "id": "1"
  },
  {
    "createdAt": "2025-03-05T01:24:19.826Z",
    "username": "Olin56",
    "avatar": "https://loremflickr.com/640/480",
    "email": "Willie35@example.com",
    "online": true,
    "role": "Admin",
    "password": "cat",
    "id": "2"
  },
]
```

### Group Endpoints

| Endpoint                  | Description          | Resource |
|---------------------------|----------------------|----------|
| GET /groups               | Get a list of groups | Group[]  |
| GET /group{groupId}       | Get a group by ID    | Group    |
| POST /groups              | Create a new group   | Group    |
| PUT /groups/{groupId}     | Update a group       | Group    |
| DELETE /groups/{groupId}  | Delete a group       | Group    |

Example Data: https://67c79ebcc19eb8753e7a2f85.mockapi.io/api/v1/groups

```
[
  {
    "createdAt": "2025-03-05T04:27:52.027Z",
    "name": "Bentley",
    "banner": "https://loremflickr.com/640/480/abstract",
    "members": 71429,
    "description": "Vitae et a amet autem temporibus eos suscipit repellat.",
    "id": "1",
    "userId": "1"
  },
  {
    "createdAt": "2025-03-05T23:29:36.163Z",
    "name": "programming",
    "banner": "https://loremflickr.com/640/480/abstract",
    "members": 63454,
    "description": "Tempora quos asperiores libero.",
    "id": "2",
    "userId": "2"
  },
]
```

### Getting Started Locally

1. Change into the frontend directory

```
cd frontend
```

2. Install dependencies

```
npm install
```

3. Start the development server

```
npm run dev
```
