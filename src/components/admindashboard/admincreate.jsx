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
import { Select, MenuItem, FormControl, InputLabel, FormGroup } from '@mui/material';
import axios from 'axios';
import { userUrl } from "../../server";
import { toast } from "react-toastify";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function AdminSignUpUser() {
    const [department, setDepartment] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [assignedClass, setAssignedClass] = React.useState([]);
    const [category, setCategory] = React.useState("")


    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setAssignedClass([...assignedClass, value]);
        } else {
            setAssignedClass(assignedClass.filter((item) => item !== value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     confirm: data.get('confirmpassword'),
        //     department: department,
        //     subject: subject,
        //     assignedClass: assignedClass
        //  });
        try {
            const res = await axios.post(`${userUrl}/adminreguser`, {
                firstname: data.get('firstName'),
                lastname: data.get('lastName'),
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password'),
                confirmpassword: data.get('confirmpassword'),
                department: department,
                subject: subject,
                assignedClass: assignedClass,
                category: category
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
                                    <InputLabel id="department">dept</InputLabel>
                                    <Select
                                        labelId="dept"
                                        id="department"
                                        name="department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        label="department"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Science">Science</MenuItem>
                                        <MenuItem value="Social Science">Social Science</MenuItem>
                                        <MenuItem value="Language">Language</MenuItem>
                                        <MenuItem value="Humanities">Humanities</MenuItem>
                                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                                        <MenuItem value="Vocational">Vocational</MenuItem>
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

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="subject">subject</InputLabel>
                                    <Select
                                        labelId="subject"
                                        id="subject"
                                        name="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        label="subject"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Science">Science</MenuItem>
                                        <MenuItem value="Computer Science">Computer Science</MenuItem>
                                        <MenuItem value="Mathematics">Mathematics</MenuItem>
                                        <MenuItem value="English Language">English Language</MenuItem>
                                        <MenuItem value="Physics">Physics</MenuItem>
                                        <MenuItem value="Chemistry">Chemistry</MenuItem>
                                        <MenuItem value="Agriculture Science">Agriculture Science</MenuItem>
                                        <MenuItem value="Basic Technology">Basic Technology</MenuItem>
                                        <MenuItem value="Basic Science">Basic Science</MenuItem>
                                        <MenuItem value="Business Studies">Business Studies</MenuItem>
                                        <MenuItem value="Cultural and Creative Art">Cultural and Creative Art</MenuItem>
                                        <MenuItem value="Civic Education">Civic Education</MenuItem>
                                        <MenuItem value="French Language">French Language</MenuItem>
                                        <MenuItem value="History">History</MenuItem>
                                        <MenuItem value="PHE">PHE</MenuItem>
                                        <MenuItem value="Yoruba">Yoruba</MenuItem>
                                        <MenuItem value="ICT">ICT</MenuItem>
                                        <MenuItem value="Biology">Biology</MenuItem>
                                        <MenuItem value="Further Mathematics">Further Mathematics</MenuItem>
                                        <MenuItem value="Technical Drawing">Technical Drawing</MenuItem>
                                        <MenuItem value="Foods and Nutrition">Foods and Nutrition</MenuItem>
                                        <MenuItem value="CRS">CRS</MenuItem>
                                        <MenuItem value="IRS">IRS</MenuItem>
                                        <MenuItem value="Visual Art">Visual Art</MenuItem>
                                        <MenuItem value="Geography">Geography</MenuItem>
                                        <MenuItem value="Government">Government</MenuItem>
                                        <MenuItem value="Economics">Economics</MenuItem>
                                        <MenuItem value="Literature in English">Literature in English</MenuItem>
                                        <MenuItem value="Financial Accounting">Financial Accounting</MenuItem>
                                        <MenuItem value="Commerce">Commerce</MenuItem>
                                        <MenuItem value="Painting & Decoration">Painting & Decoration</MenuItem>
                                        <MenuItem value="Catering Craft">Catering Craft</MenuItem>
                                        <MenuItem value="Data Processing">Data Processing</MenuItem>
                                        <MenuItem value="Marketting">Marketting</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="assignedClass">assignedClass</InputLabel>
                                    <Select
                                        labelId="assignedClass"
                                        id="assignedClass"
                                        name="assignedClass"
                                        value={assignedClass}
                                        onChange={(e) => setAssignedClass(e.target.value)}
                                        label="assignedClass"
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
                            </Grid> */}

                            <Grid item xs={12}>
                                <FormControl component="fieldset" fullWidth>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox value="Year 7" onChange={handleCheckboxChange} />}
                                            label="Year 7"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="Year 8" onChange={handleCheckboxChange} />}
                                            label="Year 8"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="Year 9" onChange={handleCheckboxChange} />}
                                            label="Year 9"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="Year 10" onChange={handleCheckboxChange} />}
                                            label="Year 10"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="Year 11" onChange={handleCheckboxChange} />}
                                            label="Year 11"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="Year 12" onChange={handleCheckboxChange} />}
                                            label="Year 12"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                />
                            </Grid> */}
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
                            {/* <Grid item>
                                <Link href="/signinstudent" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

