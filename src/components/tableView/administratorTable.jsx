import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Paper, Chip,
} from '@mui/material';



export default function administratorTable(props) {
  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // eslint-disable-next-line react/prop-types
  const filteredData = props?.data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filter)
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5', // Light grey background
                  color: '#333333', // Dark text color
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
                Position
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#f5f5f5',
                  color: '#333333',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Phone No.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.memberId}>
                <TableCell>{row.memberId}</TableCell>
                <TableCell>{row.lastname}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.position}</TableCell>
                <TableCell>{row.phoneno}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Paper>
  );
}
