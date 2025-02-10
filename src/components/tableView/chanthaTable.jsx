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
              Chantha Id
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
              Status
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
              <TableCell>{row?.chanthaId}</TableCell>
              <TableCell>{row?.chanthaamount}</TableCell>
              <TableCell>{row?.effectiveDate}</TableCell>
              <TableCell>{row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : ''}</TableCell>
              <TableCell>
                <IconButton 
                  color="primary" 
                  onClick={() => onEdit(row)} 
                  disabled={row?.status !== "active"}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  color="secondary" 
                  onClick={() => onDelete(row)} 
                  disabled={row?.status !== "active"}
                >
                  <Delete />
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
