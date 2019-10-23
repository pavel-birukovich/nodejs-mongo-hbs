const express = require("express");
const exphbs = require("express-handlebars");
const {MongoClient} = require("mongodb");
const mongoose  = require("mongoose");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");


const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));

app.use("/", homeRoutes);
app.use("/about", aboutRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    const dbUrl = "mongodb://127.0.0.1:27017";
    const dbName = "lexa-shop";
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
        // MongoClient.connect(dbUrl, (err, client) => {
        //     const db = client.db(dbName);

        //     let userList = [
        //         {
        //             name: "Pavel",
        //             lastName: "Birukovich"
        //         },
        //         {
        //             name: "Alex",
        //             lastName: "Alex"
        //         }
        //     ];
        //     db.collection("users").insertMany(userList, (err, result) => {
        //         console.log(result);
        //     })
        // });
    } catch(e) {
        console.log(e)
    }
}

start();
