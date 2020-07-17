import React, { useRef, useState, useEffect } from "react";
import { Grid , ButtonGroup, Button} from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { render } from "@testing-library/react";
var AWS = require('aws-sdk');
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Sheets() {
  const file = useRef(null);
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
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
        const url = await loadSheet();
        setUrl(url);
                
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  return(
    <>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
    <Document
        file = {`${url}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />    
      </Document>
      
      </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom : '20vh'}}>
        <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={goToPrevPage}>Prev</Button>
            <div class="btn btn-static">Page {pageNumber} of {numPages}</div>
            <Button variant="secondary" onClick={goToNextPage}>Next</Button>
        </ButtonGroup>
    </div>
    </>
  );
}