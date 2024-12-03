import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../authentication/AuthContext";
import CustomToast from "../authentication/Toast";
import Logo from "../../../assets/images/logo-bristol.svg";

const ProspectForm = ({ show, handleClose }) => {
  const { userData } = useAuth(); // Obtener userData desde el contexto
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [tAfiliacion, setTAfiliacion] = useState("");
  const [gpFamiliar, setGpFamiliar] = useState("");
  const [cel, setCel] = useState("");
  const [correo, setCorreo] = useState("");
  const [partido, setPartido] = useState("");
  const [estado, setEstado] = useState("");
  const [asignarVendedor, setAsignarVendedor] = useState(false); // Estado para el checkbox
  const [toastShow, setToastShow] = useState(false); // Estado para mostrar el Toast
  const [toastMessage, setToastMessage] = useState(""); // Mensaje del Toast
  const [toastTitle, setToastTitle] = useState(""); // Título del Toast

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la petición fetch
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxNn3wU0BDPbf6laTTq3PCaq6N7SkyVIdrzrKZkWrUW0pzcHU0Ku-tMQiZVsl6pZBRSGA/exec?func=añadirDato",
        {
          method: "POST",
          body: JSON.stringify({
            nombre,
            edad,
            tAfiliacion,
            gpFamiliar,
            cel,
            correo,
            partido,
            estado,
            vendedor: asignarVendedor ? userData?.vendedor : null // Envío del vendedor desde userData si se selecciona el checkbox
          })
        }
      );

      // Maneja la respuesta
      if (response.ok) {
        const resultado = await response.json();
        setToastTitle("Prospecto Creado");
        setToastMessage(
          "Datos enviados correctamente: " + JSON.stringify(resultado)
        );
        setToastShow(true); // Mostrar el Toast
        handleClose(); // Cierra el modal
      } else {
        setToastTitle("Error");
        setToastMessage(
          "Error al enviar los datos: " +
            response.status +
            " " +
            response.statusText
        );
        setToastShow(true); // Mostrar el Toast
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setToastTitle("Error");
      setToastMessage(
        "Error al enviar los datos. Por favor, intenta nuevamente."
      );
      setToastShow(true); // Mostrar el Toast
    }
  };

  const isAlphabets = (str) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(str);
  const isValidCel = (cel) => /^\d{10}$/.test(cel); // Suponiendo que el celular debe tener 10 dígitos
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label style={{ marginTop: "1rem" }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                isInvalid={!isAlphabets(nombre) && nombre.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Solo se permiten caracteres alfabéticos.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="edad">
              <Form.Label style={{ marginTop: "1rem" }}>Edad</Form.Label>
              <Form.Control
                as="select"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
              >
                <option value="">Selecciona la edad</option>
                {Array.from({ length: 80 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} años
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="tAfiliacion">
              <Form.Label style={{ marginTop: "1rem" }}>
                Tipo Afiliación
              </Form.Label>
              <Form.Control
                as="select"
                value={tAfiliacion}
                onChange={(e) => setTAfiliacion(e.target.value)}
                required
              >
                <option value="">Selecciona el tipo de afiliación</option>
                <option value="Particular/oAutoonomo">
                  Particular / Autónomo
                </option>
                <option value="Conrecibodesueldo">Con Recibo de Sueldo</option>
                <option value="Monotributista">Monotributista</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="gpFamiliar">
              <Form.Label style={{ marginTop: "1rem" }}>
                Grupo Familiar
              </Form.Label>
              <Form.Control
                as="select"
                value={gpFamiliar}
                onChange={(e) => setGpFamiliar(e.target.value)}
                required
              >
                <option value="">Selecciona el grupo familiar</option>
                <option value="Individual">Individual</option>
                <option value="Matrimonio">Matrimonio</option>
                <option value="Matrimonio+1hijo">Matrimonio + 1 Hijo</option>
                <option value="Matrimonio+2hijos">Matrimonio + 2 Hijos</option>
                <option value="Matrimonio+3hijos">Matrimonio + 3 Hijos</option>
                <option value="Individual+1hijo">Individual + 1 Hijo</option>
                <option value="Individual+2hijos">Individual + 2 Hijos</option>
                <option value="Individual+3hijo">Individual + 3 Hijos</option>
                <option value="Otro">Otro</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="cel">
              <Form.Label style={{ marginTop: "1rem" }}>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Celular"
                value={cel}
                onChange={(e) => setCel(e.target.value)}
                required
                isInvalid={!isValidCel(cel) && cel.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Debe ser un número de 10 dígitos.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="correo">
              <Form.Label style={{ marginTop: "1rem" }}>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                isInvalid={!isValidEmail(correo) && correo.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un correo válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="partido">
              <Form.Label style={{ marginTop: "1rem" }}>Partido</Form.Label>
              <Form.Control
                as="select"
                value={partido}
                onChange={(e) => setPartido(e.target.value)}
                required
              >
                <option value="">Selecciona el partido</option>
                <option value="CABA">CABA</option>
                <option value="Almirante Brown">Almirante Brown</option>
                <option value="Avellaneda">Avellaneda</option>
                <option value="Berazategui">Berazategui</option>
                <option value="Esteban Echeverría">Esteban Echeverría</option>
                <option value="Ezeiza">Ezeiza</option>
                <option value="Florencio Varela">Florencio Varela</option>
                <option value="General San Martín">General San Martín</option>
                <option value="Hurlingham">Hurlingham</option>
                <option value="Ituzaingó">Ituzaingó</option>
                <option value="José C. Paz">José C. Paz</option>
                <option value="La Matanza">La Matanza</option>
                <option value="Lanús">Lanús</option>
                <option value="Lomas de Zamora">Lomas de Zamora</option>
                <option value="Malvinas Argentinas">Malvinas Argentinas</option>
                <option value="Merlo">Merlo</option>
                <option value="Moreno">Moreno</option>
                <option value="Morón">Morón</option>
                <option value="Quilmes">Quilmes</option>
                <option value="San Fernando">San Fernando</option>
                <option value="San Isidro">San Isidro</option>
                <option value="San Miguel">San Miguel</option>
                <option value="Tigre">Tigre</option>
                <option value="Tres de Febrero">Tres de Febrero</option>
                <option value="Vicente López">Vicente López</option>
                <option value="Otra">Otra</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="vendedor">
              <Form.Check
                type="checkbox"
                label="¿Asignar vendedor?"
                checked={asignarVendedor}
                onChange={(e) => setAsignarVendedor(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="estado">
              <Form.Label style={{ marginTop: "1rem" }}>Estado</Form.Label>
              <Form.Control
                as="select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Selecciona un estado</option>
                <option value="Cotizacion Enviada">Cotizacion Enviada</option>
                <option value="Desestimado Preexistencia">
                  Desestimado Preexistencia
                </option>
                <option value="Desestimado Fuera de Zona">
                  Desestimado Fuera de Zona
                </option>
                <option value="Desestimado por Edad">
                  Desestimado por Edad
                </option>
                <option value="No Contesta">No Contesta</option>
                <option value="Prueba Interna">Prueba Interna</option>
                <option value="Busca Aporte x Aporte">
                  Busca Aporte x Aporte
                </option>
                <option value="Ya es Socio">Ya es Socio</option>
                <option value="Busca Otra Cobertura">
                  Busca Otra Cobertura
                </option>
                <option value="Teléfono Erróneochazado">
                  Teléfono Erróneo
                </option>
                <option value="Email Erróneo">Email Erróneo</option>
                <option value="No le iInteresa por Costos">
                  No le iInteresa por Costos
                </option>

                <option value="No le iInteresa por Cartilla">
                  No le iInteresa por Cartilla
                </option>

                <option value="Tomó Otra Cobertura">Tomó Otra Cobertura</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Guardar Prospecto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Componente Toast */}
      <CustomToast
        show={toastShow}
        onClose={() => setToastShow(false)}
        message={toastMessage}
        title={toastTitle}
      />
    </>
  );
};

export default ProspectForm;
