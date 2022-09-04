import dbConnection from "../../../utils/mongoConnexion";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../utils/product_controller";

export default async function handler(req, res) {
  //await //dbConnection();
  if (req.method == "GET") {
    const product = await getProduct(req.query.product);

    return res.status(201).json(product);
  }
  if (req.method == "PUT") {
    const product = await updateProduct(req.query.product, req.body);
    return res.status(200).json(product);
  }
  if (req.method == "DELETE") {
    console.log(req.query.product);
    await deleteProduct(req.query.product);
    return res.status(204).json({ result: "success" });
  }
}
