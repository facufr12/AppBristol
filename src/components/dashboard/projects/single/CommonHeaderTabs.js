import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Importa rutas
import { DashboardMenu } from 'routes/dashboard/DashboardRoutes';

const CommonHeaderTabs = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Mueve handleBack dentro del componente
	const handleBack = () => {
		navigate('/user/instructor'); // Redirige al hacer clic en el botón
	};

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} xs={12} className="mb-2">
					{/* Encabezado de la página */}
					<div className="d-lg-flex align-items-center justify-content-between">
						<div className="mb-2 mb-lg-0">
							<h1 className="mb-0 h2 fw-bold">Detalles del Prospecto</h1>
						</div>
						<div className="d-flex align-items-center">
							{/* Botón "Volver" */}
							<Button 	className="ms-3 mb-2" onClick={handleBack} variant="secondary">Volver</Button>
							<Button 
    variant="primary" 
    className="ms-3 mb-2"
    onClick={() => window.location.href = '/user/instructor'}
>
    Crear Póliza
</Button>

						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col xs={12} className="mb-4">
					<ListGroup as="ul" bsPrefix="nav nav-lb-tab">
						{DashboardMenu.filter(menu => menu.title === 'Projects').map((menu, index) => (
							<Fragment key={index}>
								{menu.children
									.filter(dataSource => dataSource.title === 'Single')
									.map((menuItem, index) => (
										<Fragment key={index}>
											{menuItem.children.map((subMenuItem, subMenuItemIndex) => (
												<ListGroup.Item
													key={subMenuItemIndex}
													as="li"
													bsPrefix="nav-item"
													className={`${subMenuItemIndex === 0 ? 'ms-0 me-3' : ''} mx-3`}
												>
													<Link
														to={subMenuItem.link}
														className={`nav-link mb-sm-3 mb-md-0 ${location.pathname === subMenuItem.link ? 'active' : ''}`}
													>
														{subMenuItem.name}
													</Link>
												</ListGroup.Item>
											))}
										</Fragment>
									))}
							</Fragment>
						))}
					</ListGroup>
				</Col>
			</Row>
		</Fragment>
	);
};

export default CommonHeaderTabs;
