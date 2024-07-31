import express from "express"
import users from './models/schema';
import { User } from "./models/schema"
import { getAllUsers } from "controllers/users";
import bodyParser from "express";
import { UserRoutes } from "routes"

const app = express()
app.use(express.json())
app.use(bodyParser())

const port = process.env.PORT || 5000



// Use the user routes
app.use('/users', UserRoutes); // Prefix routes with /api or any other base path

app.get('/', (_, res) => res.send('Welcome to TypeScript Server'))

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// app.use('/users', UserRoutes)




// app.listen(port, () => {
//     console.log(`Server started succesfully on port: ${port}`)
// })