import { deleteOperation } from "../../../../utils/operation_controller";

export default async function handler(req, res) {
  //await //dbConnection();
  if (req.method == "DELETE") {
    console.log(req.query);
    const ops = await deleteOperation(req.query.id);

    return res.status(204).json(ops);
  }
}
