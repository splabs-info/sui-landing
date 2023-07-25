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
import React, { useState } from 'react';
import { GradientButton } from 'components/common/CustomButton';
import { TransactionBlock } from '@mysten/sui.js';
import { CLOCK, STAKING_STORAGE, STAKING_PACKAGE_UPGRADE } from 'onchain/constants';
import { useWallet } from '@suiet/wallet-kit';
import { toast } from 'react-toastify';

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
    data: PropTypes.array,
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
    sx,
}) {
    const [sortOrderASC, setSortOrderASC] = useState(true);
    const [dataSort, setDataSort] = useState([]);
    const [loadingSubmit, setLoading] = React.useState(false);
    const [unstacked, setUnstacked] = React.useState(false);
    const wallet = useWallet();
    const handleSortColumn = (id) => {
        setSortOrderASC(!sortOrderASC);
        setDataSort((data) => (sortOrderASC ? data.sort((a, b) => a[id] - b[id]) : data.sort((a, b) => b[id] - a[id])));
    };

    const handleUnstacked = async (id, stake_token) => {
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${STAKING_PACKAGE_UPGRADE}::staking::unstake`,
            typeArguments: [`0x${stake_token}`],
            arguments: [tx.object(CLOCK), tx.object(STAKING_STORAGE), tx.object(id)],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                setUnstacked(true)
                toast.success('Un staked successful');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            console.log('handleUnstacked__error', e);
            toast.error('Transaction rejected');
        }
    };

    const handleClaim = async (id, stake_token) => {
        const tx = new TransactionBlock();

        tx.moveCall({
            target: `${STAKING_PACKAGE_UPGRADE}::staking::claim`,
            typeArguments: [`0x${stake_token}`],
            arguments: [tx.object(CLOCK), tx.object(STAKING_STORAGE), tx.object(id)],
        });

        try {
            const result = await wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
            });

            if (result) {
                setLoading(false);
                toast.success('Claim successful');
            } else {
                setLoading(false);
                toast.error('Transaction rejected');
            }
        } catch (e) {
            setLoading(false);
            console.log('handleClaim__error', e);
            toast.error('Transaction rejected');
        }
    }

    const renderBtnState = React.useCallback((id, stake_token, status, claim_list, can_claim_amount) => {
        if (!claim_list) {
            if (status) {
                return (
                    <GradientButton
                        onClick={() => handleUnstacked(id, stake_token)}
                        loading={loadingSubmit}
                        sx={{
                            margin: 'auto 0 auto auto',
                        }}
                    >
                        Unstake Now
                    </GradientButton>
                );
            } else {
                return (
                    <GradientButton
                        disabled
                        sx={{
                            margin: 'auto 0 auto auto',
                        }}
                    >
                        Unstaked
                    </GradientButton>
                );
            }
        } else {
            if (can_claim_amount !== 0) {
                return <GradientButton
                onClick={() => handleClaim(id, stake_token)}
                sx={{
                    margin: 'auto 0 auto auto',
                }}
            >
                Claim
            </GradientButton>
            } else {
                return <GradientButton
                // onClick={() => handleClaim(id, stake_token)}
                disabled
                sx={{
                    margin: 'auto 0 auto auto',
                }}
            >
                Claim
            </GradientButton>
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingSubmit]);

    React.useEffect(() => {
        console.log('unStaked', unstacked)
    }, [unstacked])

    return (
        <CardStyle sx={sx}>
            <TableContainer sx={{ background: 'transparent' }}>
                <Table sx={{ background: 'transparent!important' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {config.map((tableHead, index) => (
                                <TableCell
                                    key={index}
                                    align={tableHead.align}
                                    onClick={() => handleSortColumn(tableHead.key)}
                                    sx={{ cursor: page === 0 && 'pointer' }}
                                >
                                    {page === 0 && tableHead.label !== '' ? (
                                        <Tooltip title="Sort by">
                                            <p>{tableHead.label} </p>
                                        </Tooltip>
                                    ) : (
                                        tableHead.label
                                    )}
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
                                    <TableCell colSpan={config.length + 1} sx={{ textAlign: 'center', height: 200 }}>
                                        <CircularProgress color="inherit" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {data &&
                                        data.length !== 0 &&
                                        data?.map((item, index) => (
                                            <TableRow hover key={index}>
                                                <TableCell>#{index + 1 + (page - 1) * pageSize}</TableCell>
                                                {config.map((tableBody, i) => (
                                                    <TableCell key={i} sx={{ whiteSpace: 'nowrap' }}>
                                                        {tableBody.render ? (
                                                            tableBody.render(item) ? (
                                                                tableBody.render(item)
                                                            ) : (
                                                                <IconLineDashed color="gray" />
                                                            )
                                                        ) : item[tableBody.key] ? (
                                                            item[tableBody.key]
                                                        ) : (
                                                            <IconLineDashed color="gray" />
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    {data && data?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={config.length + 1} sx={{ textAlign: 'center', height: 100 }}>
                                                <Typography variant="body1">No records found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    ) : (
                        <TableBody
                            sx={{
                                '& tr:last-of-type td': {
                                    borderBottom: !page && 'none',
                                },
                            }}
                        >
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={config.length + 1} sx={{ textAlign: 'center', height: 200 }}>
                                        <CircularProgress color="inherit" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {data &&
                                        data?.length !== 0 &&
                                        data?.map((item, index) => (
                                            <TableRow hover key={index}>
                                                <TableCell>#{index + 1}</TableCell>
                                                {config.map((tableBody, i) => (
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        {tableBody.render ? (
                                                            <>
                                                                {tableBody?.key === 'status' ? (
                                                                    <>{renderBtnState(item?.id, item?.stake_token, item?.status, item?.claim_list, item?.can_claim_amount)}</>
                                                                ) : (
                                                                    tableBody.render(item[tableBody.key])
                                                                )}
                                                            </>
                                                        ) : (
                                                            <Typography>{item[tableBody.key]}</Typography>
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}

                                    {data?.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={config.length + 1} sx={{ textAlign: 'center', height: 100 }}>
                                                <Typography variant="body1">No records found</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
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
