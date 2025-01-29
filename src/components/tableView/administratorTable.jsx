import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Paper, TextField,
} from '@mui/material';

export default function AdministratorTable(props) {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle filtering logic
  const filteredData = props?.data?.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(filter.toLowerCase())
    )
  ) || [];

  // Pagination logic
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
    {props?.search === true &&  <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Member Id
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Phone No
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Position
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.memberdetails.memberId}</TableCell>
                <TableCell>{row.profile.firstname}</TableCell>
                <TableCell>{row.profile.lastname}</TableCell>
                <TableCell>{row.profile.phoneno}</TableCell>
                <TableCell>{row.position}</TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
