/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import { json } from "stream/consumers";
import { getAllProducts, getProduct } from "./../../utils/product_controller";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store";
import { useEffect } from "react";
import { loadProducts } from "../../slices/product_slice";

export default function Prducts() {
  const products = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch()

  useEffect(() => {
    getProduct();
  },)

  async function getProduct() {
    const response = await fetch("/api/products");
    const products = await response.json()

    dispatch(loadProducts(products))
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Produits</h1>
        </div>
        <div className="sm:flex-auto ">
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Rechercher par code-bar"
              className="block w-[500px] rounded-md border-gray-300 pr-12 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/products/new">
            <a
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Ajouter produit
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-blue-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      code bar
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6"
                    >
                      Nom d origine
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      model
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      quantity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100"
                    >
                      date
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="text-gray-100">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-600 sm:pl-6">
                        {product.code_bar}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {product.origin_name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {product.model}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                        {product.date}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/products/${product._id}`}>
                          <a
                            href=""
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            voir
                            <span className="sr-only">
                              , {product.code_bar}
                            </span>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const prods = await getAllProducts();
//   const products = JSON.parse(JSON.stringify(prods));

//   return {
//     props: {
//       products,
//     },
//   };
// };
