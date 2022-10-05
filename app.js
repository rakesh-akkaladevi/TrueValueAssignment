const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "usersData.db");
const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    ID: dbObject.id,
    FirstName: dbObject.first_name,
    LastName: dbObject.last_name,
    CompanyName: dbObject.company_name,
    Age: dbObject.age,
    City: dbObject.city,
    State: dbObject.state,
    Zip: dbObject.zip,
    Email: dbObject.email,
    Web: dbObject.web,
  };
};

app.get("/api/users/", async (request, response) => {
  let usersArray = null;
  let sortBy = null;
  let order = null;
  const { page = 0, limit = 5, name = "", sort } = request.query;
  if (sort[0] === "-") {
    order = "DESC";
    sortBy = sort.substr(1);
  } else {
    order = "ASC";
    sortBy = sort;
  }
  const getUsersQuery = `
    SELECT
      *
    FROM
      mytable
    WHERE
      first_name LIKE "%${name}%" OR last_name LIKE "%${name}%"
    ORDER BY ${sortBy} ${order}
    LIMIT ${limit} OFFSET ${page}
    ;`;
  usersArray = await database.all(getUsersQuery);
  response.send(
    usersArray.map((eachUser) => convertDbObjectToResponseObject(eachUser))
  );
});

app.get("/api/users/:id/", async (request, response) => {
  const { id } = request.params;
  const getUsersQuery = `
    SELECT 
      * 
    FROM 
      mytable
    WHERE 
      id = ${id};`;
  const user = await database.get(getUsersQuery);
  response.send(convertDbObjectToResponseObject(user));
});

app.post("/api/users/", async (request, response) => {
  const {
    FirstName,
    LastName,
    CompanyName,
    Age,
    City,
    State,
    Zip,
    Email,
    Web,
  } = request.body;
  const postUserQuery = `
  INSERT INTO
    mytable (first_name, last_name, company_name, age, city, state, zip, email, web)
  VALUES
    ('${FirstName}', ${LastName}, '${CompanyName}','${Age}','${City}','${State}','${Zip}','${Email}','${Web}');`;
  const user = await database.run(postUserQuery);
  response.send("New user added");
});

app.put("/api/users/:id/", async (request, response) => {
  const {
    FirstName,
    LastName,
    CompanyName,
    Age,
    City,
    State,
    Zip,
    Email,
    Web,
  } = request.body;
  const { id } = request.params;
  const updateUserQuery = `
  UPDATE
    mytable
  SET
    first_name = '${FirstName}',
    last_name = ${LastName},
    company_name = '${CompanyName}',
    age = ${Age},
    city = ${City},
    state = ${State},
    zip = ${Zip},
    email = ${Email},
    web = ${Web}
  WHERE
    id = ${id};`;
  await database.run(updateUserQuery);
  response.send("User Details Updated");
});

app.delete("/api/users/:id/", async (request, response) => {
  const { id } = request.params;
  const deleteUserQuery = `
  DELETE FROM
    mytable
  WHERE
     id = ${id};`;
  await database.run(deleteUserQuery);
  response.send("User Removed");
});

module.exports = app;
