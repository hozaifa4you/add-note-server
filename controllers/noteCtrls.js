const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
	try {
		// console.log(req.user);
		const notes = await Note.find({ user_id: req.user.id });
		// console.log(notes);
		if (!notes.length)
			return res.status(404).json({ msg: "You don't have any note." });

		res.status(200).json(notes);
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

exports.createNote = async (req, res) => {
	try {
		const { title, content, date } = req.body;

		const newNote = new Note({
			title,
			content,
			date,
			user_id: req.user.id,
			name: req.user.name,
		});

		await newNote
			.save()
			.then(() => res.status(200).json({ msg: "New note saved." }))
			.catch(err => res.status(500).json({ msg: err.message }));
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

exports.deleteNote = async (req, res) => {
	try {
		await Note.findOneAndRemove(req.params.id);
		res.status(200).json({ msg: "Deleted the note." });
	} catch (err) {
		return res.status(400).json({ msg: err.message });
	}
};

exports.updateNote = async (req, res) => {
	try {
		const { title, content, date } = req.body;
		await Note.findOneAndUpdate(
			{ _id: req.params.id },
			{ title, content, date }
		);
		res.status(200).json({ msg: "Updated successful." });
	} catch (err) {
		return res.status(400).json({ msg: err.message });
	}
};

exports.getNote = async (req, res) => {
	try {
		const note = await Note.findOne({ _id: req.params.id });
		res.status(200).json({ note });
	} catch (err) {
		return res.status(400).json({ msg: err.message });
	}
};
