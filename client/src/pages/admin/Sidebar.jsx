import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  PenSquare,
  Heart,
  FileText,
  Package,
  MessageSquareText,
  X,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Add Product",
    path: "/admin/addproduct",
    icon: ShoppingCart,
  },
  {
    name: "Products List",
    path: "/admin/products",
    icon: ShoppingBag,
  },
  {
    name: "Add Blog",
    path: "/admin/addblog",
    icon: PenSquare,
  },
  {
    name: "Blog List",
    path: "/admin/blogs",
    icon: FileText,
  },
  {
    name: "Order List",
    path: "/admin/orders",
    icon: Package,
  },
  {
    name: "Wishlist",
    path: "/admin/wishlist",
    icon: Heart,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: MessageSquareText,
  },
];

const Sidebar = ({ sideBarOpen, setSidebarOpen }) => {
  useEffect(() => {
    document.body.style.overflow = sideBarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sideBarOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          lg:hidden transition-opacity duration-300
          ${
            sideBarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          w-[260px]
          h-screen
          bg-[#111827]
          text-white
          flex flex-col
          border-r border-white/[0.06]
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          ${
            sideBarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="relative px-5 py-6 border-b border-white/[0.08]">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden
              absolute right-4 top-5
              w-9 h-9
              rounded-xl
              flex items-center justify-center
              text-gray-400
              hover:bg-white/10
              hover:text-white
              transition
            "
          >
            <X size={19} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-11 h-11
                rounded-xl
                bg-blue-600
                flex items-center justify-center
                shadow-lg shadow-blue-600/20
              "
            >
              <ShieldCheck size={22} strokeWidth={2.2} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Admin Panel
              </h2>

              <p className="text-[11px] text-gray-400">
                Management Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-3
            py-6
          "
        >
          <div className="flex items-center gap-3 px-3 mb-3">
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-gray-500
              "
            >
              Main Menu
            </span>

            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    gap-2.5
                    px-3.5
                    py-2
                    rounded-xl
                    text-[14px]
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-gray-400 hover:bg-white/[0.06] hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span
                          className="
                            absolute
                            left-0
                            top-1/2
                            -translate-y-1/2
                            w-1
                            h-6
                            bg-white
                            rounded-r-full
                          "
                        />
                      )}

                      {/* Icon */}
                      <span
                        className="
                          w-9 h-9
                          flex
                          items-center
                          justify-center
                          rounded-lg
                          shrink-0
                        "
                      >
                        <Icon
                          size={19}
                          strokeWidth={isActive ? 2.3 : 1.9}
                        />
                      </span>

                      {/* Text */}
                      <span className="truncate">
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Profile */}
        <div className="p-4 border-t border-white/[0.08]">
          <div
            className="
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              bg-white/[0.04]
              border border-white/[0.05]
            "
          >
            <div
              className="
                w-10 h-10
                shrink-0
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-sm
              "
            >
              AN
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">
                Abdul Noor
              </h4>

              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                <p className="text-[11px] text-gray-400">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;