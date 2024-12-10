import React from "react";
import { FaHandshake } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsTruck } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import BrandItem from "./BrandItem";

const Brands = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 pt-20 md:px-0 px-5">
      <BrandItem
        title="Conexión Directa"
        text="Conecta directamente con proveedores locales y compra productos frescos de manera segura y sin intermediarios."
        icon={FaHandshake}
      />
      <BrandItem
        title="Ofertas Competitivas"
        text="Compara precios y obtén las mejores ofertas para tus compras al por mayor o al detalle."
        icon={MdLocalOffer}
      />
      <BrandItem
        title="Entrega Rápida"
        text="Recibe tus pedidos a tiempo con nuestro sistema de logística eficiente y confiable."
        icon={BsTruck}
      />
      <BrandItem
        title="Productos Orgánicos"
        text="Accede a una variedad de frutas frescas y orgánicas de alta calidad directamente del productor."
        icon={FaLeaf}
      />
      <BrandItem
        title="Ahorra Tiempo"
        text="Simplifica tus compras con nuestra plataforma fácil de usar y gestionada para tu comodidad."
        icon={FaRegClock}
      />
    </div>
  );
};

export default Brands;
