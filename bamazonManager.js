var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

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


// function promptManager() {


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

       case 'Add New product':
       addProduct();
       break;

       case 'Exit':
       connection.end();
       break;

    }
// console.log('You chose: ' + answer.options);
});
};


    
// };

       
 


function viewProducts() {
    console.log('-------------------------------------------------');
    console.log('\n PRODUCTS FOR SALE \n');
    var query = 'SELECT * FROM products';
    connection.query(query, 
        function(err, res) {
        if (err) throw err;
        var table = new Table({
            head: ['item_id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
            colWidths: [10, 30, 20, 10, 10]
        });
        // console.log(res);
        for (i = 0; i < res.length; i++){
         table.push(
            [res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
        // results.forEach(function (element) {
        //     console.log(element.item_id + element.product_name + element.dept_name + element.price);
        //     });
            // promptManager();
            
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





// function lowInventory() {
//     console.log('--------------------------------------------');
//     console.log('\n Selecting products with low inventory...\n');
//     var query = 'SELECT item_id, product_name, dept_name, price, stock_quantity FROM products WHERE stock_quantity<5';
//     connection.query(query,
//     function(err, res) {
//         if (err) throw err;

//         // if there are no items with low quantity
//         if (res.length === 0) {
//             console.log('There are currently no items with low inventory!');
//         } else {

//         var table = new Table({
//             head: ['item_id', 'Product', 'Stock Quantity'],
//             colWidths: [10, 30, 10]
//         });
//         for (i = 0; i < res.length; i++) {
//             table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]
//             );
//         };
//         console.log(table.toString());
//         promptManager();
//     }
//     });
// };

// function addInventory() {
      
//     // console.log('--------------------------------------------');
//     // console.log('\n All prods...\n');
//     connection.query('SELECT * FROM products',
//     function(err, res)   {
//         var table = new Table({
//             head: ['item_id', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
//             colWidths: [10, 30, 20, 10, 10]
//         });
//     for (var i = 0; i < res.length; i++) {
//         table.push([res[i].item_id, res[i].product_name, res[i].dept_name, res[i].price, res[i].stock_quantity]);
//     };
//     // viewProducts();
//     inquirer
//     .prompt([
//         {
//             type: 'integer',
//             message: 'Please enter the item ID which you would like to stock',
//             name: 'addMore'
//         },
//         {
//             type: 'integer',
//             message: 'Please enter the quantity of items',
//             name: 'quantityAdded'
//         }
//     ]).then(function(answer) {
//         var quantity = answer.quantityAdded;
//         var item = answer.addMore;

//         connection.query('SELECT * FROM products WHERE item_id ' + chosenItem,
//         function(err, res) {
//             console.log('Adding: ' + answer.quantityAdded + ' ' + res[0].product_name );
//         });
//     });
// });
// };
            
//  

// function addProduct() {

// }

// promptManager(); {

// }



// },
// productID: {
//     type: 'input',
//     name: 'productID',
//     message: 'Please enter the product ID of the item you want to stock: ',
// },
// productName: {

// }

