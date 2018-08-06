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
    // console.log('connected as id: ' + connection.threadId + '\n');
    // display list of products
    displayProducts(); 
});

function displayProducts () {
    // var display = new productTable();
   connection.query('SELECT * FROM products', 
   function(err, res) {
    // if (err) throw err;
//    }
    // Log all products
    console.log(res);
    newPurchase();
    // connection.end();
   });
};


function newPurchase()   {
//   connection.query('SELECT * FROM products', function(err, res) {
//  if (err) throw err;
   
    inquirer
    .prompt([
        {
        name: 'id',
        type: 'input',
        message: 'Please enter the item ID which you would like to purchase'
    },
    {    name: "quantity",
         type: "input",
         message: 'Enter the quantity you want to purchase'
       },


        // validate: function(value) {
        //     if (isNaN(value) === false) {
        //         // if (err) throw err;
        //         return true;
        //         }   
        //         return false;
        //     }
      
]).then(function(answer) {

        // console.log('You chose: ' + answer.quantity + answer.id);
        
var quantityDesired = answer.quantity;
var chosenItem = answer.id;

connection.query('SELECT * FROM products WHERE item_id = ' +  chosenItem,


    function(err, res) {
        console.log('You chose: ' + answer.quantity +  '  ' + res[0].product_name);


    if (res[0].stock_quantity >= quantityDesired) {


         console.log('congrats. Your item is in stock');
         
        var totalCost = res[0].price * quantityDesired;
console.log('your total cost is ' + totalCost );
connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityDesired + ' WHERE item_id = ' + chosenItem);
    

        } else {
           console.log('Our apologies. We are out of stock');
        //    displayProducts();
        }

    // [
    //     item_id: answer.id,
    //     answer.quantity,
    // ],
//     function(err, res) {
//         // if (err) throw err;
//         console.log('\n You chose ' + quantity + ' ' + res[0].product_name + ' ' +  ' each');
        
        // + answer.quantity + ' ' + res[0].product_name + ' ' +  ' at $' + res[0].price + ' each');

   


        //    if (answer.length === 0) {
    //        console.log('in')
    //    }
    //     var chosenItem = answer.id;
    //     var quantityDesired = answer.quantity;
    //     checkQuantity();
            // chosenItem, quantityDesired);
        // console.log('\n You chose ' + answer.quantity + ' ' + res[0].product_name + ' ' +  ' at $' + res[0].price + ' each');
    });

// });
});
};

// function updateInventory() {

//     var updatedStock;
//     updatedStock = stock_quantity - quantityDesired;
//     var totalCost;

    
    
    // [
        // { stock_quantity: updatedStock 
        // }, {
        //     item_id: chosenItem
        //       }
        //           ],
//             function(err, res) {
//                       if (error) throw err;
//                       console.log('order placed');
//                });

// };
// }; // end inquire

//  function checkQuantity() {
//     //  id, quantity

// connection.query('SELECT stock_quantity, price, product_name FROM products WHERE ?', [{item_id: chosenItem}], 

// //   (query,
// // { item_id: chosenItem
// //             // stock_quantity: answer.quantity
// //         },
//  function(err, res) {
//     if (err) throw err;

//       if (res.length === 0) {
//           console.log('invalid');
//           displayProducts();
//       } else {
//           var res = res[0];

      

//  if (res[0].stock_quantity >= quantityDesired) {
//    console.log('congrats');
// //    var total = res[0].price * quantityDesired;

//  } else {
//      console.log('insufficient');
//  };
//  }
// );

// };
// // //     console.log(total);
// //  } else {
// //      console.log('sorry');
//  }
// });
// }

// //  };
// // };

// //                     // if (res.length === 0) {
                       
// //                 });
// //             };

// //         };
//         //         console.log('error: invalid item');
//         //         displayProducts();
//         //     } else {
//         //         var productData = data[0];
//         //         console.log('new inv');

            
//         //             // if (err) throw err;
//         //     // console.log('invalid');
//         //        }
//                 // };
//         // quantityCheck();
//                 //  if (res[0].stock_quantity >= answer.quantity) {

//                 //  var itemQuantity = res[0].stock_quantity - answer.quantity;
               
//                 //             connection.query('UPDATE products SET ? WHERE ?',
//                 //                     [
//                 //                         {
//                 //                         stock_quantity: itemQuantity
//                 //                         },
                //                         {
                //                         item_id: answer.id
                //                         }
                //                     ],
                //                     function(err, res) {
                //                         // if (error) throw err;
                //                         // console.log('order placed');
                //                     });
                //                     console.log('success');
                //                     displayProducts();
                //             } else {
                //                 console.log('insuff');
                //             }
                       
                 
                
        //     });
                        
        // });
    
                   
                
                        // } else {
                        //     console.log('insuff');
                        // }
        

//                 });
            
//             });
//   });
        // };
   
   
           
    //    });
            // console.log('\n You chose ' + answer.quantity + ' ' + res[0].product_name + ' ' +  ' at $' + res[0].price + ' each');

            // if (err) throw err;
        
       

        

        // var chosenItem;
        // = answer.item_id;
        // var userUnits = answer.stock_quantity; 

        
        
      
    // });



    //    for (var i = 0; i < res.length; i++) {
    //         if (res[i].item_id === answer.id) {
    //             chosenItem = res[i];
    //         }
    //     }
    //   var quantityAvailable = answer.stock_quantity;
//     function quantityCheck() {

    

// connection.query('SELECT * FROM products WHERE ?', {item_id: chosenItem},
// // )
//         {item_id: chosenItem},

//         function(err, res) {

//             console.log('\n You chose ' + answer.quantity + ' ' + res[0].product_name + ' ' +  ' at $' + res[0].price + ' each');
            
            
//             if (res[0].stock_quantity >= answer.quantity) {

//                 var productQuantity = res[0].stock_quantity - answer.quantity;
            

//              console.log('congrats');
    
//             } else {
//                 console.log('insuff');
//             }
            
//         })
//     });
// };
            
            // if (err) throw err;

        

            // if (res[0].stock_quantity < userUnits) {
            //     console.log('error: invalid item');
            //     displayProducts();
            // // } else {
            // //     var productData = data[0];
            
            // //     if (res[0].stock_quantity >= answer.quantity) {
            // //         console.log('congrats');

            // //         //  var itemQuantity = res[0].stock_quantity - answer.quantity;
            // //          connection.query('UPDATE products SET ? WHERE ?',
            // //         [
            // //             {
            // //             stock_quantity: itemQuantity
            //             },
            //             {
            //             item_id: answer.id
            //             }
            //         ],
            //         function(err, res) {
            //             if (error) throw err;
            //             console.log('order placed');
            //             });
                    
            //     } else {
            //         console.log('/n insufficient!\n');
            //     }
   
                
            // }
            // for (var i = 0; i < res.length; i++) {
            //     
     // if (res[i].stock_quantity >= answer.quantity) {
            //          var itemQuantity = res[0].stock_quantity - answer.quantity;
            //          connection.query('UPDATE products SET ? WHERE ?',
            //         [
            //             {
            //             stock_quantity: itemQuantity
            //             },
            //             {
            //             item_id: answer.id
            //             }
            //         ],
//                     function(err, res) {
//                         if (error) throw err;
//                         console.log('order placed');
//                         });
                    
//                 } else {
//                     console.log('/n insufficient!\n');
//                 }
//         });
//     });
// };
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
