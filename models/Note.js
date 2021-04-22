const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		data: { type: Date, default: Date.now() },
		user_id: { type: String, required: true },
		name: { type: String, required: true },
	},
	{ timestamps: true }
);

const Note = model("Note", noteSchema);

module.exports = Note;
