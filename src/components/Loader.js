import React from "react";
// get our fontawesome imports
import { faRedo } from "@fortawesome/free-solid-svg-icons";
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
      {isLoading && <FontAwesomeIcon icon={faRedo} className="fa-spin" />}
      {props.children}
    </div>
  );
}