var mysql = require('mysql');
var inquirer = require('inquirer');
const chalk = require('chalk');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "love2015",
  database: "bamazondb"
})
// connection to the database
connection.connect(function(err) {
  if (err) throw err;

  // Getting the database information and then display it
  startOption()
  
})


// FUNCTION to display list
function startOption() {
  console.log(chalk.bold.yellow("===============WELCOME TO BAMAZON ONLINE STORE!=======================" + "\n"));
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Display section
    console.log(chalk.yellow("----------------------Our Bamazon Products --------------------------" + "\n"));
    res.forEach(function(row) {
      console.log(chalk.blue("Item Id: " + row.id + " | Department: " + row.department_name + " | Product: " + row.product_name + " | Price: $" + row.price + "\n"));
    })
  select();
  })
}

// FUNCTION to select an item
function select() {
  inquirer.prompt([
    {
      "name": "id",
      "message": "Please type the item id below to purchase an item.",
      "type": "input"
  
    },
    {
      "name": "quantity",
      "message": "How many of this item would you like to buy?",
      "type": "input"
      // Add number validation later
    }
  ]).then(function(answer) {
    let selection;
    var quantity = parseInt(answer.quantity)
    connection.query("SELECT * FROM products", function(err, res) {
      res.forEach(function(row) {
        if (parseInt(answer.id) === row.id) {
          selection = row
        }
      })
      // If new quantity is more than zero, then continue
      if ((selection.stock_quantity - quantity) >= 0) {
        buyItem(selection, quantity)
      }
      // If new quantity is less that 0, then insufficient stock is available, and the user is redirected back to the select screen.
      else {
        console.log(chalk.red("We apologized, but we do not have enough stock to fulfill your order. You requested " + quantity + " of this item, but we only have " + selection.stock_quantity + " in stock." + "\n"));
        startOption();
      }
    })
  })
}
// FUNCTION to actually buy the item
function buyItem(item, quantity) {
  connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: (item.stock_quantity - quantity)},{product_name: item.product_name}], function(err, res) {
    if (err) throw err;
    console.log(chalk.yellow("Thank you! Your order was placed successfully!"));
    console.log(chalk.yellow("Your total amount is: " + (item.price * quantity)));
    console.log(chalk.yellow(".....Returning you now to the item menu, please wait."));
    var delay = setTimeout(startOption, 10000);
  })
}