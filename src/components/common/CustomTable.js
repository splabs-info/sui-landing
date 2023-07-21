import {
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconLineDashed } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const CardStyle = styled(Card)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  width: '100%',
  '& th.MuiTableCell-root': {
    fontWeight: 700,
    fontSize: '1rem',
    borderBottom: '2px solid rgb(255,255,255,0.2)',
    color: 'white',
    fontFamily: 'SVN-Gilroy-semi-bold',
  },
  '& td.MuiTableCell-root': {
    color: 'white',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  },
}));

CustomTable.propTypes = {
  data: PropTypes.object,
  config: PropTypes.array,
  loading: PropTypes.bool,
};

export default function CustomTable({
  data,
  config,
  loading = false,
  page = 0,
  setPage,
  pageSize = 10,
  setPageSize,
  sx
}) {

  const [sortOrderASC, setSortOrderASC] = useState(true)
  const [dataSort, setDataSort] = useState([])
  useEffect(() => {
    if (page === 0)
      setDataSort(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSortColumn = (id) => {
    setSortOrderASC(!sortOrderASC)
    setDataSort(data => sortOrderASC ? data.sort((a, b) => a[id] - b[id])
      : data.sort((a, b) => b[id] - a[id]))
  }

  return (
    <CardStyle sx={sx} >
      <TableContainer sx={{ background: 'transparent' }}>
        <Table
          sx={{ background: 'transparent!important' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {config.map((tableHead, index) => (
                <TableCell key={index} align={tableHead.align} onClick={() => handleSortColumn(tableHead.key)}
                  sx={{ cursor: page === 0 && 'pointer', }}>
                  {page === 0 && tableHead.label !== '' ? <Tooltip title='Sort by' >
                    <p>
                      {tableHead.label} &#10607;
                    </p>
                  </Tooltip>
                    : tableHead.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {page !== 0 && data?.items ? (
            <TableBody
              sx={{
                '& tr:last-of-type td': {
                  borderBottom: !page && 'none',
                },
              }}
            >
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={config.length + 1}
                    sx={{ textAlign: 'center', height: 200 }}
                  >
                    <CircularProgress color="inherit" />
                  </TableCell>
                </TableRow>
              ) : <>
                {data &&
                  data?.items?.length !== 0 &&
                  data?.items.map((item, index) => (
                    <TableRow hover key={index}>
                      <TableCell>
                        #{index + 1 + (page - 1) * pageSize}
                      </TableCell>
                      {config.map((tableBody, i) => (
                        <TableCell key={i} sx={{ whiteSpace: 'nowrap' }} >
                          {
                            tableBody.render
                              ? tableBody.render(item) ? tableBody.render(item) : <IconLineDashed color='gray' />
                              : item[tableBody.key] ? item[tableBody.key] : <IconLineDashed color='gray' />
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {data && data?.items?.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={config.length + 1}
                      sx={{ textAlign: 'center', height: 100 }}
                    >
                      <Typography variant="body1">
                        No records found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
              }
            </TableBody>
          ) : (
            <TableBody
              sx={{
                '& tr:last-of-type td': {
                  borderBottom: !page && 'none',
                },
              }}
            > {loading ? (
              <TableRow>
                <TableCell
                  colSpan={config.length + 1}
                  sx={{ textAlign: 'center', height: 200 }}
                >
                  <CircularProgress color="inherit" />
                </TableCell>
              </TableRow>
            ) : <>
              {data &&
                data?.length !== 0 &&
                dataSort?.map((item, index) => (
                  <TableRow hover key={index}>
                    <TableCell>#{index + 1}</TableCell>
                    {config.map((tableBody, i) => (
                      <TableCell key={i} sx={{ whiteSpace: 'nowrap' }}>
                        {tableBody.render
                          ? tableBody.render(item)
                          : item[tableBody.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={config.length + 1}
                    sx={{ textAlign: 'center', height: 100 }}
                  >
                    <Typography variant="body1">
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </>}
            </TableBody>
          )}
        </Table>
        {data && page !== 0 && data.items.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={data?.itemCount ? data?.itemCount : 0}
            rowsPerPage={pageSize}
            page={page - 1}
            onPageChange={(e, newPage) => {
              setPage(newPage + 1);
            }}
            onRowsPerPageChange={(e) => setPageSize(e.target.value)}
            sx={{
              color: 'white',
              '& .MuiTablePagination-select': {
                alignItems: 'center',
              },
            }}
          />
        )}
      </TableContainer>
    </CardStyle>
  );
}
