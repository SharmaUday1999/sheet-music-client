import React from "react";
// get our fontawesome imports
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Loader.css";

export default function Loader({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FontAwesomeIcon icon={faHome} className="spinning" />}
      {props.children}
    </div>
  );
}