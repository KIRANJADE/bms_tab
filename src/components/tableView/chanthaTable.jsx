import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const chanthaTable = ({ data, onEdit, onDelete }) => {
  useEffect(() => {
    console.log(data, "miimiim");
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "white" }}>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#333333",
                fontWeight: "bold",
                fontSize: "14px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
              }}
            >
              Chantha Amount
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#333333",
                fontWeight: "bold",
                fontSize: "14px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
              }}
            >
              Effective Date
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#333333",
                fontWeight: "bold",
                fontSize: "14px",
                position: "sticky",
                top: 0,
                zIndex: 1000,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row?.chanthaamount}</TableCell>
              <TableCell>{row?.effectiveDate}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Edit onClick={() => onEdit(row)} />
                </IconButton>
                <IconButton color="secondary">
                  <Delete onClick={() => onDelete(row)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default chanthaTable;
