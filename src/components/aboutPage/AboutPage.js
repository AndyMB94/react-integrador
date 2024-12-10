import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">Acerca de Nosotros</h1>
        <p className="mb-4">
          Bienvenido a FruitCommerce, tu plataforma confiable para conectar
          proveedores y compradores de frutas frescas de manera directa y
          eficiente. En FruitCommerce, creemos en construir relaciones sólidas
          entre las empresas, ofreciendo herramientas modernas para simplificar
          la gestión de compras y ventas.
        </p>

        <p className="mb-4">
          Nuestra misión es proporcionar una experiencia de comercio B2B única
          que beneficie tanto a proveedores como a compradores, garantizando
          transparencia, accesibilidad y precios competitivos. Ya seas un
          productor buscando expandir tu mercado o un minorista en busca de los
          mejores productos, FruitCommerce es el lugar para ti.
        </p>

        <ul className="list-disc list-inside mb-4 text-sm px-6 py-2">
          <li className="mb-2">
            Conecta con proveedores confiables de frutas frescas de calidad.
          </li>
          <li className="mb-2">
            Compara precios en tiempo real y elige la mejor opción para tu
            negocio.
          </li>
          <li className="mb-2">
            Gestiona pedidos y facturación de manera rápida y segura.
          </li>
          <li className="mb-2">
            Accede a herramientas de análisis para optimizar tus decisiones de
            compra y venta.
          </li>
        </ul>
        <div className="flex space-x-4 mt-10">
          <Link
            className="text-white rounded-full p-2 bg-green-600 hover:bg-green-700 transition-colors duration-300"
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={24} />
          </Link>
          <Link
            className="text-white rounded-full p-2 bg-green-600 hover:bg-green-700 transition-colors duration-300"
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            className="text-white rounded-full p-2 bg-green-600 hover:bg-green-700 transition-colors duration-300"
            to="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={24} />
          </Link>
          <Link
            className="text-white rounded-full p-2 bg-green-600 hover:bg-green-700 transition-colors duration-300"
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
