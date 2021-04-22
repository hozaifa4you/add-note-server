require("dotenv").config();
const express = require("express");
const cors = require("cors");

// my module
const { dbConnection } = require("./config/db-connection");

//config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// db connection
dbConnection();

// end point
app.use("/user", require("./routes/userRoute"));
app.use("/api/notes", require("./routes/noteRoute"));

app.get("/", (req, res) => {
	res.status(200).json({ msg: "It's Worked" });
});

// app listen
app.listen(PORT, () => {
	console.log(`Server is listening on: http://localhost${PORT}`);
});
