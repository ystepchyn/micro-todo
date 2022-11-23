import express, { Express, Request, Response } from 'express';
import Database from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = new Database();

app.use(express.json());

app.get('/', (req, res) => {
  // curl -X POST 'http://localhost:8000
  res.json({ "todo_tasks": db.getValues() });
});

app.route('/todo/:id')
  .get((req, res) => {
    // curl -X POST 'http://localhost:8000/todo/2'
    res.json(db.getRecord(req.params.id));
  })

  .post((req, res) => {
    // curl -X POST 'http://localhost:8000/todo/2' -H "Content-Type: application/json" -d '{"task": "cleanup the room"}' 
    let isAdded = db.addRecord({ id: req.params.id, task: req.body.task });
    if (!isAdded) {
      return res.status(400).json({ "error": `Record ${req.params.id} already exists!` });
    }
    res.send(200);
  })

  .put((req, res) => {
    // curl -X PUT 'http://localhost:8000/todo/1' -H "Content-Type: application/json" -d '{"task": "buy milk"}' 
    let updated = db.updateRecord({ id: req.params.id, task: req.body.task });
    res.json(updated);
  })

  .delete((req, res) => {
    // curl -X DELETE 'http://localhost:8000/todo/1'
    db.deleteRecord(req.params.id);
    res.send(200);
  })

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
