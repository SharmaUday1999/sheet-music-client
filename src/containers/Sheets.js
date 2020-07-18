import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Container, Col, ListGroup, Row} from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import './css/Sheets.css';
import Loader from "../components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Sheets() {
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
      {loading ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="padding">
                  <Loader isLoading = {loading}>
                    </Loader>
                </div> : 
      <>
      <Row>
        <Col sm={8}>
          <h1 className="h1">{sheetTitle}</h1>
        </Col>
        
      </Row>
      <Row>
        <Col sm={8}>

          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="padding">
          <Document
              file = {`${sheetUrl}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />    
            </Document>
            
            </div>
        </Col>
        <Col sm={4}>
          <div className="position_menu">
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
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom : '20vh'}}>
              <ButtonGroup>
                  <Button className = "custom-btn" onClick={goToPrevPage}>Prev</Button>
                  <Button className = "custom-btn" disabled>Page {pageNumber} of {numPages}</Button>
                  <Button className = "custom-btn"onClick={goToNextPage}>Next</Button>
              </ButtonGroup>
          </div>
        </Col>
      </Row>
      </>}
    </Container>
  );
}