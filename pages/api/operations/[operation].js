import dbConnection from "../../../utils/mongoConnexion";
import {
  addOperation,
  getAllOperation,
} from "../../../utils/operation_controller";

export default async function handler(req, res) {
  await dbConnection();
  if (req.method == "POST") {
    try {
      //console.log(req.body);
      const operation = await addOperation(req.body);
      return res.status(201).json(operation);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  if (req.method == "GET") {
    // console.log(req.query.operation);
    try {
      const operations = await getAllOperation(req.query.operation);
      return res.status(200).json(operations);
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
