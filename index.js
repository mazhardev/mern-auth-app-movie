const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth.routes');
const noteRoute = require('./routes/note.routes');
const movieRoute = require('./routes/movie.routes');

const dbURI = "mongodb+srv://mazhar:PgtD4EuoeFw7dNXE@cluster0.fjags.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api', noteRoute);
app.use('/api', movieRoute);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })


// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// .  }


app.listen(2400, () => { console.log("Server started: 2400") })