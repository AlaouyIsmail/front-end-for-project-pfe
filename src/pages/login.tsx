/**
 * ========================================
 * SIGNIN COMPONENT - VERSION CORRIGÉE
 * ========================================
 * 
 * Version avec:
 * - Affichage des données reçues
 * - Sauvegarde correcte du token
 * - Logs détaillés
 * - Vérification localStorage
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import AppTheme from '../theme/AppTheme';
import ColorModeSelect from '../theme/ColorModeSelect';
import SvgIcon from '@mui/material/SvgIcon';
import { color } from 'framer-motion';

// ========================================
// API CONFIGURATION
// ========================================

const API_URL = 'http://localhost:5000';

console.log('✅ SignIn component loaded');
console.log('🔗 API_URL:', API_URL);

// ========================================
// GOOGLE ICON
// ========================================

function GoogleIcon() {
  return (
    <SvgIcon>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
          fill="#4285F4"
        />
        <path
          d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
          fill="#34A853"
        />
        <path
          d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
          fill="#FBBC05"
        />
        <path
          d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
          fill="#EA4335"
        />
      </svg>
    </SvgIcon>
  );
}

// ========================================
// STYLED COMPONENTS
// ========================================

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

// ========================================
// FORGOT PASSWORD DIALOG
// ========================================

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

function ForgotPasswordDialog({ open, handleClose }: ForgotPasswordProps) {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('✓ Reset link sent to your email!');
        setEmail('');

        setTimeout(() => {
          handleClose();
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(data.error || 'Failed to send reset link');
      }
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      setErrorMessage('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>

        {successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}

        {errorMessage && (
          <Alert severity="error">{errorMessage}</Alert>
        )}

        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="your@email.com"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} />
              Sending...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ========================================
// SIGN IN COMPONENT
// ========================================

function SignIn(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false);

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const validateEmail = (email: string): boolean => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 4;
  };

  const validateInputs = (): boolean => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !validateEmail(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || !validatePassword(password.value)) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');
    setDebugInfo(null);

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;

     

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      console.log('📤 Sending POST to:', `${API_URL}/login`);

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: formData,
      });


      const data = await response.json();

      console.log('📦 Response Data:', data);

      
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        
        setSuccessMessage('✓ Login successful! Redirecting...');

        setTimeout(() => {
          const role = localStorage.getItem('role');
          if (role === 'RH') {
            window.location.href = '/dashboard/rh';
          } else if (role === 'CHEF') {
            window.location.href = '/dashboard/chef';
          } else if (role === 'RESSOURCE') {
            window.location.href = '/dashboard/ressource';
          } else {
            window.location.href = '/dashboard';
          }
        }, 1500);
      } else {
        console.error('❌ Login failed:', data);
        setErrorMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Exception:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to connect to server'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          {/* Debug Info */}
          {debugInfo && (
            <Alert severity="info" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
              Status: {debugInfo.status}
              {'\n'}
              Response: {JSON.stringify(debugInfo.data, null, 2)}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success">{successMessage}</Alert>
          )}

          {errorMessage && (
            <Alert severity="error">{errorMessage}</Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                disabled={loading}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" disabled={loading} />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <Link
              component="button"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleForgotPasswordOpen();
              }}
              variant="body2"
              sx={{ alignSelf: 'center', cursor: 'pointer' }}
            >
              Forgot your password?
            </Link>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
              disabled={loading}
            >
              Sign in with Google
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                variant="body2"
                sx={{ alignSelf: 'center', cursor: 'pointer' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>

      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        handleClose={handleForgotPasswordClose}
      />
    </AppTheme>
  );
}

export { SignIn, ForgotPasswordDialog };
export default SignIn;