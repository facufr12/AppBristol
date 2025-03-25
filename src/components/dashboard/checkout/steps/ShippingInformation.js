// Importar librerías necesarias
import { useState } from "react";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";

const ShippingInformation = (props) => {
  const { next, previous } = props;

  // Estado inicial con todas las respuestas configuradas en "no"
  const [responses, setResponses] = useState(Array(75).fill("no"));

  const handleChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value; // Actualiza la respuesta en el índice correspondiente
    setResponses(newResponses);
  };

  const AddNewAddressModal = (props) => {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Row>{/* Campos del formulario del modal */}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cerrar
          </Button>
          <Button onClick={props.onHide}>Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Form>
      {/* Contenido del segundo paso */}
      <div className="bs-stepper-content">
        <div role="tabpanel" className="bs-stepper-pane">
          <div className="mb-5">
            <h3 className="mb-1">Declaración Jurada de Salud</h3>
            <p className="mb-0">Afiliado.</p>
          </div>

          {/* Campos de ingreso (peso y altura) */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="pesoKg1" className="form-label">
                Peso en KG
              </label>
              <input
                type="number"
                id="pesoKg1"
                className="form-control"
                placeholder="Ingrese peso en KG"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="alturaCm1" className="form-label">
                Altura en cm
              </label>
              <input
                type="number"
                id="alturaCm1"
                className="form-control"
                placeholder="Ingrese altura en cm"
              />
            </div>
          </div>

          {/* Preguntas con respuestas predeterminadas */}
          {[
            "Tuviste que ser internado en alguna oportunidad?",
            "¿Fuiste internado en el Sanatorio Colegiales?",
            "¿Tuviste que ser intervenido quirúrgicamente alguna vez?",
            "¿Tenés secuelas o algún tipo de enfermedad?",
            "¿Padeciste accidentes, fracturas o traumatismos?",
            "¿Te realizaron transfusiones de sangre?",
            "¿Realizaste tus análisis y estudios en el último año?",
            "¿Tenés alguna indicación médica para los próximos meses?",
            "¿Estás o estuviste en un tratamiento psicológico?",
            "¿Estás o estuviste en un tratamiento psiquiátrico?",
            "¿Estuviste internado en alguna institución de Salud Mental?",
            "¿Tenés diabetes?",
            "¿Tenés dificultades auditivas?",
            "¿Tenés problemas de vista? ¿De qué tipo?",
            "¿Usás lentes de contacto o anteojos?",
            "¿Tenés glaucoma (presión alta en el ojo) o cataratas?",
            "¿Tenés alergias?",
            "¿Tuviste ataques cardíacos o infartos?",
            "¿Te realizaste algún test de embarazo en las últimas semanas?",
            "Ingresa la fecha de tu última menstruación:",
            "¿Presentaste náuseas o vómitos recientemente / mareos o dolores de cabeza?",
            "¿Te encontrás cursando un embarazo ahora?",
            "¿Tuviste algún aborto espontáneo?",
            "¿Tuviste partos normales?",
            "¿Tenés problemas de columna?",
            "¿Tenés colocada alguna prótesis?",
            "¿Practicás algún deporte?",
            "¿Practicás algún deporte de riesgo?",
            "¿Tenés indicación para la colocación de alguna prótesis?",
            "¿Tenés o tuviste trastornos neurológicos o circulatorios cerebrales?",
            "¿Tenés o tuviste convulsiones y/o epilepsia?",
            "¿Tenés o tuviste pérdida de conocimiento?",
            "¿Tenés o tuviste mareos, lagunas o ausencias?",
            "¿Tenés o tuviste parálisis y/o ataques cerebrales?",
            "¿Tenés o tuviste enfermedades cardíacas o de las arterias coronarias?",
            "¿Tenés o tuviste arritmias?",
            "¿Tenés o tuviste la presión arterial elevada?",
            "¿Tenés o tuviste asma, bronquitis crónica, enfisema pulmonar?",
            "¿Tenés o tuviste tuberculosis?",
            "¿Tenés o tuviste fiebre reumática o enfermedades de los huesos?",
            "¿Tenés o tuviste ictericia, hepatitis (de cualquier tipo), cirrosis?",
            "¿Tenés o tuviste cólicos renales o vesiculares?",
            "¿Tenés o tuviste infecciones urinarias repetidas?",
            "¿Tenés o tuviste pérdida de sangre o anemia?",
            "¿Tenés enfermedades de transmisión sexual?",
            "¿Tenés o tuviste otras enfermedades infecciosas?",
            "¿Tenés o tuviste tumores?",
            "¿Tenés o tuviste enfermedades de las glándulas tiroides?",
            "¿Tenés o tuviste úlceras, gastritis y/o alguna otra enfermedad del estómago?",
            "¿Tenés problemas con el alcohol?",
            "¿Hacés uso de drogas o estupefacientes?",
            "¿Sos paciente oncológico?",
            "¿Fumás?",
            "¿Perdiste peso en los últimos meses?",
            "¿Se te diagnosticó recientemente alguna enfermedad?",
            "¿Tenés, tuviste o estás tramitando un certificado de discapacidad?",
          ].map((question, index) => (
            <div className="row mb-3" key={index}>
              <div className="col-md-8">
                <label className="form-label">{question}</label>
              </div>
              <div className="col-md-4">
                {index === 19 ? ( // Pregunta con campo de fecha
                  <input
                    type="date"
                    className="form-control"
                    id={`fechaMenstruacion`}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ) : (
                  <>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${index}`}
                        value="si"
                        checked={responses[index] === "si"}
                        onChange={() => handleChange(index, "si")}
                      />
                      <label className="form-check-label">Sí</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question-${index}`}
                        value="no"
                        checked={responses[index] === "no"} // Preseleccionado en "no"
                        onChange={() => handleChange(index, "no")}
                      />
                      <label className="form-check-label">No</label>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Campo para comentarios adicionales */}
          <div className="mb-4">
            <label htmlFor="comentarios" className="form-label">
              Otros comentarios
            </label>
            <textarea
              id="comentarios"
              className="form-control"
              rows="3"
              placeholder="Detalle aquí si posee alguna enfermedad, dolencia o patología que no conste en el presente cuestionario"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Botones para navegar entre pasos */}
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-primary"
          className="mb-2 mb-md-0"
          onClick={previous}
        >
          Volver a Datos de Afiliación
        </Button>
        <Button variant="primary" onClick={next}>
          Avanzar a "Confirmación"
        </Button>
      </div>
    </Form>
  );
};

export default ShippingInformation;
