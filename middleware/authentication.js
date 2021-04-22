const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
	try {
		const token = req.header("authorization");
		if (!token)
			return res.status(400).json({ msg: "Invalid Authorization." });

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err)
				return res.status(400).json({ msg: "Authorization not valid." });

			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = authorization;
