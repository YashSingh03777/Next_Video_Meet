import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, useMediaQuery } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setUsername('');
        setPassword('');
        setName('');
        setFormState(0);
        setError('');
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {/* Fullscreen Background Wrapper */}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          backgroundImage: 'url(https://picsum.photos/1920/1080)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          alignItems: { xs: 'center', sm: 'stretch' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Semi-transparent overlay for mobile readability */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 0,
          }}
        />

        {/* Form Section */}
        <Paper
          elevation={6}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: { xs: '90%', sm: 400 },
            maxWidth: '400px',
            height: { xs: 'auto', sm: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: { xs: 4, sm: 6 },
            py: { xs: 5, sm: 8 },
            borderRadius: { xs: 4, sm: '12px 0 0 12px' },
            boxShadow: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // slight transparency
            backdropFilter: 'blur(8px)',
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 340,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {formState === 0 ? 'Welcome Back' : 'Create Account'}
            </Typography>

            {/* Toggle Buttons */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1, width: '100%' }}>
              <Button
                fullWidth
                variant={formState === 0 ? 'contained' : 'outlined'}
                onClick={() => setFormState(0)}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant={formState === 1 ? 'contained' : 'outlined'}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Form Fields */}
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  name="fullname"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ThemeProvider>
  );
}
