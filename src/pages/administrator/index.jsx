import React from 'react'

import CustomizedTables from '../../components/tableView/administratorTable'; // Import the CustomizedTables component
const ordersData = [
  { memberId: '100/000/0156', lastname: 'ரா',firstname: 'சத்யரூபன்',  position: 'தலைவர்', phoneno:'9789453541' },
  { memberId: '100/000/0157', lastname: 'நா',firstname: 'சதாசிவம்',  position: 'துணைத்தலைவர்', phoneno:'9488073868' },
];
const index = () => {
  return (
    <div>
      <h1>Administrator List</h1>
      <CustomizedTables data={ordersData} />
    </div>
  )
}

export default index
