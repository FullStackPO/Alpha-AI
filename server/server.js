import app from './src/app.js'
import connectToDB from './src/config/database.js'

console.log("SERVER.JS IS RUNNING");

connectToDB()

app.listen(3000, () => {
    console.log("🔥 THIS IS MY SERVER");
})