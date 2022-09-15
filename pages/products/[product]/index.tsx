/* This example requires Tailwind CSS v2.0+ */

import moment from "moment"

import { useState } from "react";
import { useRouter } from "next/router";
import {
  PencilIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
//import NewOperation from "../../../components/NewOperation";
import NewTrans from "../../../components/NewOperation";
import Link from "next/link";
import DeleteProductConfirm from "../../../components/DeleteProductConfirme";
import DeleteOperationConfirm from "../../../components/DeleteOperationConfirm";
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [open, setOpen] = useState(false);
  let [openDelete, setOpenDelete] = useState(false);
  const [openDeleteOp, setOpenDeleteOp] = useState(false);
  const route = useRouter();
  const dispatch = useDispatch()



  const fetcher = (...args) => fetch(`/api/operations/${route.query.product}`).then(res => res.json())
  const { error, data } = useSWR(`/api/operations/${route.query.product}`, fetcher)
  if (error) {
    return <>{"Erreur:" + error}</>
  }
  if (!data) {
    return <>chargement</>
  }





  const quantity = (operation) => {
    var t = 0;
    for (var i = 0; i < operation.length; i++) {
      if (operation[i].type == "ENTREE") {
        t = t + operation[i].amount;
      } else {
        t = t - operation[i].amount;
      }
    }

    return t;
  };




  const deleteOp = () => {
    setOpenDeleteOp(true);
  };
  return (
    <>
      <NewTrans open={open} setOpen={setOpen} id={route.query.product} />
      <DeleteProductConfirm
        id={route.query.product}
        open={openDelete}
        setOpen={setOpenDelete}
      />
      {/* <DeleteOperationConfirm id={operation._id} open={} setOpen={} /> */}

      <div className="px-4 sm:px-6 lg:px-8 pt-5">
        <div className="sm:flex sm:items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Produit</h1>
            <h1>
              Quantité :{" "}
              <span className="text-3xl font-bold">{quantity(data)}</span>
            </h1>
          </div>
          <div className="flex-1 flex">
            <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none p-3 rounded-full cursor-pointer bg-black">
              <TrashIcon
                onClick={() => {
                  setOpenDelete(true);
                }}
                className="h-5 w-5 text-white"
              ></TrashIcon>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                }}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                New Operation
              </button>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
              <Link href={`/products/${route.query.product}/editer`}>
                <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto">
                  <PencilIcon className="h-5 w-5 text-white" />
                  Editer
                </a>
              </Link>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-rose-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2 sm:w-auto"
              >
                <PrinterIcon className="h-5 w-5 text-white" />
                imprimer
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4 mt-10 ring-1 bg-white ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
          {data.length == 0 ? (<div className="p-8 text-3xl ">Pas d operation</div>) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Code bar
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Nom produit
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    quantite
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&

                  data.map((operation, operationIdx) => (
                    <tr key={operation._id}>
                      <td
                        className={classNames(
                          operationIdx === 0 ? "" : "border-t border-transparent",
                          "relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                        )}
                      >
                        <div className="font-medium text-gray-900">
                          {operation.product_id?.code_bar}
                        </div>
                      </td>
                      <td
                        className={classNames(
                          operationIdx === 0 ? "" : "border-t border-gray-200",
                          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                        )}
                      >
                        {operation.product_id?.origin_name}
                      </td>
                      <td
                        className={classNames(
                          operationIdx === 0 ? "" : "border-t border-gray-200",
                          "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                        )}
                      >
                        {operation.amount}
                      </td>
                      <td className={classNames("border-t border-gray-200")}>
                        {operation.type}
                      </td>
                      <td
                        className={classNames(
                          operationIdx === 0 ? "" : "border-t border-gray-200",
                          "px-3 py-3.5 text-sm text-gray-500"
                        )}
                      >
                        <div className="hidden sm:block">{moment(operation.date).format("DD/MM/YYYY à HH:mm")}</div>
                      </td>
                      <td
                        className={classNames(
                          "border-t border-gray-200",
                          "px-3 py-3.5 text-sm text-gray-500"
                        )}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("clicked");

                            deleteOp();
                            //route.reload(window.location.pathname!);
                          }}
                          className="w-10 flex items-center justify-center hover:bg-orange-100 rounded-full cursor-pointer p-2"
                        >
                          <DeleteOperationConfirm
                            id={operation._id}
                            open={openDeleteOp}
                            setOpen={setOpenDeleteOp}
                          ></DeleteOperationConfirm>
                          <TrashIcon className="h-5 w-5 text-orange-400 " />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>)}
        </div>
      </div>
    </>
  );
}
