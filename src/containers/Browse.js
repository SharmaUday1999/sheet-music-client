import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Browse() {

  const StyledH1 = styled.h1`

  font-family: "Open Sans", sans-serif;
  font-weight: 100;
  padding: 10px;
  color: #745A44 !important;    

  &:after {
    content:' ';
    display:block;
    border:1px solid #E6BEAE;
    border-radius:1px;
    -webkit-border-radius:1px;
    -moz-border-radius:1px;
    box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
    -webkit-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
    -moz-box-shadow:inset 0 1px 1px rgba(0, 0, 0, .05);
  `;
  const StyledTableHeader = styled.th`
  color: #745A44 !important;  
  font-weight:300;
`;
  const CenteredDiv = styled.div`
    text-align: center;
  `;


  const [sheets, setSheets] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const sheets = await loadSheets();
        setSheets(sheets);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadSheets() {
    return API.get('sheet-music-api','/sheet_music_files');
  }

  function renderSheetsList(sheets) {
    return sheets.map((sheet, i) =>
      <LinkContainer key={sheet.sheetId} to={`/sheet_music_files/${sheet.sheetId}`}>
      <tr>
        <td>
          {sheet.title.trim().split("\n")[0]}
        </td>
        <td>
          {sheet.composer.trim().split("\n")[0]}
        </td>
        <td>
          {sheet.publisher.trim().split("\n")[0]}
        </td>
      </tr>
    </LinkContainer>);
  }

  function renderSheetMusic() {
    return (
      <>
        <StyledH1>All Music</StyledH1>
        <Table striped borderless hover>
          <thead>
            <tr>
              <StyledTableHeader>Title</StyledTableHeader>
              <StyledTableHeader>Composer</StyledTableHeader>
              <StyledTableHeader>Publisher</StyledTableHeader>
            </tr>
          </thead>

          <tbody>
          {isLoading ? 
          <CenteredDiv>
          <FontAwesomeIcon icon={faRedo} className="fa-spin" /></CenteredDiv>: renderSheetsList(sheets)}
          </tbody>
        </Table>
      </>
    );
  }



  return (
    <div className="Home container">
      {isAuthenticated ? renderSheetMusic() : null}
    </div>
  );
}
