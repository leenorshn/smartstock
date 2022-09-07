/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { addOperation } from "../slices/operation_slice";

export default function NewTrans({ open, setOpen, id }) {
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("ENTREE");
  const dispatch = useDispatch()

  const onSelected = (event) => {
    event.preventDefault();
    setType(event.target.value);
  };

  const addOp = (e) => {
    e.preventDefault();
    fetch(`/api/operations/${id}`, {
      method: "POST",
      body: JSON.stringify({ type, amount: quantity, product_id: id }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((d) => {
      return d.json()
    })
      .then((ops) => {
        dispatch(addOperation(ops))
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white w-[600px] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:max-w-4xl sm:p-6">
              <div className="py-4">
                <h2 className="text-xl font-semibold text-indigo-600">
                  Nouvelle operation
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Type
                  </label>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Notification method</legend>
                    <div className="space-x-4 flex items-center">
                      <div className="flex items-center">
                        <input
                          id="entree"
                          name="notification-method"
                          type="radio"
                          value="ENTREE"
                          checked={type === "ENTREE"}
                          onChange={(e) => onSelected(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="entree"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {"Entree"}
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="sortie"
                          name="notification-method"
                          type="radio"
                          value="SORTIE"
                          checked={type === "SORTIE"}
                          onChange={(e) => onSelected(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="sortie"
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {"Sortie"}
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantité
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Ex: 300"
                    />
                  </div>
                </div>
              </div>

              <div className=" py-4 flex space-x-4 mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none  focus:ring-offset-2 focus:ring-0 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={(e) => addOp(e)}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
