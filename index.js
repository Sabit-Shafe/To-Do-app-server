const express = require('express')
const cors = require('cors')
const app = express()

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://dbuser1:cX1tMoPpKq0czA7i@cluster0.om8d3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
      await client.connect();
      const TaskCollection = client.db('Task').collection('Task')
  
      app.get('/task', async (req, res) => {
        const query = {};
        const cursor = TaskCollection.find(query);
        const Task = await cursor.toArray();
        res.send(Task);
      });
  
      app.post('/addtask', async (req, res) => {
        const newTask = req.body;
        const result = await TaskCollection.insertOne(newTask);
        res.send(result);
      });
  
      app.delete('/task/:id', async (req, res) => {
        const result = await TaskCollection.deleteOne(
          { _id: ObjectId(req.params.id) },
        );
        res.send(result);
      });
  
    }
    finally {
  
    }
  }
  run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!cccc')
})

app.listen(port, () => {
  console.log('port', port)
})