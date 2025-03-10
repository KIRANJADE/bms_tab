import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Paper, TextField, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EmptyState from '../../pages/common/EmptyState';
import FamilyDetailPopup from '../familyDetailPopup/addForm';

export default function FamilyDetailsTable(props) {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [popupData, setPopupData] = useState(null); // State to hold data for the popup
  const [openPopup, setOpenPopup] = useState(false); // State to control popup visibility

  const onEdit = (row) => {
    setPopupData(row); // Set the data for the popup
    setOpenPopup(true); // Open the popup
  };

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

  const onView = (id) => {
    console.log('View ID:', id);
  };

  return (
    <Paper style={{ width: "100%" }}>
      {openPopup && (
        <FamilyDetailPopup
          open={openPopup}
          onClose={() => setOpenPopup(false)} // Close the popup
          userDetails={popupData} // Pass the data to the popup
          isEdit={true}
        />
      )}
      {props?.search && (
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      {paginatedData.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['Family Id','Sub Level No', 'Is member', 'Member Id', 'Level No', 'First Name', 'Last Name',  'Relation', 'Status', 'Actions'].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        color: '#333333',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.familyId}</TableCell>
                    <TableCell>{row.subLevelNo ?? '-'}</TableCell>
                    <TableCell>{row.isalreadymember ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.memberId ?? '-'}</TableCell>
                    <TableCell>{row.levelNo}</TableCell>
                    <TableCell>{row.profile?.firstname ?? '-'}</TableCell>
                    <TableCell>{row.profile?.lastname ?? '-'}</TableCell>
                   
                    <TableCell>{row.relation ?? '-'}</TableCell>
                    <TableCell>
                      {row.status
                        ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(row)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => onView(row?._id)}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
        </>
      ) : (
        <EmptyState />
      )}
    </Paper>
  );
}
