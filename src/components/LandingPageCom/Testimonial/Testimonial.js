import React from "react";
import TestimonialItem from "./TestimonialItem";

const Testimonial = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 md:px-0 px-5">
      <TestimonialItem
        title="Una experiencia confiable"
        text="FruitCommerce ha revolucionado la manera en la que manejo mi negocio. Ahora puedo encontrar proveedores confiables con facilidad."
        name="Carlos Gutiérrez"
        status="Dueño de frutería"
      />
      <TestimonialItem
        title="Rapidez y eficiencia"
        text="La plataforma es muy intuitiva. Encontrar productos frescos a precios competitivos nunca fue tan fácil."
        name="María Rodríguez"
        status="Gerente de supermercado"
      />
      <TestimonialItem
        title="Ahorro de tiempo"
        text="Gracias a FruitCommerce, puedo gestionar mis compras de manera más eficiente y dedicar más tiempo a mi negocio."
        name="Pedro Sánchez"
        status="Distribuidor mayorista"
      />
    </div>
  );
};

export default Testimonial;
