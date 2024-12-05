import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import Logo from "../../../assets/images/logo-bristol.png";
import DarkLightMode from "layouts/DarkLightMode"; // Asegúrate de que la ruta sea correcta

const SignUp = () => {
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card style={{ borderRadius: "40px" }}>
            <Card.Body className="p-6">
              <div className="mb-4 text-center">
                <Link to="/">
                  <Image
                    src={Logo}
                    className="mb-4"
                    alt=""
                    style={{ width: "150px" }}
                  />
                </Link>
                <h1 className="mb-1 fw-bold">Registrarse</h1>
                <span>
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/authentication/sign-in" className="ms-1">
                    Iniciar Sesión
                  </Link>
                </span>
              </div>
              {/* Componente DarkLightMode */}
              <div className="text-center mb-4">
                <DarkLightMode />
              </div>
              {/* Form */}
              <Form>
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      placeholder="Nombre de Usuario"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Correo electrónico"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="**************"
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" />
                      <Form.Check.Label>
                        Acepto los Términos de Servicio y Política de
                        Privacidad.
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Registrarse
                    </Button>
                  </Col>
                </Row>
              </Form>
              <hr className="my-4" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
