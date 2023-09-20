import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useFilter } from '../../context/Filter/FilterContext';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#333333',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',

    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: '#555555',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#444444',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#333333',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-disabled': {
      opacity: 1,
      color: 'red',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  })
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'primary',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  })
);

export default function CustomizedTabs() {
  const [value, setValue] = useState(0);
  const { filter, setFilter } = useFilter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    switch (newValue) {
      case 1:
        setFilter('likes');
        break;
      case 2:
        setFilter('comments');
        break;
      case 3:
        setFilter('asc');
        break;
      case 4:
        setFilter('desc');
        break;
      default:
        setFilter(null);
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab disabled label="Filtrele: " />
          <AntTab label="En Çok Beğenilenler" />
          <AntTab label="En Çok Yorum Yapılanlar" />
          <AntTab label="A-Z" />
          <AntTab label="Z-A" />
        </AntTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
