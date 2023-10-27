const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" },
            'campsites', result => {
                console.log('Insert Document:', result.ops);

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents: ', docs);

                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                        { description: "Updated Test Description" }, 'campsites',
                        result => {
                            console.log('Updated Dodcument Count: ', result.result.nModified);

                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents:', docs);


                                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                    'campsites', result => {
                                        console.log('Deleted Document Count: ', result.deletedCount);

                                        client.close();
                                    }
                                );
                            });
                        }
                    );
                });
            });
    });
});

/* The assert function allows us to perform various checks and values.
assert.strictEqual(err, null) = the first argument is the actual value that we're checking and the second argument,
is the expected value that we're checking against to see if the first argument strictly equals the second. If the values match,
we just continue on. If the actual and expected argument do not match, than the assert will fail.
*/