const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    const drivers = [
        {
            name: "John Doe",
            vehicleType: "Sedan",
            isAvailable: true,
            rating: 4.8
        },
        {
            name: "Alice Smith",
            vehicleType: "SUV",
            isAvailable: false,
            rating: 4.5
        },
        {
            name: "Bob Johnson",
            vehicleType: "Hatchback",
            isAvailable: true,
            rating: 5.0
        }
    ];


    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const driversCollection = db.collection("drivers");

        for (const driver of drivers) {
            const result = await driversCollection.insertOne(driver);
            console.log(`New driver created with _id: ${result.insertedId}`);
        }

        const updateResult = await db.collection('drivers').updateOne(
            {name: "John Doe"},
            {$inc: {rating: 0.1}}
        );

        console.log(`Driver updated with results: ${updateResult}`);

        const deleteResult = await db.collection(`drivers`).deleteOne({isAvailable: true});
        console.log(`Driver deleted with result: ${deleteResult}`);



    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
