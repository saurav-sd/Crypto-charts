import React, { useState, useEffect, useCallback } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import Papa from "papaparse";
import dataFile from "./gemini_BTCUSD_2020_1min.csv";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import './style.css'

const Charts = () => {
  const [selectedColumn, setSelectedColumn] = useState("#Open");
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      Papa.parse(dataFile, {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data);
          // console.log("data : ", result.data);
        },
      });
    };

    fetchData();
  }, []);

  const handleColumnChange = useCallback((e) => {
    setSelectedColumn(e.target.value);
  }, []);

  console.log("select column", setSelectedColumn);

  const handleChange = (event, newAlignment) => {
    setChartType(newAlignment.toLowerCase());
  };

  return (
    <Box className="container">
      <Typography variant="h5" className="title">
        Time series data visualization
      </Typography>
      <Box className="chartContainer">
        <Box className="chartWrapper">
          <Box className="chartControls">
            <Box className="selectContainer">
              <FormControl>
                <Select
                  value={selectedColumn}
                  onChange={handleColumnChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select column" }}
                  size="small"
                  className="selectInput"
                >
                  <MenuItem value="#Open">Open</MenuItem>
                  <MenuItem value="#High">High</MenuItem>
                  <MenuItem value="#Low">Low</MenuItem>
                  <MenuItem value="#Close">Close</MenuItem>
                  <MenuItem value="#Volume">Volume</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="toggleButtonContainer">
              <ToggleButtonGroup
                color="primary"
                exclusive
                size="small"
                value={chartType}
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton
                  value="line"
                  className="toggleButton"
                >
                  Line
                </ToggleButton>
                <ToggleButton
                  value="Bar"
                  className="toggleButton"
                >
                  Bar
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box className="chart">
            {chartType === "line" ? (
              <LineChart data={data} selectedColumn={selectedColumn} />
            ) : (
              <BarChart data={data} selectedColumn={selectedColumn} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Charts;
