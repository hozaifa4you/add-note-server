const { connect, connection } = require("mongoose");

exports.dbConnection = async () => {
	try {
		connect(
			process.env.DB,
			{
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			},
			() => {
				console.log(`Database connected at: ${connection.host}`);
			}
		);
	} catch (err) {
		console.log(err.message);
	}
};
