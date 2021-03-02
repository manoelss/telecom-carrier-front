import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeAvailableNumber, setAvailableNumber } from "../../store/ducks/availableNumbers";
import MainLayout from "../../components/MainLayout";
import { 
  Table, 
  ButtonGroup, 
  Button,
  Row,
  Col,
  Modal,
  Toast,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faPen, 
  faTrash,
  faExclamationTriangle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

function AvailableNumbers() {
  const history = useHistory();
  const availableNumbers = useSelector((state) => state.availableNumbers);
  const dispatch = useDispatch();

  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [indexNumberSelected, setIndexNumberSelected] = useState(0);
  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false);

  const handleCloseDeletionModal = () => setShowDeletionModal(false);
  const handleOpenDeletionModal = (index) => {
    setIndexNumberSelected(index);
    const numberSelected = availableNumbers.availableNumberList[index];
    dispatch(setAvailableNumber(numberSelected));
    setShowDeletionModal(true);
  };

  const deleteNumber = () => {
    availableNumbers.availableNumberList.splice(indexNumberSelected, 1);
    const rows = availableNumbers.availableNumberList;
    const count = availableNumbers.availableNumberListCount - 1;
    dispatch(removeAvailableNumber({
      "count": count,
      "rows": rows
    }));
    handleCloseDeletionModal();
    setShowDeletionConfirmation(true);
    dispatch(setAvailableNumber({}));
  }

  const editNumber = (index) => {
    setIndexNumberSelected(index);
    const numberSelected = availableNumbers.availableNumberList[index];
    dispatch(setAvailableNumber(numberSelected));
    history.push("/available-numbers/edit");
  }

  return (
    <MainLayout>
      <h2>Available Numbers</h2>
      <hr />
      <Row>
        <Col sm={12} md={9}>
          <h4 className="pb-4">All available numbers for purchase.</h4>
        </Col>
        <Col sm={12} md={3}>
          <Link 
            to="/available-numbers/add" 
            className="btn btn-lg btn-block btn-primary mb-4"
          >
            <FontAwesomeIcon icon={faPlus} /> Add number
          </Link>
        </Col>
      </Row>
      <Table 
        responsive
        striped
        bordered
        hover
        variant="dark"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Number</th>
            <th>Monthly Price</th>
            <th>Setup Price</th>
            <th>Currency</th>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            availableNumbers.availableNumberList.map((number, index) => {
              return (
                <tr key={number.id}>
                  <td>{number.id}</td>
                  <td><strong>{number.value}</strong></td>
                  <td>{number.monthlyPrice}</td>
                  <td>{number.setupPrice}</td>
                  <td>{number.currency}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="primary" onClick={() => editNumber(index)}>
                        <FontAwesomeIcon icon={faPen} /> Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleOpenDeletionModal(index)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>

      <Modal
        show={showDeletionModal}
        onHide={handleCloseDeletionModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon={faExclamationTriangle} /> Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>This action will delete the number <strong>{availableNumbers.availableNumber.value}</strong> permanently. Do you want to proceed?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletionModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteNumber}>Yes, delete number</Button>
        </Modal.Footer>
      </Modal>

      <Toast
        style={{
          position: 'fixed',
          top: 50,
          right: 30,
        }}
        onClose={() => setShowDeletionConfirmation(false)} 
        show={showDeletionConfirmation} 
        delay={5000} 
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto"><FontAwesomeIcon icon={faInfoCircle} /> Number deleted!</strong>
          <small>right now</small>
        </Toast.Header>
        <Toast.Body>The number was been deleted successfully.</Toast.Body>
      </Toast>
    </MainLayout>
  );
}

export default AvailableNumbers;