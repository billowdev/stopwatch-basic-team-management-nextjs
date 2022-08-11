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
              Add Team
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="Name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="school"
              type="text"
              label="School"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="number"
              type="text"
              label="Number"
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
              Add
            </Button>
            <Link href="/team" passHref>
              <Button variant="outlined" fullWidth>
                Cancl
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    );
  };

  const showPreviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={values.file_obj}
          width={100}
          height={100}
        />
      );
    }
  };

  const initialValues: TeamData = {
    name: "",
    school: "",
    number: "",
  };

  return (
    <Layout>
      <Formik
        validate={(values) => {
          let errors: any = {};
          if (!values.name) errors.name = "Enter name";
          if (!values.school) errors.name = "Enter school";
          if (!values.number) errors.name = "Enter your team number";

          return errors;
        }}
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          let data = new FormData();
          data.append("name", values.name);
          data.append("school", String(values.school));
          data.append("number", String(values.number));
          await createTeam(data);
          router.push("/team");
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default Add;
