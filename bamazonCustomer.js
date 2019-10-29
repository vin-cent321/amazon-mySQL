var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    display();
});

function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-----------------------------");
        console.log("      Welcome To Bamazon    ");
        console.log("-----------------------------");
        console.log("");
        console.log("Find below our Products List");
        console.log("");

        for (var i = 0; i < res.length; i++) {
            console.log([res[i].item_id, res[i].product_name, res[i].price]);
        }

        console.log("");
        //shopping();
    })
};