import React from "react";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function NotFound() {
  const history = useHistory();
  
  return (
    <MainLayout>
      <h4 className="pb-2">Whoops... The page you've been looking for doesn't exists.</h4>
      <Button 
        variant="primary" 
        size="lg" 
        className="m-1" 
        onClick={() => history.push("/")}
      >
        <FontAwesomeIcon icon={faHome} /> Take me back to home
      </Button>
    </MainLayout>
  );
}

export default NotFound;