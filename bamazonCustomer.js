// set up variables
var mysql = require ('mysql');
var inquirer = require('inquirer');

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
    console.log('connected as id: ' + connection.threadId + '\n');
    // display list of products
    displayProducts(); 

});

function displayProducts () {
   connection.query('SELECT * FROM products', 
   function(err, res) {
    if (err) throw err;
//    }
    // Log all products
    console.log(res);
    productID();
    // connection.end();
   });
};


function productID()   {
    inquirer
    .prompt([
        {
        name: 'id',
        type: 'integer',
        message: 'Please enter the item ID which you would like to purchase'
    },
    {    name: "quantity",
         type: "integer",
         message: 'Enter the quantity you want to purchase',
       }


        // validate: function(value) {
        //     if (isNaN(value) === false) {
        //         // if (err) throw err;
        //         return true;
        //         }   
        //         return false;
        //     }
      
])
    // });
        // validate: validateInput,
        // filter: Number 
 
    .then(function(answer) {

        // var chosenItem;
        // var quantityAvailable = answer.stock_quantity;

        connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?',

        {item_id: answer.id},
        function(err, res) {
            // for (var i = 0; i < res.length; i++) {
                console.log('\n You chose ' + answer.quantity + ' ' + res[0].product_name + ' ' +  'at $' + res[0].price + ' each');
            // };
            if (res[0].stock_quantity >= answer.quantity) {
                     var itemQuantity = res[0].stock_quantity - answer.quantity;
                     connection.query('UPDATE products SET ? WHERE ?',
                    [
                        {
                        stock_quantity: itemQuantity
                        },
                        {
                        item_id: answer.id
                        }
                    ],
                    function(err, res) {
                        if (error) throw err;
                        console.log('order placed');
                        });
                    
                } else {
                    console.log('/n insufficient!\n');
                }
        });
    });
};
            // console.log('\n You chose ' + answer.quantity + '' + res[0].product_name );
        
    //     if (err) throw err;
    //     ;

    //    connection.query(query,
    //          {
    //         item_id: itemChosen},
    //         function(err, res) {
    //     // var chosenItem;
    //     if (err) throw err;

            // for (var i = 0; i < res.length; i++) {
            // if (res[0].stock_quantity >= answer.quantity) {
            //      var itemQuantity = res[0].stock_quantity - answer.quantity;
            //      connection.query('UPDATE products SET ? WHERE ?',
            //     [{
            //         stock_quantity: itemQuantity
            //     }, {
            //         item_id: answer.id
                
            //     }],
            //     function(err, res) {

            //     });
                
            // } else {
            //     console.log('/n insufficient!\n');
            // }
        //     }
        // }
            // console.log('Customer selected: \n item_id = ' + res[i].item_id);
        // };
        // checkQuantity();
//     });
// });
// };
// });

// };
        //     if (err) throw err;
    //         inquirer
    //         .prompt([
    //             {
    //                 name: "quantity",
    //                 type: "input",
    //                 message: 'How many do you need?',
    //             }
    //         ])
            
    //         };
    // // ask how many
    // // quantityPurch();
    //     });
        
    // });

    // };

    // function checkQuantity() {
    //     inquirer
    //         .prompt(
    //         {
    //         name: 'stock_quantity',
    //         type: 'input',
    //         message: 'How many do you need?',
    //            validate: function(value) {
    //         if (isNaN(value) === false) {
    //             // if (err) throw err;
    //             return true;
    //             }   
    //             return false;
    //         }
    // //         // validate: validateInput,
    // //         // filter: Number
    //     })
    // .then(function(answer) {
    //     var query = 'SELECT stock_quantity FROM products WHERE ?'
    //     console.log(answer.stock_quantity);
      
        // connection.query(query, [answer.item_id], function(err, res) {
        //     for (var i = 0; i < res.length; i++) {
        //         console.log()
        //     }
        // })
    // })
    // };
    // console.log('Insert product  ID...\n');

//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].id + )
//         