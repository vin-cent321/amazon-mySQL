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
        shopping();
    })
};

function shopping() {
    inquirer
        .prompt({
            name: "productToBuy",
            type: "input",
            message: "Please enter the item Id of the product you wish to purchase!"
        })
        .then(function (answer1) {
            var selection = answer1.productToBuy;
            connection.query("SELECT * FROM products WHERE item_id=?", selection, function (
                err,
                res
            ) {
                if (err) throw err;
                if (res.length === 0) {
                    console.log(
                        "That product doesn't exist, please enter an item Id from the list above."
                    );
                    shopping();
                } else {
                    inquirer
                        .prompt({
                            name: "quantity",
                            type: "input",
                            message: "How many items would you like to purchase?"
                        })
                        .then(function (answer2) {
                            var quantity = answer2.quantity;
                            if (quantity > res[0].stock_quantity) {
                                console.log(
                                    "Our Apologies we only have " +
                                    res[0].stock_quantity +
                                    " items of the product selected"
                                );
                                shopping();
                            } else {
                                console.log("");
                                console.log(res[0].product_name + " purchased");
                                console.log(quantity + " qty @ $" + res[0].price);
                                var newQuantity = res[0].stock_quantity - quantity;
                                connection.query(
                                    "UPDATE products SET stock_quantity = " +
                                    newQuantity +
                                    " WHERE item_id = " +
                                    res[0].item_id,
                                    function (err) {
                                        if (err) throw err;
                                        console.log("");
                                        console.log("Your Order has been Processed");
                                        console.log("Thank you for Shopping with us...!");
                                        console.log("");
                        
                                    }
                                );
                            }
                        });
                }
            });
        });
};

display();