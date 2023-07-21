import { Box, Button, Grid, Stack, TextField, Typography, styled } from "@mui/material";
import { IconLineDashed } from "@tabler/icons";
import { GradientButton, GradientLoadingButton } from "components/common/CustomButton";
import CustomTable from "components/common/CustomTable";
import { useState } from "react";
import { fAddress, fDateTime } from "utils/format";
const TableBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(0deg, rgba(104, 229, 184, 0.20) 0%, rgba(109, 133, 218, 0.20) 100%)',
  borderRadius: '15px',
  padding: '24px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    background: 'linear-gradient(180deg, rgb(66,238,207,0.5) , rgb(0,197,211,0.5) )',
    borderRadius: '15px',
    inset: '0px',
    padding: '1px',
    WebkitMask:
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    WebkitMaskComposite: 'xor',
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',

  },
}))
const ClaimBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',

  },
}))
const TypographyShadow = styled(Typography)(({ theme }) => ({
  color: 'white',
  textShadow: '0 0 10px rgb(255,255,255,0.7)',
}))


let config = [
  {
    key: 'creationDate',
    label: 'Time',
    render: (e) => fDateTime(e.creationDate)
  },
  {
    key: 'type',
    label: 'Type',
  },
  {
    key: 'amount',
    label: 'Price',
    render: (e) =>
      e.amount ? <> </> : <IconLineDashed color='gray' />
  },
  {
    key: 'terms',
    label: 'Selected Terms',
    render: (e) => e.fromAddress ? fAddress(e.fromAddress) : <IconLineDashed color='gray' />
  },
  {
    key: 'enTime',
    label: 'End Time',
    render: (e) => e.toAddress ? fAddress(e.toAddress) : <IconLineDashed color='gray' />
  },
  {
    key: 'status',
    label: '',
    render: (e) => e.status ? <GradientButton>Unstake Now </GradientButton> : <GradientButton>Unstaked</GradientButton>
  },
];

export default function StakingTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);

  return (
    <Stack gap={3}>
      <TableBox>
        <CustomTable
          data={data}
          config={config}
          loading={!data}
          page={0}
          setPage={(e) => setPage(e)}
        />
      </TableBox>
      <TableBox>
        <ClaimBox>
          <TypographyShadow variant="h6"> Claim available amount: </TypographyShadow>
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            <TypographyShadow variant="h4"> 12,000 XUI </TypographyShadow>
            <GradientButton>Claim</GradientButton>
          </Stack>
        </ClaimBox>
      </TableBox>
      <TableBox>
        <CustomTable
          data={data}
          config={config}
          loading={!data}
          page={0}
          setPage={(e) => setPage(e)}
        />
      </TableBox>
    </Stack>
  );
}