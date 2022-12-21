import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';

function createData(token, percent) {
  return { token, percent };
}

const rows = [
  createData('Seed', '4.00%'),
  createData('Private', '12.00%'),
  createData('Marketing & Development', '5.00%'),
  createData('Liquidity Fund', '5.00%'),
  createData('Ecosystem Fund', '2.00%'),
  createData('Insurance & Reserve', '3.00%'),
  createData('Team', '10.00%'),
  createData('Advisory', '5.00%'),
  createData('Mining Pool', '10.00%'),
  createData('Guild Adoption', '5.00%'),
  createData('IDO', '1.00%'),
  createData('CGF (Community Growth Fund)', '10.00%'),
  createData('Game Fund', '18.00%'),
  createData('Governance', '10.00%'),
  createData('Total', '100.00%'),
];


const CustomTableContainer = styled(TableContainer)(() => ({
  background: "transparent",
  backgroundImage: "url(/images/home/bg-table.png)",
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  "& thead tr": {
    color: "white",
    textAlign: "center",
    fontSize: '1rem',
    border: '2px solid transparent',
    borderRadius: '10px',
  },
  "& thead tr th:first-of-type": {
    borderTopLeftRadius: '8px',
    borderRight: ' 1px solid #D8A0FE',
  },
  "& thead tr th:last-of-type": {
    borderTopRightRadius: '8px',
  },
  "& tbody th, td": {
    border: '0',
    textAlign: "left",
    color: "white",
    padding: '0.25rem',
    paddingLeft: '10%',
  },
  "& tbody tr:first-of-type td": {
    paddingTop: '2rem'
  },
  "& tbody tr:last-of-type td": {
    paddingBottom: '2rem'
  },
  "& tbody tr td:first-of-type": {
    borderRight: '1px solid #D8A0FE',
  },
}))


export default function TokenTable() {

  return (
    <CustomTableContainer>
      <Table sx={{
        background: "transparent!important",
      }} aria-label="simple table">
        <TableHead sx={{
          background:
            "linear-gradient(90deg, #937EF3 0%, #EACCF8 50%, #96E0DA 100%)",
        }}>
          <TableRow>
            <TableCell sx={{ color: "white", textAlign: "center", fontSize: '1rem' }}>Token Allocation</TableCell>
            <TableCell sx={{ color: "white", textAlign: "center", fontSize: '1rem' }} align="right">% of Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.token}
            >
              <TableCell>
                {row.token}
              </TableCell>
              <TableCell>{row.percent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
