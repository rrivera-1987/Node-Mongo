const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');

        collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
            (err, result) => {
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);

                collection.find().toArray((err, docs) => {
                    assert.strictEqual(err, null);
                    console.log('Found Documents:', docs);

                    client.close();
                });
            });
    });
});

/* The assert function allows us to perform various checks and values.
assert.strictEqual(err, null) = the first argument is the actual value that we're checking and the second argument,
is the expected value that we're checking against to see if the first argument strictly equals the second. If the values match,
we just continue on. If the actual and expected argument do not match, than the assert will fail.
*/