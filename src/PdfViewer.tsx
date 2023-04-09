/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import download from "./assets/img/download-2.png";
import open from "./assets/img/in-new-tab-icon-256x256-vppv6anb.png";

const data: any[] = [
  {
    id: 1,
    first_name: "Justin",
    last_name: "Roome",
    pdf: "SamplePDF.pdf",
  },
  {
    id: 2,
    first_name: "Sigmund",
    last_name: "Freud",
    pdf: "SamplePDF.pdf",
  },
  {
    id: 3,
    first_name: "Harry",
    last_name: "Potter",
    pdf: "SamplePDF.pdf",
  },
  {
    id: 4,
    first_name: "Darth",
    last_name: "Maul",
    pdf: "SamplePDF.pdf",
  },
  {
    id: 5,
    first_name: "Frodo",
    last_name: "Baggins",
    pdf: "SamplePDF.pdf",
  },
];

export default function PdfViewer() {
  const onButtonClick = () => {
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "SamplePDF.pdf";
        alink.click();
      });
    });
  };
  const onButtonViewClick = () => {
    fetch("SamplePDF.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.target = "_blank";
        alink.rel = "noreferrer";
        alink.click();
      });
    });
  };
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [expandState, setExpandState] = useState<any>({});

  const handleEpandRow = (event: any, userId: number) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(userId);

    let obj = {} as any;
    isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    setExpandState(obj);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== userId)
      : currentExpandedRows.concat(userId);

    setExpandedRows(newExpandedRows);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1> File Viewer</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Table responsive variant="dark" className="expandableRow">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <>
                  <tr key={user.id}>
                    <td>{user["first_name"]}</td>
                    <td>{user["last_name"]}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={(event) => handleEpandRow(event, user.id)}
                      >
                        {expandState[user.id] ? "Hide" : "Show"}
                      </Button>
                    </td>
                  </tr>
                  <>
                    {expandedRows.includes(user.id) ? (
                      <tr>
                        <td colSpan={6}>
                          <ul>
                            <span>
                              <b>File:</b>
                            </span>{" "}
                            <span>{user.pdf} </span>{" "}
                            <img
                              className="openImageButton"
                              onClick={onButtonClick}
                              src={download}
                            ></img>{" "}
                            <img
                              className="openImageButton"
                              onClick={onButtonViewClick}
                              src={open}
                            ></img>
                          </ul>
                        </td>
                      </tr>
                    ) : null}
                  </>
                </>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
