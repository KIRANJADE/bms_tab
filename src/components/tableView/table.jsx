import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box
} from '@mui/material';

export default function OrdersTable({ data, headers,handleModalOpen }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', height: '450px', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ flex: 1, maxHeight: '450px', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '450px', overflow: 'auto' }}>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                {headers?.map((header) => (
                  <TableCell
                    key={header.key}
                    sx={{
                      backgroundColor: '#f5f5f5',
                      color: '#333333',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1000,
                    }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers?.map((header) => (
                    <TableCell key={header.key}>
                      {row[header.key] ? row[header.key] : 'N/A'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
