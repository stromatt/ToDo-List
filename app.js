//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        items: items
    })
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "Work List",
        items: workItems
    })
})

app.post("/", (req, res) => {

    console.log(req.body.list);
    let item = req.body.newItem;

    if (req.body.list == "Work List") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});