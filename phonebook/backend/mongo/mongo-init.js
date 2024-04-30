db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("people");

db.people.insert({ name: "Arnold Davis", phone: "040-5386205" });
db.people.insert({ name: "Stewart Little", phone: "032-5496258" });
