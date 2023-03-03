const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex");

const postgres = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "password",
    database: "smart-brain",
  },
});
postgres.select("*").from("users").then(console.log);
const saltRounds = 10;

const app = express();

const port = 4001 || process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res, next) => {
  res.send(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  postgres
    .select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length == 0) {
        res.status(404).send("not found");
      } else {
        res.json(user[0]);
      }
    });
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(password, saltRounds);

  postgres.transaction((trx) => {
    trx
      .insert({
        hash,
        email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        console.log(loginEmail);
        return postgres("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(404).send("unable to register"));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  postgres
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((user) => {
      const found = bcrypt.compareSync(password, user[0].hash);
      if (found) {
        postgres
          .select("*")
          .from("users")
          .where({ email })
          .then((users) => {
            res.json(users[0]);
          })
          .catch((err) => res.status(400).send("unable to get user"));
      } else {
        res.status(403).send("unable to get user");
      }
    })
    .catch((err) => res.status(400).send("Something went wrong"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  postgres("users")
    .where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
});

//  /signin
// /register
// /profile
// /image

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
