import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import { getTeam, updateTeam } from "@/services/teamService";

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
import React, { useEffect } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { useAppDispatch } from "@/store/store";
import { updateTeamAction } from "@/store/slices/teamSlice";
import toast, { Toaster } from "react-hot-toast";
import withAuth from "@/components/withAuth";

type Props = {
  team: TeamData;
};

const Edit = ({ team }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
              แก้ไขข้อมูลทีม
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
              type="number"
              label="โวลต์ (โวลต์และแอมป์รวมกัน ห้ามเกิน 15 watt .hr)"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="A"
              type="number"
              label="แอมป์ (โวลต์และแอมป์รวมกัน ห้ามเกิน 15 watt .hr)"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="weight"
              type="text"
              label="น้ำหนัก (ไม่เกิน 1 กก.)"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="wide"
              type="text"
              label="กว้าง (ไม่เกิน 25 ซม.)"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="length"
              type="text"
              label="ยาว (ไม่เกิน 30 ซม.)"
            />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="height"
              type="text"
              label="สูง (ไม่เกิน 20 ซม.)"
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

            
<Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="distance"
              type="text"
              label="ระยะทางที่ได้"
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
          if (!values.name) errors.name = "กรุณากรอกชื่อทีม";
          if (!values.school) errors.school = "กรุณากรอกชื่อโรงเรียน";
          return errors;
        }}
        initialValues={team!}
        onSubmit={async (values, { setSubmitting }) => {
          const id = router.query.id;
          const updateStatus = await dispatch(updateTeamAction({ id, ...values }))
          if(updateStatus.meta.requestStatus === "fulfilled"){
            toast.success("แก้ไขข้อมูลทีมสำเร็จ")
            router.push("/team")
          }
          setSubmitting(false);
        }}
      >
        {(props) => showForm(props)}
      </Formik>
     
    </Layout>
  );
};

export default withAuth(Edit);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.query;
  if (id) {
    const team = await getTeam(id);
    return {
      props: {
        team,
      },
    };
  } else {
    return { props: {} };
  }
};
