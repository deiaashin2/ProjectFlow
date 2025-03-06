# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### MockApi Endpoints

API Endpoint: https://67c79ebcc19eb8753e7a2f85.mockapi.io/api/v1

| Endpoint                | Resource |
|-------------------------|----------|
| GET /users              | User[]   |
| GET /user               | User     |
| POST /users/{userId}    | User     |
| PUT /users/{userId}     | User     |
| DELETE /users/${userId} | User     |


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

| Endpoint                  | Resource |
|--------------------------_|----------|
| GET /groups               | Group[]  |
| GET /group                | Group    |
| POST /groups/{groupId}    | Group    |
| PUT /groups/{groupId}     | Group    |
| DELETE /groups/${groupId} | Group    |

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
