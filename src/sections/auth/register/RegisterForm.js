import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { Form, useFormik, FormikProvider } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ConnectWallet from "../../../components/ConnectWallet";
import Iconify from "../../../components/Iconify";
import { formatAddress } from "../../../setting/format";
import { _showAppError } from "../../../store/setting/settingActions";
import { UserEndpoint } from "../../../store/user/userConstants";
import { post } from "../../../utils/api";

const LoginBox = styled(Stack)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: "white",
    opacity: "0.5",
  },
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: "white",
      borderColor: "#6EABAE",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
}));

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const { userStore } = useSelector((state) => state);
  const { walletAddress } = userStore;
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [resendOTPSeconds, setResendOTPSeconds] = useState(0);
  const dispatch = useDispatch();
  let query = useQuery();
  const referralId = query.get("invitation-code");

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
    wallet: "",
    otp: "",
    referralId,
  };

  const RegisterSchema = Yup.object().shape({
    referralId: Yup.number()
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    wallet:
      !walletAddress && Yup.string().required("Wallet Address is required"),
    password: step === 2 && Yup.string().required("Password is required"),
    confirmPassword:
      step === 2 &&
      Yup.string()
        .oneOf([Yup.ref("password"), null], "confirm password is wrong")
        .required("confirmPassword is required"),
    otp: step === 2 && Yup.string().required("OTP is required"),
  });

  const handleRegister = (params) => {
    console.log("Called Register");
    let submitParams = {
      email: params.email,
      password: params.password,
      otp: params.otp,
      address: walletAddress,
      referralId: parseInt(params.referralId),
    };
    post(
      UserEndpoint.REGISTER,
      submitParams,
      () => {
        toast.success("Sign up success");
        navigate("/auth/login", { replace: true });
      },
      (error) => {
        dispatch(_showAppError(error));
        setIsSubmitting(false);
      }
    );
  };

  const handleGetOTP = () => {
    post(
      UserEndpoint.SEND_OTP,
      { email: formik.values.email },
      () => {
        toast.success("Send OTP success");
        setResendOTPSeconds(30);
      },
      (error) => {
        dispatch(_showAppError(error));
      }
    );
  };

  useEffect(() => {
    if (resendOTPSeconds) {
      setTimeout(() => {
        setResendOTPSeconds(resendOTPSeconds - 1);
      }, 1000);
    }
  }, [resendOTPSeconds]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log("Called step 1");
      setIsSubmitting(true);
      if (step === 1) {
        setStep(step + 1);
        setIsSubmitting(false);
      }
      if (step === 2) {
        handleRegister(formik.values);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <LoginBox spacing={3}>
            {step === 1 && (
              <>
                <TextField
                  name="referralId"
                  id="referralId"
                  label="Referral (Optional)"
                  size="small"
                  {...getFieldProps("referralId")}
                  error={Boolean(touched.referralId && errors.referralId)}
                  helperText={touched.referralId && errors.referralId}
                />
                <TextField
                  name="email"
                  id="email"
                  label="Email address"
                  type="email"
                  size="small"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Box
                  alignItems="center"
                  display="flex"
                  marginX={-1}
                  justifyContent="space-between"
                >
                  <ConnectWallet notShowLogin={true} isBorderButton={true} />
                  <TextField
                    name="wallet"
                    label="Wallet Address"
                    size="small"
                    id="wallet"
                    sx={{
                      width: "75%",
                    }}
                    value={
                      walletAddress ? formatAddress(walletAddress, 10) : ""
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    error={Boolean(touched.wallet && errors.wallet)}
                    helperText={touched.wallet && errors.wallet}
                  />
                </Box>
                <LoadingButton
                  fullWidth
                  size="medium"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    background: "#fa8962",
                    color: "white",
                    border: "1px solid #fa8962",
                    "&:hover": {
                      background: "#fa8962",
                      color: "white",
                      border: "1px solid white",
                    },
                  }}
                >
                  Confirm
                </LoadingButton>
              </>
            )}
            {step === 2 && (
              <>
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "#00ada8",
                          }}
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{
                            color: "#00ada8",
                          }}
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("confirmPassword")}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <TextField
                  name="otp"
                  label="OTP"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {resendOTPSeconds ? (
                          <Typography color="#00ada8" fontWeight={900}>
                            {resendOTPSeconds}s
                          </Typography>
                        ) : (
                          <Button
                            onClick={handleGetOTP}
                            edge="end"
                            type="button"
                            sx={{
                              color: "#00ada8",
                            }}
                          >
                            Send OTP
                          </Button>
                        )}
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("otp")}
                  error={Boolean(touched.otp && errors.otp)}
                  helperText={touched.otp && errors.otp}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LoadingButton
                    size="medium"
                    onClick={() => setStep(step - 1)}
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      width: "48%",
                      background: "#fa8962",
                      color: "white",
                      border: "1px solid #fa8962",
                      "&:hover": {
                        background: "#fa8962",
                        color: "white",
                        border: "1px solid white",
                      },
                    }}
                  >
                    Back
                  </LoadingButton>
                  <LoadingButton
                    size="medium"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      width: "48%",
                      background: "#fa8962",
                      color: "white",
                      border: "1px solid #fa8962",
                      "&:hover": {
                        background: "#fa8962",
                        color: "white",
                        border: "1px solid white",
                      },
                    }}
                  >
                    Sign-up
                  </LoadingButton>
                </Box>
              </>
            )}
          </LoginBox>
        </Form>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            my: 2,
            color: "white",
            "& a": {
              color: "white",
            },
            "& .Mui-checked": {
              color: "white!important",
            },
          }}
        >
          <Typography mr={1}> Already have an account ??</Typography>
          <Link variant="subtitle2" underline="hover" to={"/auth/login"}>
            Sign in
          </Link>
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      </FormikProvider>
    </Container>
  );
}
