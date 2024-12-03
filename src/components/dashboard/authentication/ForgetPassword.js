import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Logo from "../../../assets/images/logo-bristol.svg"


const ForgetPassword = () => {
	return (
		<Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={4} md={5} className="py-8 py-xl-0">
					<Card style={{ borderRadius: '40px' }}>
						<Card.Body className="p-5 text-center">
							<div className="mb-4">
								<Link to="/">
									<Image 
										src={Logo}
										className="mb-4" 
										alt="" 
										style={{ width: '150px' }} // Se achica el logo
									/>
								</Link>
								<h1 className="mb-3 fw-bold text-center">¿Olvidaste tu contraseña?</h1>
								<p>Te enviaremos un código a tu email.</p>
							</div>
							{/* Form */}
							<Form>
								<Row>
									<Col lg={12} md={12} className="mb-3">
										{/*  Email */}
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Ingresa tu Email"
											required
										/>
									</Col>
									<Col lg={12} md={12} className="mb-3 d-grid gap-2">
										{/* Button */}
										<Button 
											variant="primary" 
											type="submit" 
											style={{ borderRadius: '20px', marginBottom: '1rem',marginTop: '1rem' }}
										>
											Enviar al email
										</Button>
									</Col>
								</Row>
								<span>
									Ir a <Link to="/authentication/sign-in">Iniciar Sesión</Link>
								</span>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ForgetPassword;
