/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux"


export default function DeleteOperationConfirm({ open, setOpen, id }) {
  const route = useRouter();
  const dispatch = useDispatch()

  const deleteProd = async (event) => {
    event.preventDefault();
    await fetch(`/api/operations/ops/${id}`, { method: "DELETE" })
      .then((data) => {
        //console.log(data);

        setOpen(false);
        route.reload()
      })
      .catch((err) => alert(err));
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
                <h2 className="text-xl font-semibold text-red-600">
                  Demande de confirmation
                </h2>
              </div>
              <div>
                <p className="text-gray-900 text-lg">
                  Voulez-vous effacer cette operation{" "}
                  <span className="font-bold text-black">{id}</span> ??
                </p>
              </div>

              <div className=" py-4 flex space-x-4 mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white  focus:outline-none  sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none  sm:text-sm"
                  onClick={(e) => deleteProd(e)}
                >
                  Effacer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
