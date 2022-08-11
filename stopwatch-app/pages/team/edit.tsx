import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import { createTeam, getTeam, updateTeam } from "@/services/teamService";

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

type Props = {
  team?: TeamData;
};

const Edit = ({ team }: Props) => {
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
              Edit team
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
              Edit
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
        initialValues={team!}
        onSubmit={async (values, { setSubmitting }) => {
          let data = new FormData();
          data.append("id", String(values.id));
          data.append("name", values.name);
          data.append("school", String(values.school));
          data.append("number", String(values.number));
          await updateTeam(data);
          router.push("/team");
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
    </Layout>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  if (id) {
    const product = await getTeam(id);
    return {
      props: {
        product,
      },
    };
  } else {
    return { props: {} };
  }
};
