const { application } = require('express');
const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// safe-journey
// t6vSCvoOTjYASqip

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.okobv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        // console.log('connected to database')
        const database = client.db('safe journey')
        const servicesCollection = database.collection('services');

        //POST API 
        app.post('/services', async (req) => {
            const service = {

                "name": "Hooman Azmi",
                "para": "Hooman was born and raised in Indonesia, North Way Indonesia He graduated from the University of Indonesia, where he completed is bachelor’s degree. His admission to the State Bar of London took place on the 10st of April, 1983.",
                "email": " hooman@hospitalplus.com",
                "phone": "+1 301-230-8925",
                "image": "https://i.ibb.co/s1QY4nS/Cheerful-self-assured-prosperous-male-enterpreneur-has-pleased-expression-dressed-formally-happy-to.jpg"

            }
            const result = await servicesCollection.insertOne(service);
            console.log(result);
        })
    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running Safe Journey')
})

app.listen(port, () => {
    console.log('Running Journey on port', port)
})