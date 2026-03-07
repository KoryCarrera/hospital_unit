//Import const with express configuration and prisma class
import app from './app.js'
import { prisma } from './config/prisma.js'

//We captura port on .env
const PORT = process.env.PORT;

try{

    //We initialize the connection to the db
    await prisma.$connect();

    app.listen(PORT, () => {
        console.log(`Listen in the port: http://localhost:${PORT}`)
    })

} catch (err) {

    //Show errors on the console
    console.error(err);
    process.exit(1);
}