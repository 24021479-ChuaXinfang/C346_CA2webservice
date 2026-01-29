// include the required packages
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

// database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

//intialize Express app
const app = express();

const cors = require("cors");
const allowedOrigins = [
    "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback) {
// allow requests with no origin (Postman/server-to-server)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: false,
    })
);

// helps app to read JSON
app.use(express.json());

// start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});


// Route: Get all cards
app.get('/alltrips', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM trips');

        const formattedRows = rows.map(trip => ({
            ...trip,
            trip_date: trip.trip_date
                ? trip.trip_date.toISOString().split('T')[0]
                : null
        }));

        res.json(formattedRows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for alltrips' });
    }
});

// Route: Add trip
app.post('/addtrip', async(req, res) => {
    const { mode, distance_km, carbon_kg, trip_date  } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO trips (mode, distance_km, carbon_kg, trip_date) VALUES (?,?,?,?)', [mode, distance_km, carbon_kg, trip_date]);
        res.status(201).json({message: 'Trip added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not add trip'})
    }
})

// Route: Delete A Trip
app.delete('/deletetrip/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'DELETE FROM trips WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json({ message: `Trip ${id} deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting trip' });
    }
});

// Route: Delete all trips
app.delete('/deletealltrips', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'DELETE FROM trips'
        );

        res.json({
            message: 'All trips deleted successfully',
            deletedCount: result.affectedRows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error deleting all trips' });
    }
});


// Route: Update trip
app.put('/updatetrip/:id', async (req, res) => {
    const { id } = req.params;
    const { mode, distance_km,carbon_kg,trip_date} = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'UPDATE trips SET mode = ?, distance_km = ?, carbon_kg = ?, trip_date = ? WHERE id = ?',
            [mode, distance_km, carbon_kg, trip_date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json({ message: `Trip ${id} updated successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating trip' });
    }
});


