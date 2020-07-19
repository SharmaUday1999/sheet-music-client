import React, { useState, useEffect } from "react";
import { ListGroup, Container, Col, Row } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { Jumbotron } from '../components/Jumbotron';
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { faMusic, faFingerprint, faGuitar , faRedo} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

export default function Home() {
  const StyledContainer = styled(Container)`
    padding-bottom: 50px;
  `;
  const CenteredDiv = styled.div`
    text-align: center;
  `;
  const StyledH1 = styled.h1`
    font-family: "Open Sans", sans-serif;
    font-weight: 100;
  `;
  const StyledH1onlyColor = styled(StyledH1)`
    color: #745A44 !important;    
  
  `;
  const StyledPageTitle = styled(StyledH1)`

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
  }
  `;
  const StyledFontAwsome = styled(FontAwesomeIcon)`
    font-size: 60px; 
    font-weight: 300;
    padding-bottom: 10px; 
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
          <ListGroup.Item action>
            {sheet.title.trim().split("\n")[0]}
          </ListGroup.Item>
        </LinkContainer>
       );
  }

  function renderLander() {
    return (
      <>
      <Jumbotron/>
      <StyledContainer>
        <CenteredDiv>
          <StyledH1onlyColor>Why Bao Bass?</StyledH1onlyColor>
        </CenteredDiv>
        <Row style={{paddingTop:"50px"}} >
          <Col style={{textAlign:"center"}}>
            <StyledFontAwsome icon={faMusic} color="#B2967D"/>
            <p>Sheet music you actually WANT to play</p>
          </Col>
          <Col style={{textAlign:"center"}}>
            <StyledFontAwsome icon={faFingerprint} color="#B2967D"/>
            <p>Some other text</p>
          </Col>
          <Col style={{textAlign:"center"}}>
            <StyledFontAwsome icon={faGuitar} color="#B2967D"/>
            <p>Some other text</p>
          </Col>
        </Row>
      </StyledContainer>
      </>
    );
  }

  function renderSheetMusic() {
    return (
      <>
      <Jumbotron/>
      <div className="sheets container">
        <StyledPageTitle>Browse Music</StyledPageTitle>
        <ListGroup style={{paddingBottom:"30px"}}>
          {isLoading ? 
          <div style={{textAlign:"center"}}>
          <FontAwesomeIcon icon={faRedo} className="fa-spin" /></div>: renderSheetsList(sheets)}
        </ListGroup>
      </div>
      </>
    );
  }

  return (
    <>
      {isAuthenticated ? renderSheetMusic() : renderLander()}
    </>
  );
}