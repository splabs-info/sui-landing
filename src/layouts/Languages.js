import { Box, IconButton, styled, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { _changeLanguage } from '../store/setting/settingActions';

//=============================================================

const MenuLanguages = styled(Menu)(() => ({
    '&.MuiPopover-root': {
        border: 'none',
    },
    '& .MuiPaper-root': {
        background: 'rgba(28,56,87,0.5)!important',
        boxShadow: 'none',
        border: '1px solid #98cafe',
        color: 'white',
    },
    border: '1px solid black',
    color: 'white',
    marginTop: '15px',
    '& a': {
        color: 'white',
        textDecoration: 'none',
    },
    '& .MuiMenu-paper': {},
}));

const LanguagesButton = styled(IconButton)(() => ({
    borderRadius: '10px',
    '& span': {
        color: 'white',
        fontSize: '1rem',
        paddingLeft: '0.5rem',
    },
}));

const LanguagesIcon = styled(Box)(() => ({
    height: '25px',
    marginRight: '0.7rem',
    cursor: 'pointer',
}));
//======================================================+

const languages = [
    {
        name: 'English',
        langCode: 'en',
        src: '/images/icon/icon-en.png',
    },
    {
        name: 'Vietnamese',
        langCode: 'vn',
        src: '/images/icon/icon-vn.png',
    },
    {
        name: 'Korean',
        langCode: 'kr',
        src: '/images/icon/icon-kr.png',
    },
    {
        name: 'Japanese',
        langCode: 'jp',
        src: '/images/icon/icon-jp.png',
    },
];

export default function Languages({ ...other }) {
    const [anchorElLang, setAnchorElLang] = useState(null);
    const openLang = Boolean(anchorElLang);
    const [currentLang, setCurrentLang] = useState(localStorage.getItem('lang'));

    const dispatch = useDispatch();

    const handleClickLang = (event) => {
        setAnchorElLang(event.currentTarget);
    };
    const handleCloseMenuLang = () => {
        setAnchorElLang(null);
    };
    const handleChangeLang = (langCode) => {
        dispatch(_changeLanguage(langCode));
        setCurrentLang(langCode);
    };

    useEffect(() => {
        dispatch(_changeLanguage(localStorage.getItem('lang')));
    }, [dispatch]);

    return (
        <Box {...other}>
            <LanguagesButton onClick={handleClickLang}>
                <LanguagesIcon
                    component={'img'}
                    src={`/images/icon/icon-${currentLang}.png`}
                    alt="languages"
                    sx={{ marginRight: 0 }}
                />
                <span> {currentLang.toUpperCase()}</span>
            </LanguagesButton>
            <MenuLanguages
                anchorEl={anchorElLang}
                open={openLang}
                onClose={handleCloseMenuLang}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {languages.map((lang, index) => (
                    <MenuItem key={index} onClick={() => handleChangeLang(lang.langCode)}>
                        <LanguagesIcon component={'img'} src={lang.src} alt={lang.name} />
                        {lang.name}
                    </MenuItem>
                ))}
            </MenuLanguages>
        </Box>
    );
}
