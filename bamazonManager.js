// set up variables
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// create connection 

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // Username
    user: 'root',

    // Password
    password: "NEWPASS",
    database: "bamazon_DB"
});

// global variables
connection.connect(function(err) {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId);
    promptManager();
});

    // var managerOptions = {
    // productList: [],
function promptManager() {
        // var products;
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'action',
        message: 'Please select an option',
        choices:  [
            'View Products for Sale',
            'View Low Inventory', 
            'Add to Inventory', 
            'Add New Product',
            'Exit'
            ]
        }
    ]).then(function(answer) {
    switch (answer.action) {
        case 'View Products for Sale':
        viewProducts();
        break;

       case 'View Low Inventory':
       lowInventory();
       break;

       case 'Add to Inventory':
       addInventory();
       break;

       case 'Add New Product':
       newProduct();
       break;

       case 'Exit':
       connection.end();
       break;
        }
    });
};

function viewProducts() {
    // console.log('===========================================================================');
    console.log('\n============================ PRODUCTS FOR SALE =============================  \n');
    var query = 'SELECT * FROM products';
    connection.query(query, 
        function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            colWidths: [5, 30, 20, 10, 20]
        });
        for (i = 0; i < res.length; i++){
         table.push(
            [res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
        // results.forEach(function (element) {
        //     console.log(element.item_id + element.product_name + element.dept_name + element.price);
        //     });
        };
        console.log(table.toString());
        promptManager();
    });
};
                // [res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price]
    //  console.log('**********************');
            // console.log(res[i].item_id);
        // }
    //    console.log(table.toString());
        // connection.end();
//        
//     });
// };

function lowInventory() {
    console.log('===========================================================================');
    console.log('\n Selecting products with low inventory...\n');
    var query = 'SELECT item_id, product_name, dept_name, price, stock_quantity FROM products WHERE stock_quantity<5';
    connection.query(query,
    function(err, res) {
        if (err) throw err;

        // if there are no items with low quantity
        if (res.length === 0) {
            console.log('\nThere are currently no items with low inventory! \n');
            promptManager();
        } else {

        var table = new Table({
            head: ['item_id', 'Product', 'Stock Quantity'],
            colWidths: [10, 30, 10]
        });
        for (i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]
            );
        };
        console.log(table.toString());
            promptManager();
        }
    });
};

function addInventory() {
    var table = new Table({
        head: ['ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
        colWidths: [5, 30, 20, 10, 10]
    });
      
    // console.log('--------------------------------------------');
    console.log('\n All prods...\n');
    var query = 'SELECT * FROM products';
    connection.query(query,
    function(err, res) {
       
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    // viewProducts();

    var startID = res[0].item_id;
    var endID = res[res.length-1].item_id;
    
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter the item ID which you would like to stock',
            name: 'addMore',
            validate: function(input) {
                if (isNaN(input) === false && (input >= startID && input <= endID)) {
                    // if (err) throw err;
                    return true;
                    }   
                    console.log('\n Please enter a valid item id')
                    return false;
            }
        },
        {
            type: 'input',
            message: 'Please enter the quantity of items',
            name: 'quantity',
            validate: function(input) {
                if (isNaN(input) === false && input.length > 0) {
                    // if (err) throw err;
                    return true;
                    }   
                        console.log('\n Please enter a valid quantity')
                    return false;
                    }  
        }
    ]).then(function(answer) {
        var quantityAdded = answer.quantity;
        var restockItem = answer.addMore;

        connection.query('SELECT * FROM products WHERE item_id = ' + restockItem,
        function(err, res) {
            console.log('Adding ' + answer.quantity + ' * ' + res[0].product_name );

            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: '\n Confirm order? \n'
                }
            ]).then(function(answer) {
                if (answer.confirm !== true) {
                    addInventory();
                } else {
                connection.query('UPDATE products SET stock_quantity = stock_quantity + ' + quantityAdded + ' WHERE item_id = ' + restockItem);
                console.log('Inventory updated.')
                promptManager();
                }
            });
            // var updatedInventory = res[0].stock_quantity + quantityAdded;
            // console.log('New Inventory: ' + updatedInventory);

        });
    });
});
};
            
//  

function newProduct() {
    inquirer.prompt([
        {
        name: 'product_name',
        type: 'input',
        message: 'Please enter name for new product.'
        },
        {
        name: 'dept_name',
        type: 'input',
        message: 'Please enter department name for new product'
        },
        {
        name: 'price',
        type: 'input',
        message: 'Please enter price for new product',
        validate: function(input) {
            if (isNaN(input) === false) {
                return true;
            }
            console.log('\n Please enter a valid price')
            return false;
        }
        },
        {
        name: "stock_quantity",
        type: "input",
        message: 'Enter the quantity in stock for the new product',
        validate: function(input) {
            if (isNaN(input) === false && input.length >= 1) {
                // if (err) throw err;
                return true;
                }   
                    console.log('\n Please enter a valid quantity')
                return false;
            }  
        }
    ]).then(function(answer) {
        
        var newItem = {
            product_name: answer.product_name,
            dept_name: answer.dept_name,
            price: parseFloat(answer.price),
            stock_quantity: parseInt(answer.stock_quantity)
        }

        console.log('> Adding ' +  answer.product_name + '...');

        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: '\n Confirm new product? \n'
            }
        ]).then(function(answer) {
            if (answer.confirm !== true) {
                promptManager();
            } else {
                connection.query('INSERT INTO products SET ?', newItem,
                function(err, res) {
                    if (err) throw err;

                console.log('Item added.');
                promptManager();
                });
            }

            });
        });
    };

   
