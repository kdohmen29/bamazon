var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected kyle");
});
connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // console.log(results);
    
    newresults = results.map(eachItem =>
        `${eachItem.product_name}, id:${eachItem.id}, department:${eachItem.department_name}, quantity:${eachItem.quantity}, price:$${eachItem.price}`
    )

    inquirer.prompt([{
            name: 'q1',
            message: "What would you like to buy?",
            type: 'list',
            choices: newresults
        },
        {
            name: 'q2',
            type: 'number',
            message: 'how many would you like to buy?'
        }
    ]).then(function (answers) {
        var splitup = answers.q1.split(',')
        var id = splitup[1].slice(4, 5)
        var quantity = splitup[3].slice(10, 14)
        var price = splitup[4].slice(8, 13)
        var productName = splitup[0]
        var totalCharge = price * answers.q2
        // console.log(id)
        // console.log(quantity)
        // console.log(price)
        // console.log(totalCharge)

        if (quantity >= answers.q2) {
            console.log('We have plenty in stock');
            // calculate the new quanity after the amount customer wants is deducted
            quantity -= answers.q2
            // your going to make a query to the DB and update the products quantity to new quantity
            connection.query(`UPDATE products SET quantity = ${quantity}
            WHERE id = ${id};`)
            // .then() // after then you will tell the customer that the purchase was succesful and how much you charged there card
            console.log(`You purchase was successful! Your total was $${totalCharge} and we now have ${quantity} ${productName}'s in stock`);
            

            connection.end()
        } else {
            console.log(`Sorry, we have ${quantity} in stock please change your purchase`);
            connection.end()

        }

    })
})