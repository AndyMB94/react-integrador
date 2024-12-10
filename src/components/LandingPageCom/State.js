import React from "react";
import CardSlider from "./CardSlider";

const State = () => {
  return (
    <div className="py-28">
      <div className="flex justify-between items-center md:px-0 px-4">
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="sm:text-4xl text-logoText text-green-700 font-bold">
            +500
          </span>
          <span className="text-slate-600 text-center sm:text-sm text-xs">
            Proveedores activos
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="sm:text-4xl text-logoText text-green-700 font-bold">
            +10,000
          </span>
          <span className="text-slate-600 text-center sm:text-sm text-xs">
            Productos disponibles
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <span className="sm:text-4xl text-logoText text-green-700 font-bold">
            99%
          </span>
          <span className="text-slate-600 text-center sm:text-sm text-xs">
            Tasa de satisfacción del cliente
          </span>
        </div>
      </div>
      <div className="mt-10 md:px-0 px-4">
        <h3 className="text-slate-700 text-2xl font-semibold pb-5 pt-6">
          Nuestra plataforma, en números
        </h3>
        <div className="flex md:flex-row flex-col md:gap-0 gap-16 justify-between">
          <ul className="list-disc sm:px-5 ps-10 text-slate-700 flex flex-col gap-5 flex-1 overflow-hidden">
            <li>Conecta compradores y proveedores con facilidad.</li>
            <li>Acceso rápido a miles de productos frescos y de calidad.</li>
            <li>Plataforma optimizada para ahorrar tiempo y costos.</li>
            <li>Altamente confiable, con una tasa de satisfacción del 99%.</li>
          </ul>
          <div className="flex-1 overflow-hidden">
            <CardSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
