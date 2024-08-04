import express from "express"
import bodyParser from "express";
import { PostRoutes, UserRoutes } from "routes"

const app = express()
app.use(express.json())
app.use(bodyParser())

const port = process.env.PORT || 5000


app.use(('/users'), UserRoutes);
app.use(('/posts'), PostRoutes);

app.get('/', (_, res) => res.send('Welcome to TypeScript Server'))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


