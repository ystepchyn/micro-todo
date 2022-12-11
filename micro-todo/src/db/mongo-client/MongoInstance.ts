import mongoose from "mongoose";
import { ToDoModel } from "../../models/mongo/Todo";
import { ToDo, Author, dbInstanceStrategy} from '../../types'


export class MongoInstance implements dbInstanceStrategy {
	private databaseName: string;
	private model!: mongoose.Model<any>;

	constructor() {
		this.databaseName = process.env.MONGO_DB_NAME as string;
		this.mongoTest();
	}

	async getAllRecords() {
		return await ToDoModel.find();
	}

	async getRecord(id: string) {
		return await ToDoModel.find({ id: id }).exec();
	}

	async addRecord(r: ToDo) {
		return await new ToDoModel(r).save();
	}

/* 	async updateRecord(r) {
	}
 */
	async findRecord(id: string) {
		return await this.model.findById(id).exec();
	}

	async mongoTest() {
		try {
			await mongoose.connect(process.env.MONGO_DB as string);
			//await mongoose.connect('mongodb://localhost:27017/test');
		} catch (error) {
		}
	}
}