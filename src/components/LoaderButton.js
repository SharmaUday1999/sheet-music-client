import React from "react";
import { Button } from "react-bootstrap";
// get our fontawesome imports
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton btn ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
    
      {isLoading && <FontAwesomeIcon icon={faRedo} className="fa-spin" />}
      {props.children}
    </Button>
  );
}