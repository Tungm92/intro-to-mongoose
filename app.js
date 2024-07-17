// use dotenv, mongoose, promptSync()
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();


const connect = async () => {
    
    // set up connection to Atlas in .env
    await mongoose.connect(process.env.MONGODB_URI);

    // await test();
    await queries();
    await mongoose.disconnect();

    // end process
    process.exit();
};

connect();
/*-------------------------------- Query Functions --------------------------------*/

const Customer = require('./models/customer.js');

// WHAT DO I NOTICE?
// using prompt('some string') prompts the user to respond.
// by attaching it to a const, the response is returned to the var

// WHAT IS THE ASSIGNMENT ASKING FOR?
// I am supposed to welcome the user
// Ask what they would CRUD they are doing or else quit
// They will then ask to UPDATE/PUT
// Return to action menu
// READ/GET updates to verify PUT was completed
// Return to action menu
// Select quit

// The assignment does not CREATE/DELETE anything, but the functionality
// should be possible

// WHAT WILL YOU DO?
// Create welcome prompt: "Welcome, what is your name?"
// Afterward the prompt will read, "What would you like to do, ${name}?"
// Then the menu is listed
// I will create the CRUD actions after finishing the prompt

const username = prompt('Welcome to the CRM, what is your name? ');
// const actionMenu = prompt(`What would you like to do today, ${username}?`);

// CREATE a customer
const createCustomer = async () => {

    console.log('You have selected 1, create a customer profile.')
    const Name = prompt("What is the customer's name? ")
    const Age = parseInt(prompt("What is the customer's age? "))
    
    // allow for user input of data
    const customerData = {

        // the prompts should capture the value's provided by the user
        name: Name,
        age: Age,
    };

    // creating the profile in the database
    const customer = await Customer.create(customerData);

    // message the result
    console.log('A new customer profile has been created.')
    console.log("New customer: ", customer);
};

// READ customer index
const getAllCustomers = async () => {
    
    // call a const that looks up the customers
    const customers = await Customer.find();

    // HOW DO YOU WANT IT TO LOOK?
    // I want a forEach that console logs each customers id, name, and age
    // that looks similar to the Sample Exchange

    // message the result
    console.log('Below is a list of our customers:', customers);
};

// UPDATE customer profile
const updateCustomer = async () => {

    // call a const that looks up the customers
    const customers = await Customer.find();

    // HOW DO YOU WANT IT TO LOOK?
    // I want it to be an exact replica of READ format
    // with additional prompts for a new name and new age
    // I would like an if() condition that if the response is ''
    // the original data is not changed

    // list the objects by id
    console.log('Below is a list of our customers:', customers);
};

// DELETE customer profile
const deleteCustomer = async () => {
    
    // HOW DO YOU WANT IT TO LOOK?
    // I want it to be an exact replica of the READ format
    // prompt the use to provide the id of the profile being deleted
    // create a temp var that holds that value
    // console.log(`The customer id: ${id} -- Name: ${name}, Age: ${age} has been removed.`)

}


const queries = async () => {
    
    // create loop variable
    let choice
    
    // run loop
    while (choice !== '5') {

        // list out options for the user
        console.log('')
        console.log('1. Create a customer')
        console.log('2. View all customers')
        console.log('3. Update a customer profile')
        console.log('4. Delete a customer profile')
        console.log('5. Quit')
        console.log('')
        
        choice = prompt(`Hello ${username}, what would you like to do? `);

        // create pathways for the prompt: CRUD && exit
        if (choice === '1') {
            
            // run CREATE
            await createCustomer();

            // reset loop variable
            choice = ''
        } else if (choice === '2') {
            
            // run READ
            await getAllCustomers();

            // reset loop variable
            choice = ''
        } else if (choice === '3') {
            
            // run UPDATE
            await updateCustomer();
            
            // reset loop variable
            choice = ''
        } else if (choice === '4') {
            
            // run DELETE
            await deleteCustomer();

            // reset loop variable
            choice = ''
        } else if (choice === '5') {
            
            // messag exit
            console.log('Exiting...')
            
            // exit 
            return;
        } else {
            
            // message invalid response
            console.log(`Invalid response. Please try again by selecting a number from 1-5.`)
        };
    };
};