# Todo Application

Given two files `app.js` and a database file `usersData.db` consisting a table `mytable`.

Write APIs to perform operations on the table `mytable` containing the following columns,

| Columns      | Type    |
| ------------ | ------- |
| id           | INTEGER |
| first_name   | TEXT    |
| last_name    | INTEGER |
| company_name | TEXT    |
| city         | TEXT    |
| state        | TEXT    |
| zip          | INTEGER |
| email        | TEXT    |
| web          | TEXT    |
| age          | INTEGER |

<MultiLineNote>
  
  - Possible query parameters.
  - Page - display a number for pagination.
  - Limit - no. of items to be returned, default limit is 5.
  - Name - user searched by name as a substring in First Name or Last Name. It is case-insensitive.
  - Sort - name of attribute, the items to be sorted. By default it returns items in ascending order if this parameter exist, and if the value of parameter is prefixed with ‘-’ character, then it returns items in descending order.

</MultiLineNote>

### API 1

#### Path: `/api/users`

#### Method: `GET`

#### Description:

Returns a list of all users.

#### Response

```
[
  {
    "id": 1,
    "first_name": "James",
    "last_name": "Butt",
    "company_name": "Benton, John B Jr",
    "city": "New Orleans",
    "state": "LA",
    "zip": 70116,
    "email": "jbutt@gmail.com",
    "web": "http://www.bentonjohnbjr.com",
    "age": 70
  },
  {
    "id": 2,
    "first_name": "Josephine",
    "last_name": "Darakjy",
    "company_name": "Chanay, Jeffrey A Esq",
    "city": "Brighton",
    "state": "MI",
    "zip": 48116,
    "email": "josephine_darakjy@darakjy.org",
    "web": "http://www.chanayjeffreyaesq.com",
    "age": 48
  }
  ...
]
```

### API 2

#### Path: `/api/users/:id`

#### Method: `GET`

#### Description:

Returns a specific user based on the user ID

#### Response

```
{
    "id": 1,
    "first_name": "James",
    "last_name": "Butt",
    "company_name": "Benton, John B Jr",
    "city": "New Orleans",
    "state": "LA",
    "zip": 70116,
    "email": "jbutt@gmail.com",
    "web": "http://www.bentonjohnbjr.com",
    "age": 70
  }
```

### API 3

#### Path: `/api/users`

#### Method: `POST`

#### Description:

Create a new user,

#### Request

```
{
  "id": 2,
  "first_name": "Josephine",
  "last_name": "Darakjy",
  "company_name": "Chanay, Jeffrey A Esq",
  "city": "Brighton",
  "state": "MI",
  "zip": 48116,
  "email": "josephine_darakjy@darakjy.org",
  "web": "http://www.chanayjeffreyaesq.com",
  "age": 48
}
```

#### Response

```
User Successfully Added
```

### API 4

#### Path: `/api/users/:id`

#### Method: `PUT`

#### Description:

Updates the details of a user based on the user ID

#### Request

```
{
  "first_name": "Josephine",
  "last_name": "Darakjy",
  "age": 48
}
```

#### Response

```
User Details Updated

```

### API 5

#### Path: `/api/users/:id`

#### Method: `DELETE`

#### Description:

Deletes a user based on the user ID

#### Response

```
User Removed
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
