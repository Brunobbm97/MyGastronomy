import express from 'express';
import cors from 'cors';
import { Mongo } from './database/mongo.js';
import { config } from 'dotenv';
import authRouter from './auth/auth.js';
import usersRouter from './routes/users.js';
import platesRouter from './routes/plates.js';
import ordersRouter from './routes/orders.js';

config()

async function main() {
    const hostname = 'localhost'
    const port = 3000

    const app = express();

    const mongoConnection = await Mongo.connect({
        mongoConnectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    })

    console.log(mongoConnection)


    app.use(express.json()) // arruma a resposta do servidor para json
    app.use(cors()) // permite que o front-end acesse o back-end

    app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: 200,
            body: 'Welcome to MyGastronomy!'
        })
    })

    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)

    app.listen(port, () => {
        console.log(`Server is running at http://${hostname}:${port}`)
    })

}

main();