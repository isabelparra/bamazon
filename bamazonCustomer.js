// set up variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // Username
    user: 'root',

    // Password
    password: "NEWPASS",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // console.log('connected as id: ' + connection.threadId + '\n');
    displayProducts(); 
});

// Function to display all products
function displayProducts () {
    console.log('\n============================ PRODUCTS FOR SALE =============================  \n');
    console.log('===========================================================================');
    
var table = new Table({
    head: ['ID', 'Product Name', 'Department Name', 'Price'],
    colWidths: [5, 30, 20, 10]
});

var query = 'SELECT * FROM products';
   
    connection.query(query, function(err, res) {
    if (err) throw err;
    // Log all products
    // console.log(res);
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price]);
        }
        console.log(table.toString());
    newPurchase();
    });
};

function newPurchase()   {
var query = 'SELECT * FROM products order by item_id asc';
    connection.query(query, function(err, res) {
    if (err) throw err;
        // console.log('\n');

var startID = res[0].item_id;
var endID = res[res.length-1].item_id;
   
    inquirer
    .prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the ID of the item you would like to purchase',
            // validateInput()
            validate: function(input) {
                if (isNaN(input) === false && (input >= startID && input <= endID)) {
                // if (err) throw err;
                return true;
                } 
                console.log('\n Please enter a valid item id')
                return false;
            }
        }
        ,
        {
            name: "quantity",
            type: "input",
            message: 'Enter the quantity you would like to purchase',
            validate: function(input) {
                if (isNaN(input) === false  && input >= 1) {
                // if (err) throw err;
                return true;
                }   
                console.log('\n Please enter a valid quantity.')
                return false;
            }  
        }  
    ]).then(function(answer) {
        
        var quantityDesired = answer.quantity;
        var chosenItem = answer.id;

        connection.query('SELECT * FROM products WHERE item_id = ' +  chosenItem,
        function(err, res) {
            console.log('=================================================================================');
            console.log('You chose: ' + answer.quantity +  ' * ' + res[0].product_name + ' at $' + res[0].price + ' each');

        if (res[0].stock_quantity >= quantityDesired) {
            console.log('> Item(s) in stock');

        var totalCost = res[0].price * quantityDesired;
            console.log('Your total is $' + totalCost);

            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: '\n Confirm order? \n'
                }
            ]).then(function(answer) {
                if (answer.confirm !== true) {
                    continueShopping();
                } else {
                    connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityDesired + ' WHERE item_id = ' + chosenItem);
                    console.log('Thank you! Order placed.')
                    continueShopping();
                }
            });
        
    
        } else {
           console.log('Our apologies. We are out of stock');
           continueShopping();
        } 
    }); 
    }); // closing then function
    }); // query for validating id
};

function continueShopping() {
    inquirer.prompt([
        {
        type: 'confirm',
        name: 'continue',
        message: '\n Would you like to place another order? \n',  
        }
        ]).then(function(answer) {
            if (answer.continue !== true) {
                console.log('Thank you for your time. Goodbye');
                return connection.end()
                }
            return displayProducts();
        });       
};

