import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EmptyState from "../../pages/common/EmptyState";

export default function BalanceDetailsTable({ data }) {
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [popupTitle, setPopupTitle] = useState("");

  const handleOpenPopup = (key, label) => {
    let popupContent = [];

    if (key === "eventsFine" && data?.eventsFineData) {
      // Flatten event fine data into an array
      popupContent = Object.values(data.eventsFineData).flat();
    } else if (data?.[`${key}Data`]?.length) {
      popupContent = data[`${key}Data`];
    }

    if (popupContent.length) {
      setPopupData(popupContent);
      setPopupTitle(label);
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const tableData = [
    { label: "Chantha Balance", value: data?.chanthaBalance || "0", key: "chantha" },
    { label: "Death Balance", value: data?.deathBalance || "0", key: "death" },
    { label: "Committee Balance", value: data?.committeeBalance || "0", key: "committee" },
    { label: "Ledgers Balance", value: data?.ledgersBalance || "0", key: "ledgers" },
    { label: "Events Balance", value: data?.eventsBalance || "0", key: "events" },
    { label: "Events Fine Balance", value: data?.eventsFineBalance || "0", key: "eventsFine" },
  ];

  // Function to dynamically map popup table headers
  const getTableHeaders = () => {
    if (!popupData.length) return [];

    const keys = Object.keys(popupData[0]);
    return keys.map((key) => (
      <TableCell key={key}>{key.replace(/([A-Z])/g, " $1").trim()}</TableCell>
    ));
  };

  return (
    <Paper style={{ width: "100%" }}>
      {tableData.length > 0 ? (
        <TableContainer>
          <Table style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Balance Type</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.label}>
                  <TableCell>{row.label}</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenPopup(row.key, row.label);
                      }}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {row.value}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState />
      )}

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{popupTitle} Details</DialogTitle>
        <DialogContent>
          {popupData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>{getTableHeaders()}</TableRow>
              </TableHead>
              <TableBody>
                {popupData.map((item, index) => (
                  <TableRow key={index}>
                    {Object.values(item).map((val, i) => (
                      <TableCell key={i}>{val || "N/A"}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No Data Available</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
