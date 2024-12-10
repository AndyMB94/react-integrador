import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useMyContext } from "../store/ContextApi";

const Navbar = () => {
  const [headerToggle, setHeaderToggle] = useState(false);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const { token, setToken, setCurrentUser, role, setIsAdmin } = useMyContext();

  const handleLogout = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/login");
  };

  const renderNavItems = () => {
    if (!token) {
      // Navbar para visitantes (no autenticados)
      return (
        <>
          <Link to="/contact">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/contact" ? "font-semibold" : ""}`}>
              Contacto
            </li>
          </Link>
          <Link to="/about">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/about" ? "font-semibold" : ""}`}>
              Nosotros
            </li>
          </Link>
          <Link to="/signup">
            <li className="w-24 text-center bg-btnColor font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300">
              SignUp
            </li>
          </Link>
        </>
      );
    } else if (role === "Proveedor") {
      // Navbar para usuarios con rol Proveedor
      return (
        <>
          <Link to="/dashboard">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/dashboard" ? "font-semibold" : ""}`}>
              Panel de Control
            </li>
          </Link>
          <Link to="/my-products">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/my-products" ? "font-semibold" : ""}`}>
              Mis Productos
            </li>
          </Link>
          <Link to="/orders">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/orders" ? "font-semibold" : ""}`}>
              Pedidos
            </li>
          </Link>
          <Link to="/reviews">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/reviews" ? "font-semibold" : ""}`}>
              Reseñas y Calificaciones
            </li>
          </Link>
          <Link to="/messages">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/messages" ? "font-semibold" : ""}`}>
              Mensajes
            </li>
          </Link>
          <Link to="/notifications">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/notifications" ? "font-semibold" : ""}`}>
              Notificaciones
            </li>
          </Link>
          <Link to="/profile">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/profile" ? "font-semibold" : ""}`}>
              Perfil
            </li>
          </Link>
          <button onClick={handleLogout} className="w-24 text-center bg-customRed font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300">
            LogOut
          </button>
        </>
      );
    } else if (role === "Comprador") {
      // Navbar para usuarios con rol Comprador
      return (
        <>
          <Link to="/home">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/home" ? "font-semibold" : ""}`}>
              Inicio
            </li>
          </Link>
          <Link to="/shop">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/shop" ? "font-semibold" : ""}`}>
              Tienda
            </li>
          </Link>
          <Link to="/cart">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/cart" ? "font-semibold" : ""}`}>
              Carrito de Compras
            </li>
          </Link>
          <Link to="/purchases">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/purchases" ? "font-semibold" : ""}`}>
              Mis Compras
            </li>
          </Link>
          <Link to="/support">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/support" ? "font-semibold" : ""}`}>
              Soporte
            </li>
          </Link>
          <Link to="/notifications">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/notifications" ? "font-semibold" : ""}`}>
              Notificaciones
            </li>
          </Link>
          <Link to="/favorites">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/favorites" ? "font-semibold" : ""}`}>
              Favoritos
            </li>
          </Link>
          <Link to="/profile">
            <li className={`py-2 cursor-pointer hover:text-slate-300 ${pathName === "/profile" ? "font-semibold" : ""}`}>
              Perfil
            </li>
          </Link>
          <button onClick={handleLogout} className="w-24 text-center bg-customRed font-semibold px-4 py-2 rounded-sm cursor-pointer hover:text-slate-300">
            LogOut
          </button>
        </>
      );
    }
  };

  return (
    <header className="h-headerHeight z-50 text-textColor bg-headerColor shadow-sm flex items-center sticky top-0">
      <nav className="sm:px-10 px-4 flex w-full h-full items-center justify-between">
        <Link to="/">
          <h3 className="font-dancingScript text-logoText">FruitCommerce</h3>
        </Link>
        <ul
          className={`lg:static absolute left-0 top-16 w-full lg:w-fit lg:px-0 sm:px-10 px-4 lg:bg-transparent bg-headerColor ${
            headerToggle
              ? "min-h-fit max-h-navbarHeight lg:py-0 py-4 shadow-md shadow-slate-700 lg:shadow-none"
              : "h-0 overflow-hidden"
          } lg:h-auto transition-all duration-100 font-montserrat text-textColor flex lg:flex-row flex-col lg:gap-8 gap-2`}
        >
          {renderNavItems()}
        </ul>
        <span onClick={() => setHeaderToggle(!headerToggle)} className="lg:hidden block cursor-pointer text-textColor shadow-md hover:text-slate-400">
          {headerToggle ? <RxCross2 className="text-2xl" /> : <IoMenu className="text-2xl" />}
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
