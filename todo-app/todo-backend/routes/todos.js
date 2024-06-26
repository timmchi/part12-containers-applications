const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis/index.js");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);

  const addedTodos = await redis.getAsync("todos");
  if (!addedTodos) await redis.setAsync("todos", 0);
  await redis.setAsync("todos", addedTodos ? Number(addedTodos) + 1 : 1);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  const todo = await req.todo;

  if (!todo) return res.sendStatus(404); // Implement this

  res.send(todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const body = req.body;
  const { id } = req.todo;

  const todo = {
    text: body.text,
    done: body.done,
  };

  console.log(todo, id);

  const updatedTodo = await Todo.findByIdAndUpdate(id, todo, {
    new: true,
  });

  res.send(updatedTodo).status(200);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
