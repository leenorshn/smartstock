import Operation from "../models/operation";
import Product from "../models/product";
import dbConnection from "./mongoConnexion";

dbConnection();
export const getAllOperation = async (product) => {
  //await dbConnection();
  //console.log(product);
  return await Operation.find({ product_id: product })
    .populate("product_id")
    .sort({ date: "descending" });
};
export const deleteOperation = async (id) => {
  const isDeleted = await Operation.findByIdAndRemove(id);
  if (!isDeleted) return;
  return {
    success: true,
  };
};

export const addOperation = async (data) => {
  console.log(data);
  //await dbConnection();
  const product = await Product.findById(data.product_id);
  if (!product) {
    return new Error("Veuillez choisir un produit");
  }
  if (data.type == "ENTREE") {
    await Product.findByIdAndUpdate(product._id, {
      quantity: product.quantity + data.amount,
    });
    return await Operation.create({ ...data, date: Date.now() });
  } else {
    if (product.quantity < data.amount) {
      return new Error("Erreur quantite insuffisante");
    } else {
      await Product.findByIdAndUpdate(product._id, {
        quantity: product.quantity - data.amount,
      });
      return await Operation.create(data);
    }
  }
};
