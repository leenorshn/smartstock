/* This example requires Tailwind CSS v2.0+ */

import {
  FolderIcon,
  HomeIcon,
  UsersIcon,
  ListBulletIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Stock", href: "/products", icon: ListBulletIcon, current: false },
  { name: "Ventes", href: "/operations", icon: FolderIcon, current: false },
  { name: "Aide", href: "/help", icon: InformationCircleIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
  return (
    <div className="pt-5 w-64 min-h-screen sticky top-0 left-0 bg-blue-700">
      <nav className="space-y-1 px-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-100 text-blue-600"
                : "text-gray-50 hover:bg-blue-600 hover:text-white",
              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
            )}
          >
            <item.icon
              className={classNames(
                item.current
                  ? "text-gray-50"
                  : "text-gray-100 group-hover:text-gray-50",
                "mr-4 flex-shrink-0 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
