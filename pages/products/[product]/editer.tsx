import { useRouter } from "next/router";
import { useState } from "react";
import { getProduct } from "../../../utils/product_controller";

export default function Example({ product }) {
  const [form, setForm] = useState({ ...product });
  const updateProd = async () => {
    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <form className=" px-8 space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 className="text-3xl font-medium leading-6 text-gray-900">
              Editer produit
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
                  placeholder="Code bar"
                  autoComplete="given-name"
                  disabled
                  value={form.code_bar}
                  className="block w-full max-w-lg rounded-md border-orange-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
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
                  value={form.local_name}
                  onChange={(e) =>
                    setForm({ ...form, local_name: e.target.value })
                  }
                  id="local_name"
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
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-md border border-gray-900 bg-black py-2 px-12 text-sm font-medium text-gray-50 shadow-sm hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={updateProd}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-12 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  );
}

export const getServerSideProps = async (context) => {
  const p = await getProduct(context.query.product);
  const product = JSON.parse(JSON.stringify(p));

  return {
    props: {
      product,
    },
  };
};
