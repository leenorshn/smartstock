import dbConnection from "../../../utils/mongoConnexion";
import {
  addOperation,
  getAllOperation,
} from "../../../utils/operation_controller";

export default async function handler(req, res) {
  await dbConnection();
  if (req.method == "POST") {
    console.log(req.body);
    const operation = await addOperation(req.body);

    return res.status(201).json(operation);
  }
  if (req.method == "GET") {
    console.log(req.query.operation);
    const operations = await getAllOperation(req.query.operation);
    return res.status(200).json(operations);
  }
}
