import {useState} from 'react';
import {
    Button,
    Typography,
    Container,
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Row, Spacer, Grid as VCCGrid} from 'vcc-ui';

import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, {ApiEndpoints, ApiErrorCodes} from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import useClasses from '@/components/layout/hooks/useClasses';
import ErrorText from '@/components/validations/ErrorText';

import LoginHere from './LoginHere';

const styles = {
    paper: {
        marginTop: 'var(--theme-spacing-8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: 'var(--theme-spacing-1)',
    },
    submit: {
        margin: 'var(--theme-spacing-3_0_2)',
    },
};

const SignUp = () => {
    const classes = useClasses(styles);

    const {t} = useTranslation();
    const [values, setValues] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [signUpCompleted, setSignUpCompleted] = useState(false);
    const {loading, Loading, setLoading} = useLoading();
    const validations = {
        email: {
            type: 'isEmail',
            text: 'errorDescription.email',
        },
        password: {
            type: 'isEmpty',
            text: 'errorDescription.password',
        },
        repeatPassword: {
            customValidation: () => values.password === values.repeatPassword,
            text: 'password.shouldMatch',
        },
    };

    const {
        setCustomError,
        isError,
        getActivateError,
        convertErrorArray,
    } = useError({
        values,
        validations,
    });

    if (signUpCompleted) {
        return (
            <SuccessBox
                text="signUp.successfulRegistration"
            />
        );
    }

    const signUp = async () => {
        setCustomError(null);
        setLoading(true);
        const err = getActivateError();
        if (!err) {
            const res = await Connections.postRequest(ApiEndpoints.signUp, {
                email: values.email,
                password: values.password,
            });

            if (res.ok) {
                setSignUpCompleted(true);
            } else if (res.errorCode === ApiErrorCodes.USER_ALREADY_EXISTS) {
                setCustomError({email: 'user.alreadyExists'});
            } else if (res.errorData && res.errorData.errors) {
                setCustomError(convertErrorArray(res.errorData.errors));
            }
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    if (loading) return <Loading/>;

    const handleChange = ({name, value}) => {
        setValues({...values, [name]: value});
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {t('Onboarding')}
                </Typography>
                <form className={classes.form} noValidate>
                    <VCCGrid>
                        <Row>
                            <CustomTextField
                                id="email"
                                name="email"
                                label="email.address"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                                type="email"
                                autoFocus
                                fullWidth
                                required
                                error={isError('email')}
                            />
                        </Row>
                        <Spacer size={2}/>
                        <Row>
                            <CustomTextField
                                id="password"
                                name="password"
                                label="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                                fullWidth
                                required
                                error={isError('password')}
                            />
                        </Row>
                        <Spacer size={2}/>
                        <Row>
                            <CustomTextField
                                id="repeatPassword"
                                name="repeatPassword"
                                label="repeatPassword"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                type="password"
                                fullWidth
                                required
                                error={isError('repeatPassword')}
                            />
                        </Row>
                        <ErrorText error={isError('custom')} center/>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signUp}
                        >
                            {t('signUp')}
                        </Button>
                        <LoginHere/>
                    </VCCGrid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
