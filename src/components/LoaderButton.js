import React from "react";
import { Button } from "react-bootstrap";
// get our fontawesome imports
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
      className={`LoaderButton ${className}`}
      style={{backgroundColor:'#4C6663',color:'white'}}
      disabled={disabled || isLoading}
      {...props}
    >
    
      {isLoading && <FontAwesomeIcon icon={faHome} className="spinning" />}
      {props.children}
    </Button>
  );
}