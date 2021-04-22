const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await User.findOne({ email });
		if (user)
			return res.status(400).json({ msg: "The email already exists." });

		const passwordHash = await bcrypt.hash(password, 12);
		const newUser = new User({ username, email, password: passwordHash });
		await newUser
			.save()
			.then(savedUser => {
				res.status(200).json({ msg: "Signup success" });
			})
			.catch(err => res.status(500).json({ msg: err.message }));
	} catch (err) {
		res.status(500).json({ msg: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ msg: "Invalid Credentials" });

		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched)
			return res.status(404).json({ msg: "Invalid Credentials" });

		// a successful login
		const payload = { id: user._id, name: user.username, isAuth: true };
		const token = await jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "5h",
		});

		res.status(200).json({ token,msg:'login success' });
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

exports.verifiedToken = async (req, res) => {
	try {
		const token = req.header("authorization");
		if (!token) return res.send(false);

		jwt.verify(token, process.env.JWT_SECRET, async (err, verified) => {
			if (err) return res.send(false);

			const user = await User.findById(verified.id);
			if (!user) return res.send(false);

			return res.send(true);
		});
	} catch (er) {
		return res.status(500).json({ msg: err.message });
	}
};
