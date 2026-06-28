import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create the default Material UI theme
const defaultTheme = createTheme();

export default function Authentication() {
  // State for username input
  const [username, setUsername] = React.useState("");

  // State for password input
  const [password, setPassword] = React.useState("");

  // State for full name (used only in Sign Up)
  const [name, setName] = React.useState("");

  // formState = 0 -> Sign In
  // formState = 1 -> Sign Up
  const [formState, setFormState] = React.useState(0);

  // const [open, setOpen] = React.useState(false);

  // Handle form submission
  const handleSubmit = () => {
    if (formState === 0) {
      // Sign In Data
      console.log({
        username,
        password,
      });
    } else {
      // Sign Up Data
      console.log({
        name,
        username,
        password,
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Main container */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        {/* Left side image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Right side authentication form */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Lock icon */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            {/* Toggle buttons */}
            <Box sx={{ mb: 2 }}>
              {/* Sign In button */}
              <Button
                variant={formState === 0 ? "contained" : "outlined"}
                onClick={() => setFormState(0)}
                sx={{ mr: 2 }}
              >
                Sign In
              </Button>

              {/* Sign Up button */}
              <Button
                variant={formState === 1 ? "contained" : "outlined"}
                onClick={() => setFormState(1)}
              >
                Sign Up
              </Button>
            </Box>

            {/* Authentication Form */}
            <Box component="form" sx={{ mt: 1, width: "100%" }}>
              {/* Show Full Name field only during Sign Up */}
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {/* Username Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleSubmit}
              >
                {/* Button text changes based on form type */}
                {formState === 0 ? "Sign In" : "Sign Up"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}