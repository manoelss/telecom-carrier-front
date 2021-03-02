import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { 
  setAvailableNumber, 
  addAvailableNumber, 
  updateAvailableNumber 
} from "../../store/ducks/availableNumbers";
import MainLayout from "../../components/MainLayout";
import { 
  Form, 
  Row, 
  Col,
  Alert,
  Button,
  Toast,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faSave, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function EditNumber(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const numberSelected = useSelector((state) => state.availableNumbers.availableNumber);
  const availableNumbers = useSelector((state) => state.availableNumbers);
  const [notificationText, setNotificationText] = useState("Changes are saved automatically.");
  const [notificationVariant, setNotificationVariant] = useState("warning");
  const [newFormValues, setNewFormValues] = useState({});
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const newId = availableNumbers.availableNumberList[availableNumbers.availableNumberList.length-1].id+1;

  if (props.action === "edit" && !numberSelected.hasOwnProperty("id")) {
    // Which means that someone is trying to access the path directly.
    // Redirect to available numbers page.
    history.push("/available-numbers");
  }

  if (props.action === "add" && numberSelected.hasOwnProperty("id") && numberSelected.id !== newId) {
    // Clean selected number before add new.
    dispatch(setAvailableNumber({}));
  }

  useEffect(() => {
    if (props.action === "add") {
      setNewFormValues({...newFormValues, "id": newId});
    }
  }, []);

  useEffect(() => {
    if (
      newFormValues.value &&
      newFormValues.monthlyPrice &&
      newFormValues.setupPrice &&
      newFormValues.currency
    ) {
      setSaveButtonDisabled(false);
    } else {
      setSaveButtonDisabled(true);
    }
  }, [newFormValues]);

  useEffect(() => {
    const count = availableNumbers.availableNumberListCount;
    let rows = availableNumbers.availableNumberList;

    rows.forEach(item => {
      if (item.id === numberSelected.id) {
        item.value = numberSelected.value;
        item.monthlyPrice = numberSelected.monthlyPrice;
        item.setupPrice = numberSelected.setupPrice;
        item.currency = numberSelected.currency;
      }
    });

    dispatch(updateAvailableNumber({"count": count, "rows": rows}));
  }, [numberSelected]);

  const saveNumber = (value, field) => {
    if (props.action === "edit") {
      dispatch(setAvailableNumber({
        "id": numberSelected.id,
        "value": field === "value" ? value : numberSelected.value,
        "monthlyPrice": field === "monthlyPrice" ? value : numberSelected.monthlyPrice,
        "setupPrice": field === "setupPrice" ? value : numberSelected.setupPrice,
        "currency": field === "currency" ? value : numberSelected.currency
      }));

      if (field === "value") {
        setNotificationVariant("warning");
        setNotificationText("Saving...");
        setTimeout(function() {
          setNotificationText("Number has been saved.")
          setNotificationVariant("success");
        }, 500);
      };
      if (field === "monthlyPrice") {
        setNotificationVariant("warning");
        setNotificationText("Saving...");
        setTimeout(function() {
          setNotificationText("Monthly Price has been saved.")
          setNotificationVariant("success");
        }, 500);
      };
      if (field === "setupPrice") {
        setNotificationVariant("warning");
        setNotificationText("Saving...");
        setTimeout(function() {
          setNotificationText("Setup Price has been saved.")
          setNotificationVariant("success");
        }, 500);
      };
      if (field === "currency") {
        setNotificationVariant("warning");
        setNotificationText("Saving...");
        setTimeout(function() {
          setNotificationText("Currency has been saved.")
          setNotificationVariant("success");
        }, 500);
      };
    } else {
      if (field === "value") setNewFormValues({...newFormValues, "value": value});
      if (field === "monthlyPrice") setNewFormValues({...newFormValues, "monthlyPrice": value});
      if (field === "setupPrice") setNewFormValues({...newFormValues, "setupPrice": value});
      if (field === "currency") setNewFormValues({...newFormValues, "currency": value});
    }
  }

  const saveNewNumber = () => {
    let count = availableNumbers.availableNumberListCount+1;
    let rows = availableNumbers.availableNumberList;
    rows.push(newFormValues);
    dispatch(addAvailableNumber({"count": count, "rows": rows}));
    setShowSaveConfirmation(true);
    setTimeout(function() {
      history.push("/available-numbers");
    }, 3000);
  }

  return (
    <MainLayout>
      <Row>
        <Col sm={12} md={8}>
          {
            props.action === "edit" ?
              (
                <h2>Editing Number #{numberSelected.id}</h2>
              )
            :
              (
                <h2>Adding New Number</h2>
              )
          }
        </Col>
        <Col sm={12} md={4}>
          {
            props.action === "edit" ?
              (
                <Alert variant={notificationVariant} className="mt-2">
                  <FontAwesomeIcon icon={faThumbsUp} /> {notificationText}
                </Alert>
              )
            :
              (
                <Button variant="success" size="lg" className="mt-2" onClick={() => saveNewNumber()} disabled={saveButtonDisabled} block>
                  <FontAwesomeIcon icon={faSave} /> Save Number
                </Button>
              )
          }
        </Col>
      </Row>
      <hr />
      <Form>
        <Form.Row>
          <Form.Group as={Col} sm={12} md={3} controlId="formValue">
            <Form.Label>Number *</Form.Label>
            <Form.Control type="text" size="lg" defaultValue={numberSelected.value} 
              onChange={(e) => saveNumber(e.target.value, "value")} required />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={3} controlId="formMonthlyPrice">
            <Form.Label>Monthly Price *</Form.Label>
            <Form.Control type="text" size="lg" defaultValue={numberSelected.monthlyPrice} 
              onChange={(e) => saveNumber(e.target.value, "monthlyPrice")} required />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={3} controlId="formSetupPrice">
            <Form.Label>Setup Price *</Form.Label>
            <Form.Control type="text" size="lg" defaultValue={numberSelected.setupPrice}
              onChange={(e) => saveNumber(e.target.value, "setupPrice")} required />
          </Form.Group>
          <Form.Group as={Col} sm={12} md={3} controlId="formCurrency">
            <Form.Label>Currency *</Form.Label>
            <Form.Control type="text" size="lg" defaultValue={numberSelected.currency}
              onChange={(e) => saveNumber(e.target.value, "currency")} required />
          </Form.Group>
        </Form.Row>
      </Form>

      <Toast
        style={{
          position: 'fixed',
          top: 50,
          right: 30,
        }}
        onClose={() => setShowSaveConfirmation(false)} 
        show={showSaveConfirmation} 
        delay={5000} 
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto"><FontAwesomeIcon icon={faInfoCircle} /> Number saved!</strong>
          <small>right now</small>
        </Toast.Header>
        <Toast.Body>The number was been saved successfully.</Toast.Body>
      </Toast>
    </MainLayout>
  );
}

export default EditNumber;