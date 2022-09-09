import { deleteOperation } from "../../../../utils/operation_controller";

export default async function handler(req, res) {
  //await //dbConnection();
  if (req.method == "DELETE") {
    try {
      //console.log(req.query);
      const ops = await deleteOperation(req.query.id);

      return res.status(204).json(ops);
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
