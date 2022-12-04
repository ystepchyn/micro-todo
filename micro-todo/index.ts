import express, { Express, Request, Response } from 'express';
import { DBProvider, MapInstance } from './src/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = new DBProvider(new MapInstance());

app.use(express.json());

app.get('/', (req, res) => {
    // curl -X POST 'http://localhost:8000
    res.json({ "todo_tasks": db.getAllRecords() });
});

app.post('/todo/', (req, res) => {
    // curl -X POST 'http://localhost:8000/todo' -H "Content-Type: application/json" -d '{"task": "cleanup the room"}'
    try {
        res.status(200).json(db.addRecord({ ...req.body }));
    } catch (error) {
        res.status(400).json({ "error": `${error}` });
    }
});

app.route('/todo/:id')
    .get((req, res) => {
        // curl 'http://localhost:8000/todo/2'
        res.json(db.getRecord(req.params.id));
    })

    .put((req, res) => {
        // curl -X PUT 'http://localhost:8000/todo/1' -H "Content-Type: application/json" -d '{"task": "buy milk"}' 
        try {
            res.status(200).json(db.updateRecord({ ...req.body, id: req.params.id }));
        } catch (error) {
            res.status(400).json({ "error": `${error}` });
        }
    })

    .delete((req, res) => {
        // curl -X DELETE 'http://localhost:8000/todo/1'
        try {
            db.deleteRecord(req.params.id);
        } catch (error) {
            return res.status(400).json({ "error": `Record ${req.params.id} doesn't exist!` });
        }
        res.status(200);
    })

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
