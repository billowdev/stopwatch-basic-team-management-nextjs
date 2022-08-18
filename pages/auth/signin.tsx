import React, { ReactElement } from "react";

import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field, FormikProps } from "formik";
import Router, { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useAppDispatch } from "@/store/store";
import { signIn } from "@/store/slices/userSlice";
import withAuth from "@/components/withAuth";
import toast from "react-hot-toast";

type Props = {};

const SignIn = ({}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="username"
          id="username"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoFocus
        />
        <Field
          component={TextField}
          name="password"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          ลงชื่อเข้าใช้
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => router.push("/timer")}
        >
          นาฬิกาถอยหลัง
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => router.push("/stopwatch")}
        >
          นาฬิกาจับเวลา
        </Button>
      </Form>
    );
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <Typography>ลงชื่อเข้าใช้</Typography>
          <CardContent>
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values) => {
                const response = await dispatch(signIn(values));
                if (response.meta.requestStatus === "rejected") {
                  toast.error("ลงชื่อเข้าใช้ไม่สำเร็จ!")
                } else {
                  toast.success("ลงชื่อเข้าใช้สำเร็จ!")
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>

        <style jsx global>
          {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              text-align: center;
            }
          `}
        </style>
      </Box>
    </React.Fragment>
  );
};

export default withAuth(SignIn);
