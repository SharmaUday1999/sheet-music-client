import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./css/Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";


export default function Browse() {
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
          <ListGroupItem header={sheet.title.trim().split("\n")[0]}>
          </ListGroupItem>
        </LinkContainer>);
  }

  function renderSheetMusic() {
    return (
      <div className="sheets">
        <PageHeader><h1>All Music</h1></PageHeader>
        <ListGroup>{isLoading ? 
          <div className="center ">
          <Loader
            
            isLoading={isLoading}
            >
              
          </Loader></div>: renderSheetsList(sheets)}
        </ListGroup>
      </div>
    );
  }



  return (
    <div className="Home container">
      {isAuthenticated ? renderSheetMusic() : null}
    </div>
  );
}
