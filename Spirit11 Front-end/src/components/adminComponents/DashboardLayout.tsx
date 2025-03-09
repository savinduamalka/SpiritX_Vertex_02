import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { Route, Routes, Link } from 'react-router-dom';

const NAVIGATION = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <ShoppingCartIcon />,
  },
  {
    title: 'Sales Reports',
    path: '/reports/sales',
    icon: <DescriptionIcon />,
  },
  {
    title: 'Traffic Reports',
    path: '/reports/traffic',
    icon: <DescriptionIcon />,
  },
  {
    title: 'Integrations',
    path: '/integrations',
    icon: <LayersIcon />,
  },
];

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ title }: { title: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">{title}</Typography>
    </Box>
  );
}

const DashboardLayout: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        sx={{
          width: { xs: '100%', md: 240 },
          flexShrink: 0,
          backgroundColor: 'primary.main',
          color: 'white',
          height: { xs: 'auto', md: '100vh' },
          padding: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Admin Panel
        </Typography>
        {NAVIGATION.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
                <Typography sx={{ ml: 1 }}>{item.title}</Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/dashboard" element={<PageContent title="Dashboard" />} />
          <Route path="/orders" element={<PageContent title="Orders" />} />
          <Route path="/reports/sales" element={<PageContent title="Sales Reports" />} />
          <Route path="/reports/traffic" element={<PageContent title="Traffic Reports" />} />
          <Route path="/integrations" element={<PageContent title="Integrations" />} />
        </Routes>
      </Box>
    </Box>
  </ThemeProvider>
);

export default DashboardLayout;
