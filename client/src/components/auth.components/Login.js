import { useRef, useState, useEffect } from "react";
import { Typography, Button, Snackbar, TextField, Grid, Stack } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../css/auth/register.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const USER_REGEX = /^[a-zA-Z0-9-_]{3,25}$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$%-_]{5,25}$/;

const animations = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
}

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //snackbar
    const [snackState, setSnackState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center'
    });
    const { vertical, horizontal, open } = snackState;
    const handleClose = () => {
        setSnackState({ ...snackState, open: false });
    };


    const getErrorMessage = (words) => {
        let errBase = "Invalid ";
        words.forEach((word, index) => {
            switch (index) {
                case 0:
                    errBase += word; break;
                case words.length - 1:
                    errBase += " and " + word; break;
                default:
                    errBase += ", " + word; break;
            }
        });
        return errBase;
    }

    // set focus when component loads on username
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    return (
        <Grid container className="registration_page" >
            <Grid item xl={3} lg={4} md={6} sm={6} xs={11}>
                <motion.section variants={animations}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
                    <Typography variant="h4">Login&nbsp;<Typography variant="caption">(Under development)</Typography></Typography>
                    <form className="register_form">
                        <TextField
                            error={user && !validName && errMsg !== "" ? true : false}
                            variant="standard"
                            label="Username"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="form_input"
                        />
                        <TextField
                            error={password && !validPassword && errMsg !== "" ? true : false}
                            variant="standard"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="form_input"
                        />

                        <Stack direction={"row"} justifyContent="space-between">
                            <Stack direction={"row"}>
                                <Button variant="contained">Login</Button>
                                <Link to="/register" className="outlined_button"  ><Button variant="outlined">Not registered ?</Button></Link>
                            </Stack>
                            <Link to="/" ><Button>Home page</Button></Link>
                        </Stack>

                    </form>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={errMsg}
                        autoHideDuration={5000}
                        key={vertical + horizontal}
                    />
                </motion.section>
            </Grid>
        </Grid>
    )
}

export default Register

