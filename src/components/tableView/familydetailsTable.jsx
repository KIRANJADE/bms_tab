import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Paper, TextField,
} from '@mui/material';
import EmptyState from "../../pages/common/EmptyState"

export default function FamilyDetailsTable(props) {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
	  {paginatedData?.length > 0 ? 
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
                Family Id
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Is member
              </TableCell>
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
                Level No
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
                Relation
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
			
            {paginatedData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.familyId}</TableCell>
                <TableCell>{row.isalreadymember ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.memberId ?? '-'}</TableCell>
                <TableCell>{row.levelNo}</TableCell>
                <TableCell>{row.profile?.firstname}</TableCell>
                <TableCell>{row.profile?.lastname}</TableCell>
                <TableCell>{row.profile?.phoneno}</TableCell>
                <TableCell>{row.relation}</TableCell>
                <TableCell>{row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
	: <EmptyState />  }
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
