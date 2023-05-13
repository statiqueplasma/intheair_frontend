import { Modal, Alert, ModalHeader } from "react-bootstrap";

function ModalError({show, setShow}) {
    const handleClose = () => setShow(false);
    
    const modalStyle = {
        backgroundColor: '#F9D7D9',
        color: '#953A42',

    }

    return (
        <Modal show={show} onHide={handleClose}>
            {/* <Modal.Header style={modalStyle} closeButton closeVariant="red">
                <Modal.Title>Identifiants invalides !</Modal.Title>
            </Modal.Header> */}
            <Modal.Body style={modalStyle}>Merci de réessayer sans vous gourer bande d'idiots</Modal.Body>
        </Modal>
    )
}

export default ModalError;