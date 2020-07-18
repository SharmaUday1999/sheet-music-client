import React, { useState, useEffect } from "react";
import { ListGroup, Container, Col, Row , Card} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./css/Home.css";
import { Jumbotron } from '../components/Jumbotron';
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import { faMusic, faFingerprint, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
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
      <Container style={{paddingBottom:"50px"}}>
        <div style={{textAlign:"center"}}>
          <h1 className="sans-font">Why Bao Bass?</h1>
        </div>
        <Row style={{paddingTop:"50px"}} >
          <Col style={{textAlign:"center"}}>
            <FontAwesomeIcon style={{fontSize:"60px", fontWeight:"300", paddingBottom:"10px"}} icon={faMusic} color="#B2967D"/>
            <p>Sheet music you actually WANT to play</p>
          </Col>
          <Col style={{textAlign:"center"}}>
            <FontAwesomeIcon style={{fontSize:"60px", fontWeight:"300", paddingBottom:"10px"}} icon={faFingerprint} color="#B2967D"/>
            <p>Some other text</p>
          </Col>
          <Col style={{textAlign:"center"}}>
            <FontAwesomeIcon style={{fontSize:"60px", fontWeight:"300", paddingBottom:"10px"}}  icon={faGuitar} color="#B2967D"/>
            <p>Some other text</p>
          </Col>
        </Row>
      </Container>
      </>
    );
  }

  function renderSheetMusic() {
    return (
      <>
      <Jumbotron/>
      <div className="sheets container">
        <h1 className="h1">Browse Music</h1>
        <ListGroup className="padding_listgroup">
          {isLoading ? 
          <div className="center ">
          <Loader
            
            isLoading={isLoading}
            >
              
          </Loader></div>: renderSheetsList(sheets)}
        </ListGroup>
      </div>
      </>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderSheetMusic() : renderLander()}
    </div>
  );
}