import React from "react";
import { Glyphicon } from "react-bootstrap";
import "./Loader.css";

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
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </div>
  );
}