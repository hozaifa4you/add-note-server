const router = require("express").Router();

const authorization = require("../middleware/authentication");
const {
	getNotes,
	createNote,
	deleteNote,
	updateNote,
	getNote,
} = require("../controllers/noteCtrls");

router.route("/").get(authorization, getNotes).post(authorization, createNote);

router
	.route("/:id")
	.get(authorization, getNote)
	.put(authorization, updateNote)
	.delete(authorization, deleteNote);

module.exports = router;
