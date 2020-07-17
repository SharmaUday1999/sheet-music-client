import React, { useState, useEffect } from "react";
import { ButtonGroup, Button} from "react-bootstrap";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams} from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import './css/Sheets.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Sheets() {
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
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="padding">
    <Document
        file = {`${url}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />    
      </Document>
      
      </div>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginBottom : '20vh'}}>
        <ButtonGroup>
            <Button className = "custom-btn" onClick={goToPrevPage}>Prev</Button>
            <Button className = "custom-btn" disabled>Page {pageNumber} of {numPages}</Button>
            <Button className = "custom-btn"onClick={goToNextPage}>Next</Button>
        </ButtonGroup>
    </div>
    </>
  );
}