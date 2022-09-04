import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, loadProducts } from "../../slices/product_slice";

export default function Example() {
  const dispatch = useDispatch()
  const route = useRouter();
  const [form, setForm] = useState({
    code_bar: "",
    origin_name: "",
    local_name: "",
    model: "",
    quantity: 0,
  });

  const addNewProduct = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/products", {
      body: JSON.stringify({ ...form, date: Date.now() }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const product = await response.json();

    dispatch(addProduct(product));
    route.push("/products");
  };
  return (
    <form className=" px-8 space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-3xl font-medium leading-6 text-gray-900">
              Nouveau produit
            </h3>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Code bar
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="code_bar"
                  id="code_bar"
                  value={form.code_bar}
                  onChange={(e) =>
                    setForm({ ...form, code_bar: e.target.value })
                  }
                  placeholder="Code bar"
                  autoComplete="given-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Nom d orinine
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="origin_name"
                  id="origin_name"
                  value={form.origin_name}
                  onChange={(e) =>
                    setForm({ ...form, origin_name: e.target.value })
                  }
                  autoComplete="family-name"
                  placeholder="Nom d origine"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="local_name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Nom local
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="local_name"
                  id="local_name"
                  value={form.local_name}
                  onChange={(e) =>
                    setForm({ ...form, local_name: e.target.value })
                  }
                  placeholder="nom local"
                  autoComplete="family-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Model
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  placeholder="model"
                  autoComplete="postal-code"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                ZIP / Postal code
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: parseFloat(e.target.value) })
                  }
                  placeholder="Quantity"
                  autoComplete="postal-code"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-md border border-gray-900 bg-black py-2 px-12 text-sm font-medium text-gray-100 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={(e) => addNewProduct(e)}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-12 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
}
