import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import { createTeam, updateTeam } from "@/services/teamService";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";

type Props = {};

const Add = ({}: Props) => {
  const router = useRouter();

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }: FormikProps<TeamData>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              เพิ่มทีม
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="ชื่อทีม"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="school"
              type="text"
              label="โรงเรียน"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="V"
              type="text"
              label="โวลต์"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="A"
              type="text"
              label="แอมป์"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="weight"
              type="text"
              label="น้ำหนัก"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="wide"
              type="text"
              label="กว้าง"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="length"
              type="text"
              label="ยาว"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="height"
              type="text"
              label="สูง"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="orderPlay"
              type="text"
              label="ลำดับการลงสนาม"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="orderPractice"
              type="text"
              label="ลำดับการซ้อม"
            />
          </CardContent>
          <CardActions>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              เพิ่ม
            </Button>
            <Link href="/team" passHref>
              <Button variant="outlined" fullWidth>
                ยกเลิก
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    );
  };
  const initialValues: TeamData = {
    name: "",
    school: "",
    V: 0,
    A: 0,
    weight: "",
    wide: "",
    height: "",
    length: "",
    orderPractice: "",
    orderPlay: "",
  };

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "กรุณากรอกชื่อทีม";
          if (!values.school) errors.school = "กรุณากรอกชื่อโรงเรียน";
          return errors;
        }}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          await createTeam(values);
          router.push("/team");
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default withAuth(Add);
