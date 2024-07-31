import express from "express"
import users from './models/schema';
import bodyParser from "express";
import { UserRoutes } from "routes"

const app = express()
app.use(express.json())
app.use(bodyParser())

const port = process.env.PORT || 5000


app.use('/users', UserRoutes); 

app.get('/', (_, res) => res.send('Welcome to TypeScript Server'))

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


