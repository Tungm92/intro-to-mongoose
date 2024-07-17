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
    console.log('')
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
    console.log(`id: ${customer._id} -- Name: ${customer.name} | Age: ${customer.age}`);
};

// READ customer index
const getAllCustomers = async () => {
    
    // call a const that looks up the customers
    const customers = await Customer.find();
    
    // message the choice
    console.log('')
    console.log('You have selected 2, view all customers.');
    console.log('')

    // list the objects by id
    console.log('Below is a list of our customers:');
    console.log('')
    customers.forEach(person => {
        console.log(`id: ${person._id} -- Name: ${person.name} | Age: ${person.age}`)
    });
};

// UPDATE customer profile
const updateCustomer = async () => {

    // call a const that looks up the customers
    const customers = await Customer.find();
    
    // message the choice
    console.log('')
    console.log('You have selected 3, update a customer profile.');
    console.log('')

    // list the objects by id
    console.log('Below is a list of our customers:');
    
    customers.forEach(person => {
        console.log(`id: ${person._id} -- Name: ${person.name} | Age:${person.age}`)
    });
    console.log('')
    // prompt the user to begin changes
    const id = prompt('Copy and paste the id of the customer you would like to update here: ');
    const customer = await Customer.findById(id);
    let temp = customer
    customer.name = prompt(`What is ${temp.name}'s new name? `)
    customer.age = prompt(`${temp.name}'s age is currently ${temp.age}. What is ${temp.name}'s new age? `)

    // invoke a save to update the database
    await customer.save();
};

// DELETE customer profile
const deleteCustomer = async () => {
    
    // call a const that looks up the customers
    const customers = await Customer.find();
    
    // message the choice
    console.log('')
    console.log('You have selected 2, view all customers.');
    console.log('')

    // list the objects by id
    console.log('Below is a list of our customers:');
    console.log('')
    customers.forEach(person => {
        console.log(`id: ${person._id} -- Name: ${person.name} | Age: ${person.age}`)
    });
    console.log('')

    // begin delete process
    const id = prompt('Copy and paste the id of the customer you would like to delete here: ');
    const customer = await Customer.findById(id);
    
    // create temp var to use for messaging
    let temp = customer
    const confirmDelete = async () => {
        if (prompt(`Are you sure you want to delete ${customer.name}'s profile? (y/n) `) == 'y' || 'Y') {
            await customer.deleteOne();
            console.log('')
            console.log(`id: ${temp._id} -- Name: ${temp.name} | Age: ${temp.age} has been removed.`)
            console.log('Please wait for deletions to be reflected in the system.')
        } else {
            console.log(`id: ${temp._id} -- Name: ${temp.name} | Age: ${temp.age} has been kept.`)
        }
    };
    confirmDelete();
};

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
            console.log('')
            console.log('Exiting...')
            
            // exit 
            return;
        } else {
            
            // message invalid response
            console.log('')
            console.log(`Invalid response. Please try again by selecting a number from 1-5.`)
        };
    };
};