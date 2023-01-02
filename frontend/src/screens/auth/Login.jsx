import { useState, useEffect } from 'react';
import {
  Typography,
  Container,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  Grid, Row, Spacer,
} from 'vcc-ui';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints, ApiErrorCodes } from '@/components/connections/Connections';
import useErrorCheck from '@/components/validations/hooks/useError';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import useLoading from '@/components/loading/hooks/useLoading';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import { useLoginUser } from '@/screens/users/hooks/userDataHooks';
import useClasses from '@/components/layout/hooks/useClasses';
import Storage from '@/components/storage/Storage';

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
  signUp: {
    textAlign: 'center',
    marginTop: 20,
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: '2em',
  },
};

const validations = {
  email: {
    type: 'isEmail',
    text: 'email.notValid',
  },
  password: [{
    type: 'isEmpty',
    text: 'errorDescription.password',
  }],
};

const Login = () => {
  const classes = useClasses(styles);
  const [redirection, setRedirection] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { t } = useTranslation();
  const loginUser = useLoginUser();
  const location = useLocation();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { state } = location;
    const { redirectFrom } = state || {};
    if (redirectFrom) {
      setRedirection(redirectFrom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    setCustomError,
    isError,
    getActivateError,
  } = useErrorCheck({
    values,
    validations,
  });

  const login = async () => {
    setCustomError(null);
    const err = getActivateError();
    if (!err) {
      setLoading(true);
      const response = await Connections.postRequest(
        ApiEndpoints.login,
        {
          email: values.email,
          password: values.password,
        },
      );
      if (!response.ok) {
        if (response?.errorCode === ApiErrorCodes.USER_NOT_VERIFIED) {
          setShowVerification(true);
        }
        setCustomError({ email: response.errorMessage });
        setLoading(false);
      } else {
        let redirectedFrom = null;
        if (
          redirection
          && !redirection.includes(UrlEnums.LOGOUT)
          && !redirection.includes(UrlEnums.SIGN_UP)
        ) {
          redirectedFrom = redirection;
        }
        const res = await Connections.postRequest(ApiEndpoints.fetchSessionData, { userId: response.data._id });
        let userSessionData = {};
        if (res.ok) {
          userSessionData = JSON.parse(res.data.sessionData || '{}');
          for (const key of Object.keys(userSessionData)) {
            // eslint-disable-next-line no-await-in-loop
            await Storage.save(key, userSessionData[key]);
          }
        }
        loginUser({
          redirectedFrom,
          ...response.data,
          userSessionData,
        });
      }
    }
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      login().then();
    }
  };

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  if (loading) return <Loading />;

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          {t('login.headline')}
        </Typography>
        <Spacer size={2} />
        <form className={classes.form} noValidate>
          <Grid>
            <Row>
              <CustomTextField
                name="email"
                label="email.address"
                id="email"
                aria-label={t('email')}
                value={values.email}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                type="email"
                autoFocus
                required
                error={isError('email')}
              />
            </Row>
            <Spacer size={2} />
            <Row>
              <CustomTextField
                name="password"
                label="password"
                id="password"
                aria-label={t('password')}
                value={values.password}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                type="password"
                required
                error={isError('password')}
              />
            </Row>
            <Spacer size={2} />
            <Row>
              <CustomButton
                onClick={login}
              >
                {t('login')}
              </CustomButton>
            </Row>
            <Spacer />
            <Row align="center">
              <Typography>
                {t('signUp.noAccount')}{' '}
                <CustomLink
                  to={UrlEnums.SIGN_UP}
                >
                  {t('signUp')}
                </CustomLink>
              </Typography>
            </Row>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
