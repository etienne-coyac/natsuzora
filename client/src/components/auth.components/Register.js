import { useRef, useState, useEffect } from "react";
import { Typography, Button, Snackbar, TextField, Grid, Stack } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import '../css/auth/register.css';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const USER_REGEX = /^[a-zA-Z0-9-_]{3,25}$/;
const PWD_REGEX = /^[a-zA-Z0-9!@#$%-_]{5,25}$/;

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
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

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false)

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
    const handleClick = () => {
        let errWords = [];
        if (!validName) { errWords.push(['username']); console.log('username') }
        if (!validPassword) { errWords.push(['password']); console.log('password') }
        if (!validMatch) { errWords.push(['password validation']); console.log('password validation') }

        console.log(validName, validPassword, validMatch)
        if (!validMatch || !validName || !validPassword) {
            setErrMsg(getErrorMessage(errWords))
            setSnackState({ ...snackState, open: true });
        }
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
        console.log(PWD_REGEX.test(password))
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch((password === matchPassword) && password !== "");
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [user, password, matchPassword])

    return (
        <Grid container className="registration_page" >
            <Grid item xl={3} lg={4} md={6} sm={6} xs={11}>
                <motion.section variants={animations}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
                    <Typography variant="h4">Register&nbsp;<Typography variant="caption">(Under development)</Typography></Typography>
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="form_input"
                        />
                        <TextField
                            error={password && !validPassword && errMsg !== "" ? true : false}
                            variant="standard"
                            label="Confirm"
                            type="password"
                            id="password_confirm"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="form_input"
                        />
                        <Stack direction={"row"} justifyContent="space-between">
                            <Stack direction={"row"}>
                                <Button onClick={handleClick} variant="contained">Register</Button>
                                <Link to="/login" className="outlined_button" ><Button variant="outlined">Already registered ?</Button></Link>
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

