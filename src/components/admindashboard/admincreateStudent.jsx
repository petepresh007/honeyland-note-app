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
import { studentUrl } from "../../server";
import { toast } from "react-toastify";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai"



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function AdminSignUpStudent() {
    const [studentClass, setStudentClass] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [file, setFile] = React.useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        try {
            const res = await axios.post(`${studentUrl}/adminreguser`, {
                firstname: data.get('firstName'),
                lastname: data.get('lastName'),
                username: data.get('username'),
                email: data.get('email'),
                studentClass: studentClass,
                category: category
            })
            console.log(res.data);
            toast.success(res.data.msg);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const upload = new FormData();
        upload.append("file", file)

        try {
            const { data } = await axios.post(`${studentUrl}/adminreguserupload`, upload);
            alert(data.message)
        } catch (error) {
            error.response.data.errors.map(data => {
                alert(data.error)
            })
        }
    }


    return (
        <>
            <div className='upload-student-center'>
                <h2>Import File</h2>
                <form action="" onSubmit={handleUpload} className='upload-frm'>
                    <input
                        type="file"
                        accept='.txt'
                        id='upload-student'
                        name='upload-student'
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                    <label htmlFor="upload-student" id='upload-student' name='upload-student' >
                        {file ? (
                            <span className='text-can'>
                                <span>{file.name}</span>
                                <AiOutlineClose onClick={()=>setFile(null)}/>
                            </span>
                        ) : (<AiOutlineUpload className={`student-upload`} />)}
                    </label>
                    <button className='upload-btn-std'>upload</button>
                </form>
            </div>

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
                                    // autoComplete="username"
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
                                    <FormControl fullWidth>
                                        <InputLabel id="category">category</InputLabel>
                                        <Select
                                            labelId="category"
                                            id="category"
                                            name="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            label="category"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Science">Science</MenuItem>
                                            <MenuItem value="Commercial">Commercial</MenuItem>
                                            <MenuItem value="Art">Art</MenuItem>
                                            <MenuItem value="General">General</MenuItem>
                                        </Select>
                                    </FormControl>
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
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}