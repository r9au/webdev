const { Pool, Client } = require('pg');

const connectionString = 'postgresql://postgres:a2saas177july@localhost:5432/postgres';

// Creating Client
const client = new Client({
    connectionString: connectionString
});

////////////////////////////////////////// PSQL Query//////////////////////////////

// Function to perform queries
const performQueries = async () => {
    try {
        await client.connect();
        console.log("Connected to the database.");

        // Select query
        const selectResult = await client.query('SELECT * FROM public.student');
        console.log("Select query result:", selectResult.rows);

        // Another select query
        const anotherSelectResult = await client.query('SELECT * FROM student');
        console.log("Another select query result:", anotherSelectResult.rows);

        // Insertion query
        // Make sure the column names in the insertion query match exactly with the column names in the table
        const insertQuery = "INSERT INTO student (name, email) VALUES ('RJJ', 'rj@gmail.com')";
        const insertResult = await client.query(insertQuery);
        console.log("Insertion query result:", insertResult);

    } catch (err) {
        console.error("Error executing query:", err);
    } finally {
        await client.end();
        console.log("Client disconnected.");
    }
};

performQueries();




// // Step 1: Make sure your postgres database is on
// // Install pg npm i pg

// const { Pool, Client } = require('pg');

// const connectionString = 'postgresql://postgres:a2saas177july@localhost:5432/postgres';

// // Creating Client
// const client = new Client({
//     connectionString: connectionString
// });

// ////////////////////////////////////////// PSQL Query//////////////////////////////

// // Function to perform queries
// const performQueries = async () => {
//     try {
//         await client.connect();
//         console.log("Connected to the database.");

//         // Select query
//         const selectResult = await client.query('SELECT * FROM public.student');
//         console.log("Select query result:", selectResult.rows);

//         // Another select query
//         const anotherSelectResult = await client.query('SELECT * FROM student');
//         console.log("Another select query result:", anotherSelectResult.rows);

//         // Insertion query
//         const insertQuery = "INSERT INTO student (name, Email, ID) VALUES ('RJ', 'rj@gmail.com', 7)";
//         const insertResult = await client.query(insertQuery);
//         console.log("Insertion query result:", insertResult);



//     } catch (err) {
//         console.error("Error executing query:", err);
//     } finally {
//         await client.end();
//         console.log("Client disconnected.");
//     }
// };

// performQueries();
