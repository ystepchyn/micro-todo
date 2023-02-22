import { Request, Response } from 'express';


export class MicroTodoApi {

    static model: any;

    static init(model: any) {
        MicroTodoApi.model = model;
    }

    static async getAllRecords(req: Request, res: Response) {
        res.json({ "todo_tasks": await MicroTodoApi.model.getAllRecords() });
    }

    static async addRecord(req: Request, res: Response) {
        try {
            res.status(200).json(await MicroTodoApi.model.addRecord(req.body));
        } catch (error) {
            res.status(400).json({ "error": `${error}` });
        }
    }

    static async getRecord(req: Request, res: Response) {
        try {
            res.json(await MicroTodoApi.model.getRecord(req.params.id));
        } catch (error) {
            res.status(400).json({ "error": `${error}` });
        }
    }

    static async updateRecord(req: Request, res: Response) {
        try {
            res.json(await MicroTodoApi.model.updateRecord(req.params.id, req.body));
        } catch (error) {
            res.status(400).json({ "error": `${error}` });
        }
    }

    static async deleteRecord(req: Request, res: Response) {
        try {
            res.json(await MicroTodoApi.model.deleteRecord(req.params.id));
        } catch (error) {
            res.status(400).json({ "error": `${error}` });
        }
    }
}