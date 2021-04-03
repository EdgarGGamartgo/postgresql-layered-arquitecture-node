import { app } from './app'
import { db, seeds } from './../src/data-access/db-scripts'

const start = async() => {
    
    try {
        await db.authenticate();
        await db.sync({ force: true, alter: false });
        await db.query(seeds);
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!')
    })
}

start()