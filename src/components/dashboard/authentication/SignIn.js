import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image, Spinner } from "react-bootstrap";
import Logo from "../../../assets/images/logo-bristol.svg";
import DarkLightMode from "layouts/DarkLightMode";
import authService from "./authService";
import { useAuth } from './AuthContext';
import CustomToast from "./Toast";

const SignIn = () => {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTitle, setToastTitle] = useState("");
    const [toastVariant, setToastVariant] = useState("success"); // Estado para definir el color del Toast
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const credentials = { usuario, contraseña };
            const data = await authService.login(credentials);

            console.log("Respuesta del servidor:", data);

            if (data && data.vendedor && data.email && data.cel && data.categoria) {
                console.log("Inicio de sesión exitoso:", data);
                setUserData(data);
                setToastTitle("Éxito");
                setToastMessage("Inicio de sesión exitoso.");
                setToastVariant("success");
                setShowToast(true);

                setTimeout(() => {
                    navigate("/user/instructor");
                }, 2000);
            } else if (data.error) {
                console.error("Credenciales inválidas:", data.error);
                setToastTitle("Error");
                setToastMessage(data.error);
                setToastVariant("danger");
                setShowToast(true);
            } else {
                setToastTitle("Error");
                setToastMessage("Error en el inicio de sesión. Verifica tus credenciales.");
                setToastVariant("danger");
                setShowToast(true);
            }
        } catch (err) {
            console.error("Error capturado:", err);
            setToastTitle("Error");
            setToastMessage(err.message || "Error en el inicio de sesión. Verifica tus credenciales.");
            setToastVariant("danger");
            setShowToast(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            {/* Formulario de inicio de sesión */}
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
                                <h1 className="mb-1 fw-bold">Inicio de Sesión</h1>
                                <span>
                                        {/*
                                    ¿No tienes acceso?{" "}
                                    <Link to="/authentication/sign-up" className="ms-1">
                                        Registrarse
                                    </Link>
                                         */}
                                </span>
                            </div>
                            <div className="text-center mb-4">
                                <DarkLightMode />
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={12} className="mb-3">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="usuario"
                                            placeholder="Ingrese su Usuario"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="contraseña"
                                            placeholder="Ingrese su Contraseña"
                                            value={contraseña}
                                            onChange={(e) => setContraseña(e.target.value)}
                                            required
                                        />
                                    </Col>
                                    <Col lg={12} className="mb-3">
                                          {/* 
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <Form.Group
                                                className="mb-3 mb-md-0"
                                                controlId="formBasicCheckbox"
                                            >
                                                <Form.Check type="checkbox" label="Recordar" />
                                            </Form.Group>
                                            <Link to="/authentication/forget-password">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                            */}
                                    </Col>
                                    <Col lg={12} className="mb-0 d-grid gap-2">
                                        <Button variant="primary" type="submit" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="me-2"
                                                    />
                                                    Cargando...
                                                </>
                                            ) : (
                                                "Iniciar Sesión"
                                            )}
                                        </Button>
                                    </Col>
                                    {error && (
                                        <Col lg={12} className="mt-3">
                                            <div className="alert alert-danger">{error}</div>
                                        </Col>
                                    )}
                                </Row>
                            </Form>
                            <hr className="my-4" />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Componente Toast */}
            <CustomToast 
                show={showToast} 
                onClose={() => setShowToast(false)} 
                message={toastMessage} 
                title={toastTitle} 
                variant={toastVariant} // Pasa el color como prop
            />
        </Fragment>
    );
};

export default SignIn;
