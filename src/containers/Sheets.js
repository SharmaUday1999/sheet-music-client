import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Container, Col, ListGroup, Row} from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Sheets() {
  const CenteredDiv = styled.div`
    display: flex;
    justify-content: center;
    alignItems: center;
    padding-top: 10px;
    padding-bottom: 10px;
  `;
  const StyledDocument = styled(Document)`
    width: 658px; 
    height: 866px;
  `;
  const SheetTitle = styled.h1`
  
    font-family: "Open Sans", sans-serif;
    font-weight: 200;
    color: #B2967D;
    padding-top: 2vh;
    padding-bottom: 2vh;
  `;
  const StyledButtonGroup = styled(Button)`
    background: #ECF8F8 !important;
    color: #B2967D !important;
    border: 0px solid #ECF8F8 !important;
    padding: 5px 10px !important;
    text-transform: uppercase;

    &:hover {

      background: #B2967D !important;
      color: #ECF8F8 !important;
      border: 0px solid #ECF8F8 !important;
      padding: 5px 10px !important;
      text-transform: uppercase;
    }
  `;


  const { id } = useParams();
  const [sheetUrl, setSheetUrl] = useState(null);
  const [sheetTitle, setSheetTitle] = useState(null);
  const [sheetComposer, setSheetComposer] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  var [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToNextPage(){
    if (pageNumber < numPages){
        setPageNumber(pageNumber+1);
    }
  }

  function goToPrevPage(){
    if (pageNumber > 1){
        setPageNumber(pageNumber-1);
    }
  }

  useEffect(() => {
    function loadSheet() {
      return API.get('sheet-music-api',`/sheet_music_files/${id}`);
    }

    async function onLoad() {
      try {
        const object = await loadSheet();
        setSheetUrl(object.url);
        setSheetTitle(object.title);
        setSheetComposer(object.composer);
        setLoading(false);
                
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  return(
    <Container>
      {loading ? <CenteredDiv>
        <FontAwesomeIcon icon={faRedo} className="fa-spin" />
                </CenteredDiv> : 
      <>
      <Row>
        <Col sm={8}>
          <SheetTitle>{sheetTitle}</SheetTitle>
        </Col>
        
      </Row>
      <Row>
        <Col sm={8}>

          <CenteredDiv>
          <StyledDocument
              file = {`${sheetUrl}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />    
            </StyledDocument>
            
            </CenteredDiv>
        </Col>
        <Col sm={4}>
          <div className="d-none d-md-block" style={{paddingTop: "300px"}}>
            <ListGroup>
              <ListGroup.Item>Composer: {sheetComposer}</ListGroup.Item>
              <ListGroup.Item>Difficulty: null</ListGroup.Item>
              <ListGroup.Item>Instrument: null</ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <CenteredDiv style={{marginBottom:"20vh", textAlign:"center"}}>
              <ButtonGroup>
                  <StyledButtonGroup onClick={goToPrevPage}>Prev</StyledButtonGroup>
                  <StyledButtonGroup disabled>Page {pageNumber} of {numPages}</StyledButtonGroup>
                  <StyledButtonGroup onClick={goToNextPage}>Next</StyledButtonGroup>
              </ButtonGroup>
          </CenteredDiv>
        </Col>
      </Row>
      </>}
    </Container>
  );
}