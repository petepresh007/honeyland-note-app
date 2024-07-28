import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import {studentUrl} from "../server";
import { toast } from "react-toastify";



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function SignUpStudent() {
    const [studentClass, setStudentClass] = React.useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            confirm: data.get('confirmpassword'),
            class: studentClass

        });
        try {
            const res = await axios.post(`${studentUrl}/registerUser`, {
                firstname: data.get('firstName'),
                lastname: data.get('lastName'),
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password'),
                confirmpassword: data.get('confirmpassword'),
                studentClass: studentClass
            })
            console.log(res.data);
            toast.success(res.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="confirmpassword"
                                    type="password"
                                    id="confirmpassword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="class">class</InputLabel>
                                    <Select
                                        labelId="class"
                                        id="studentClass"
                                        name="studentClass"
                                        value={studentClass}
                                        onChange={(e) => setStudentClass(e.target.value)}
                                        label="class"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Year 7">Year 7</MenuItem>
                                        <MenuItem value="Year 8">Year 8</MenuItem>
                                        <MenuItem value="Year 9">Year 9</MenuItem>
                                        <MenuItem value="Year 10">Year 10</MenuItem>
                                        <MenuItem value="Year 11">Year 11</MenuItem>
                                        <MenuItem value="Year 12">Year 12</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signinstudent" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}