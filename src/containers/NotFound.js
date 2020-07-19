import React from "react";
import styled from 'styled-components';

export default function NotFound() {
  const notFound = styled.div`
    padding-top: 100px;
    text-align: center;
  `;

  return (
    <notFound>
      <h3>Sorry, page not found!</h3>
    </notFound>
  );
}