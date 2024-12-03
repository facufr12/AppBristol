import { Link, useNavigate } from "react-router-dom"; 
import { Fragment, useState, useEffect } from "react";
import { Row, Col, Dropdown, ListGroup, Modal, Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import DotBadge from "components/elements/bootstrap/DotBadge";
import DarkLightMode from "layouts/DarkLightMode";
import { useAuth } from "components/dashboard/authentication/AuthContext";
import CustomToast from "components/dashboard/authentication/Toast"; // Importa tu CustomToast

const QuickMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false); // Estado para el toast
  const [toastMessage, setToastMessage] = useState(""); // Mensaje del toast
  const [toastTitle, setToastTitle] = useState(""); // Título del toast
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getInitials = (name) => {
    if (!name) return 'XX';
    const names = name.split(' ');
    return names.length > 1 
      ? names[0][0] + names[1][0] 
      : names[0][0] + ' ';
  };

  const initials = !loading && userData && userData.vendedor 
    ? getInitials(userData.vendedor) 
    : 'XX';

  const handleLogout = () => {
    logout(); // Llama al método de cierre de sesión
    setToastTitle("Sesión cerrada");
    setToastMessage("Sesion Cerrada Correctamente.");
    setShowToast(true); // Muestra el toast
    setTimeout(() => {
      navigate('/'); // Redirige a la página de inicio de sesión
    }, 2000); // Espera 2 segundos antes de redirigir
  };

  return (
    <Fragment>
      <DarkLightMode />
      <ListGroup as="ul" bsPrefix="navbar-nav" className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
        <Dropdown as="li" className="ms-1">
          <Dropdown.Toggle as="a" bsPrefix=" " className="rounded-circle" id="dropdownUser">
            <div
              className="avatar avatar-md avatar-indicators avatar-online"
              style={{
                backgroundColor: "#0C662C",
                color: "white",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "40px",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "15px"
              }}
            >
              {initials.toUpperCase()}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownUser"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div
                  className="avatar avatar-md avatar-indicators avatar-online"
                  style={{
                    backgroundColor: "#0C662C",
                    color: "white",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "40px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "15px"
                  }}
                >
                  {initials.toUpperCase()}
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">{userData?.vendedor || 'Usuario'}</h5>
                  <p className="mb-0 text-muted">{userData?.cel || 'Sin celular'}</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2" onClick={handleShow}>
              <i className="fe fe-user me-2"></i> Perfil
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/settings/general">
              <i className="fe fe-settings me-2"></i> Configuración (en desarrollo)
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="mb-3" onClick={handleLogout}>
              <i className="fe fe-power me-2"></i> Cerrar Sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup>

      {/* Modal de Perfil */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Perfil de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Avatar"
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <div
                className="avatar avatar-md avatar-indicators avatar-online"
                style={{
                  backgroundColor: "#0C662C",
                  color: "white",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "40px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginRight:"60px",
                  marginBottom: "15px"
                }}
              >
                {initials.toUpperCase()}
              </div>
            )}
            <div>
              <p>Usuario: {userData?.vendedor || 'Usuario'}</p>
              <p className="text-muted">Correo: {userData?.email || 'Sin email'}</p>
              <p className="text-muted">Celular: {userData?.cel || 'Sin celular'}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Componente Toast */}
      <CustomToast 
        show={showToast} 
        onClose={() => setShowToast(false)} 
        message={toastMessage} 
        title={toastTitle} 
      />
    </Fragment>
  );
};

export default QuickMenu;
