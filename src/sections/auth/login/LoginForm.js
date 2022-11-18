import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "../../../components/hook-form";
import Iconify from "../../../components/Iconify";
import { _showAppError } from "../../../store/setting/settingActions";
import { _getNewProfile } from "../../../store/user/userActions";
import { UserEndpoint } from "../../../store/user/userConstants";
import { post } from "../../../utils/api";
import { setAccessToken } from "../../../utils/auth";

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

export default function RegisterForm() {
  const navigate = useNavigate();
  const { userStore } = useSelector((state) => state);
  const { walletAddress } = userStore;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
    wallet: walletAddress,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    const { email, password } = e;
    setIsLoading(true);
    post(
      UserEndpoint.LOGIN,
      {
        email,
        password,
      },
      (data) => {
        setIsLoading(false);
        setAccessToken(data.accessToken);
        dispatch(_getNewProfile());
        navigate("/", { replace: true });
      },
      (error) => {
        // console.log(error);
        setIsLoading(false);
        dispatch(_showAppError(error));
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <LoginBox spacing={3}>
        <RHFTextField
          name="email"
          id="email"
          label="Email address"
          size="small"
        />
        <RHFTextField
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
                    color: "white",
                  }}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            background: "#fa8962",
            color: "white",
            border: "1px solid #fa8962",
            boxShadow: "none",
            "&:hover": {
              background: "#fa8962",
              color: "white",
              border: "1px solid white",
            },
          }}
          disabled={isLoading}
        >
          Sign-in
        </LoadingButton>
      </LoginBox>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          mt: 2,
          color: "white",
          "& .Mui-checked": {
            color: "white!important",
          },
        }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mt: 0.5,
          color: "white",
          "& a": {
            color: "white",
          },
        }}
      >
        <Typography mr={1}>Don’t have an account?</Typography>
        <Link variant="subtitle2" underline="hover" to={"/auth/register"}>
          Get started
        </Link>
      </Stack>
    </FormProvider>
  );
}
