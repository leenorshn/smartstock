import dbConnection from "../../../utils/mongoConnexion";
import {
  createProduct,
  getAllProducts,
} from "../../../utils/product_controller";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const product = await createProduct(req.body);
    console.log(product);
    if (product.error == 400) {
      return res.status(400).json(product.message);
    }

    return res.status(201).json({ product });
  } else {
    const products = await getAllProducts();
    return res.status(200).json(products);
  }
}
