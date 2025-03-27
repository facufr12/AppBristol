/* eslint-disable */
import { v4 as uuid } from "uuid";

export const DashboardMenu = [
  // {
  //   id: uuid(),
  //   title: "Inicio (en desarrollo)",
  //   icon: "home",
  //   children: [
  //     { id: uuid(), link: "/overview", name: "Bienvenido" },
  //     { id: uuid(), link: "/dashboard/analytics", name: "Overview" }
  //   ]
  // },
  // {
  //   id: uuid(),
  //   title: "Cotizador (en desarrollo)", // Título de la sección
  //   icon: "book-open", // Icono de la calculadora con Feather Icons
  //   children: [
  //     { id: uuid(), link: "/user/Cotizador", name: "Formulario Cotizador" }
  //   ]
  // },
  {
    id: uuid(),
    title: "Prospectos",
    icon: "user",
    children: [
      { id: uuid(), link: "/user/instructor", name: "Prospectos" },
    ]
  },
  // Planes
  // {
 // id: uuid(),
  //   title: "Planes",
  //  icon: "calendar",
   // children: [
 //     { id: uuid(), link: "/prestadores/projectprestadores", name: "Cobertura / Zonas" }
 //   ]
 // },
];

export default DashboardMenu;
