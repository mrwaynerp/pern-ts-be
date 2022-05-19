require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const logger = require("./utils/logger");
const pool = require("./utils/db");
const authPool = require("./utils/authDb");
const port = process.env.PORT;

// middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));

// routes
// create todo
app.post("/todos", async (req, res) => {
	try {
		const { task, description } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (task,description) VALUES($1,$2) RETURNING *",
			[task, description]
		);
		console.log(req.body);

		return res.status(201).send(newTodo.rows[0]);
	} catch (e) {
		console.log(e.message);
		return res.status(500).send(e.message);
	}
});

// get all todos
app.get("/todos", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");
		return res.status(201).send(allTodos.rows);
	} catch (e) {
		console.log(e.message);
		return res.status(500).send(e.message);
	}
});

// get a todo
app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * from todo WHERE todo_id=$1", [id]);
		const authed = await authPool.query(
			"SELECT * FROM pernauth WHERE email=$1",
			["wayne@iplayulisten.com"]
		);
		console.log({ authed: authed.rows[0] });

		return res.status(201).send(todo.rows[0]);
	} catch (e) {
		console.log(e.message);
		return res.status(500).send(e.message);
	}
});

// update a todo
app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { status, description } = req.body;
		await pool.query(
			"UPDATE todo SET status=$1, description=$2, updatedAt=$3 WHERE todo_id=$4",
			[status, description, new Date(), id]
		);

		return res.status(201).send("Todo updated!");
	} catch (e) {
		console.log(e.message);
		return res.status(500).send(e.message);
	}
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);

		return res.status(201).send("Todo deleted!");
	} catch (e) {
		console.log(e.message);
		return res.status(500).send(e.message);
	}
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// listener
app.listen(port, () => {
	console.log(`server has started on port ${port}`);
});
