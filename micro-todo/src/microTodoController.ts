import express from 'express';

export class MicroTodoContrller {
    constructor() {
        const app = express();
        app.use(express.json());
    }

    init() {
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
    }
}