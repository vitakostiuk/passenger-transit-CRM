import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getClickSigninPhone } from '../../redux/auth/authSelectors';
import { Formik, Form, Field } from 'formik';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import PhoneAuth from './PhoneAuth/PhoneAuth';
import PhoneAuthForm from './PhoneAuth/PhoneAuthForm';
import FacebookAuth from './FacebookAuth/FacebookAuth';
// import { ReactComponent as IconGoogle } from '../../images/icon-google.svg';
import * as Yup from 'yup';
import s from './Auth.module.css';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is Too short')
    .required('Password is required'),
});

const SignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, 'Name is Too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is Too short')
    .required('Password is required'),
});

const Auth = ({
  questionText,
  hash,
  buttonText,
  buttonTextToNavigate,
  handleSetCredentials,
  isSignIn,
}) => {
  const navigate = useNavigate();

  const isClickSigninPhone = useSelector(getClickSigninPhone);

  const initialValues = isSignIn
    ? { email: '', password: '' }
    : { displayName: '', email: '', password: '' };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h1 className={s.title}>Sign in to Transit CRM</h1>
        <div className={s.googleLogin}>
          {' '}
          <GoogleAuth />
          <PhoneAuth />
          <FacebookAuth />
        </div>
        <p className={s.orText}>OR</p>
        {!isClickSigninPhone ? (
          <Formik
            initialValues={initialValues}
            validationSchema={isSignIn ? SigninSchema : SignupSchema}
            onSubmit={values => {
              handleSetCredentials(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className={s.form}>
                {!isSignIn && (
                  <>
                    <label className={s.label} htmlFor="displayName">
                      Name
                    </label>
                    <Field
                      id="displayName"
                      className={
                        errors.displayName && touched.displayName
                          ? s.errInput
                          : s.input
                      }
                      name="displayName"
                      type="text"
                      placeholder="your name"
                    />
                    {errors.displayName && touched.displayName ? (
                      <div className={s.errName}>{errors.displayName}</div>
                    ) : null}
                  </>
                )}
                <label className={s.label} htmlFor="email">
                  Email
                </label>
                <Field
                  id="email"
                  className={
                    errors.email && touched.email ? s.errInput : s.input
                  }
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                />
                {errors.email && touched.email ? (
                  <div className={isSignIn ? s.errEmailSignin : s.errEmail}>
                    {errors.email}
                  </div>
                ) : null}

                <label className={s.label} htmlFor="password">
                  Password
                </label>
                <Field
                  id="password"
                  className={
                    errors.password && touched.password ? s.errInput : s.input
                  }
                  name="password"
                  type="password"
                  placeholder="your password"
                />
                {errors.password && touched.password ? (
                  <div
                    className={isSignIn ? s.errPasswordSignin : s.errPassword}
                  >
                    {errors.password}
                  </div>
                ) : null}

                <div>
                  <button className={s.bigButton} type="submit">
                    {buttonText}
                  </button>
                  <div className={s.questionContainr}>
                    <p className={s.questionText}>{questionText}</p>
                    <button
                      className={s.questionBtn}
                      type="button"
                      onClick={() => navigate(`/${hash}`)}
                    >
                      {buttonTextToNavigate}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <PhoneAuthForm />
        )}
      </div>
    </div>
  );
};

Auth.propTypes = {
  questionText: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonTextToNavigate: PropTypes.string.isRequired,
  handleSetCredentials: PropTypes.func.isRequired,
  isForgotPassword: PropTypes.bool,
};

export default Auth;
