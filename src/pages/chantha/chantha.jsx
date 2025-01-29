// ParentComponent.js

import CustomizedTables from '../../components/tableView/table'; // Import the CustomizedTables component

// Parent component data
const ordersData = [
  { id: '#1002', date: '11 Feb, 2024', customer: 'Wade Warren', payment: 'Pending', total: '$20.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
  { id: '#1004', date: '13 Feb, 2024', customer: 'Esther Howard', payment: 'Success', total: '$22.00', delivery: 'N/A', items: '3 items', fulfillment: 'Fulfilled' },
  { id: '#1007', date: '15 Feb, 2024', customer: 'Jenny Wilson', payment: 'Pending', total: '$25.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
  { id: '#1009', date: '17 Feb, 2024', customer: 'Guy Hawkins', payment: 'Success', total: '$27.00', delivery: 'N/A', items: '5 items', fulfillment: 'Fulfilled' },
  { id: '#1011', date: '18 Feb, 2024', customer: 'Jacob Jonas', payment: 'Pending', total: '$32.00', delivery: 'N/A', items: '4 items', fulfillment: 'Unfulfilled' },
  { id: '#1013', date: '21 Feb, 2024', customer: 'Kristin Watson', payment: 'Success', total: '$25.00', delivery: 'N/A', items: '3 items', fulfillment: 'Fulfilled' },
  { id: '#1015', date: '23 Feb, 2024', customer: 'Albert Flores', payment: 'Pending', total: '$28.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
  { id: '#1018', date: '25 Feb, 2024', customer: 'Eleanor Pena', payment: 'Success', total: '$35.00', delivery: 'N/A', items: '2 items', fulfillment: 'Fulfilled' },
  { id: '#1019', date: '27 Feb, 2024', customer: 'Theresa Webb', payment: 'Pending', total: '$20.00', delivery: 'N/A', items: '2 items', fulfillment: 'Unfulfilled' },
];

const ParentComponent = () => {
  return (
    <div>
      <h4>Data Table</h4>
      {/* <CustomizedTables data={ordersData} /> */}
    </div>
  );
};

export default ParentComponent;
