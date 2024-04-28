const express = require("express");
const router = express.Router();

const redis = require("../redis/index.js");
const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  let added_todos = await redis.getAsync("todos");

  if (!added_todos) {
    await redis.setAsync("todos", 0);
    added_todos = 0;
  }

  res.send({ added_todos });
});

module.exports = router;
