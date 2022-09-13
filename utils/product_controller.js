import Operation from "../models/operation";
import Product from "../models/product";
import dbConnection from "./mongoConnexion";

dbConnection();
// get all products from mongodb
export const getAllProducts = async () => {
  // await dbConnection();
  return await Product.find({}).sort({ date: "descending" });
};

// get one product
export const getProduct = async (id) => {
  return await Product.findById(id);
};

//get one product by code_bar
export const getProductByCodeBar = async (codeBar) => {
  //await dbConnection();
  return await Product.findOne({ code_bar: codeBar });
};

// update product
export const updateProduct = async (id, data) => {
  // await dbConnection();
  return await Product.findByIdAndUpdate(id, { ...data }, { new: true });
};

// delete product and all relative operations

export const deleteProduct = async (id) => {
  try {
    const product = await Product.findById(id);
    await Operation.deleteMany({ product_id: product.product_id });
    const prod = await Product.findOneAndDelete({ _id: id });
    return prod;
  } catch (err) {
    return err;
  }
};

// create product
export const createProduct = async (newProd) => {
  //await dbConnection();
  const prod = await Product.findOne({ code_bar: newProd.code_bar });

  if (prod) {
    return {
      error: 400,
      message: "Ce produit existe deja",
    };
  } else {
    const product = await Product.create(newProd);
    await Operation.create({
      product_id: product._id,
      type: "ENTREE",
      amount: newProd.quantity,
    });

    return product;
  }
};
