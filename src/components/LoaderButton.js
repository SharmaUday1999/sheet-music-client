import React from "react";
import { Button } from "react-bootstrap";
// get our fontawesome imports
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

export default function LoaderButton({

  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  const StyledLoaderButton = styled(Button)`
    background-color: #B2967D !important;
    color: #fff !important;
    border: 0px solid #ECF8F8 !important;
    padding: 5px 10px !important;
    text-transform: uppercase;

    &:hover {
      background-color: #ECF8F8 !important;
      color: #B2967D !important;
      border: 0px solid #ECF8F8 !important;
      padding: 5px 10px !important;
      text-transform: uppercase;
    }
  `;

  return (
    <StyledLoaderButton
      disabled={disabled || isLoading}
      {...props}
    >
    
      {isLoading && <FontAwesomeIcon icon={faRedo} className="fa-spin" />}
      {props.children}
    </StyledLoaderButton>
  );
}