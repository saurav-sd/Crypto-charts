import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Papa from 'papaparse';
import dataFile from './gemini_BTCUSD_2020_1min.csv';

const Charts = () => {
  const [selectedColumn, setSelectedColumn] = useState('#Open');
  const [chartType, setChartType] = useState('line');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      Papa.parse(dataFile, {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data);
          console.log("data : ", result.data);
        }
      });
    };

    fetchData();
  }, []);

  const handleColumnChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Select Column:</Form.Label>
            <Form.Control as="select" onChange={handleColumnChange} value={selectedColumn}>
              <option>#Open</option>
              <option>#High</option>
              <option>#Low</option>
              <option>#Close</option>
              <option>#Volume</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Chart Type:</Form.Label>
            <Form.Control as="select" onChange={handleChartTypeChange} value={chartType}>
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {chartType === 'line' ? (
            <LineChart data={data} selectedColumn={selectedColumn} />
          ) : (
            <BarChart data={data} selectedColumn={selectedColumn} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Charts;
