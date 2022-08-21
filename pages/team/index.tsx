import Layout from "@/components/Layouts/Layout";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useAppDispatch } from "@/store/store";
import { deleteTeam, getTeams, teamSelector } from "@/store/slices/teamSlice";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import router from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TeamData } from "@/models/team.model";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import Add from "./add";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { stringify } from "querystring";
import withAuth from "@/components/withAuth";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomToolbar: React.FunctionComponent<{
  setFilterButtonEl: React.Dispatch<
    React.SetStateAction<HTMLButtonElement | null>
  >;
}> = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
    <Link href="/team/add" passHref>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AddIcon />
      </Fab>
    </Link>
  </GridToolbarContainer>
);

type Props = {};

const TeamPage = ({}: Props) => {
  const dispatch: any = useAppDispatch();
  const teamList: any = useSelector(teamSelector);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = React.useState<TeamData | null>(null);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const showDialog = () => {
    if (selectedTeam === null) {
      return;
    }

    return (
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <br />
          Confirm to delete the team? : {selectedTeam.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleDeleteConfirm = () => {
    if (selectedTeam) {
      dispatch(deleteTeam(String(selectedTeam.id)));
      setOpenDialog(false);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 280 },

    {
      field: "name",
      // editable: true,
      headerName: "ชื่อทีม",
      width: 240,
    },
    {
      field: "school",
      headerName: "โรงเรียน",
      width: 240,
    },
    {
      field: "V",
      headerName: "Volts",
      width: 60,
    },
    {
      field: "A",
      headerName: "Amps",
      width: 60,
    },
    {
      field: "whr",
      headerName: "W/Hr",
      valueGetter: (params: GridValueGetterParams<any, TeamData>) => {
        return params;
      },
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          <React.Fragment>{value?.row?.V * value?.row?.A}</React.Fragment>
        </Typography>
      ),
      width: 60,
    },
    {
      field: "weight",
      headerName: "น้ำหนัก (ก.ก.)",
      width: 100,
    },

    {
      field: "wide",
      headerName: "ก",
      width: 20,
    },
    {
      field: "length",
      headerName: "ย",
      width: 20,
    },
    {
      field: "height",
      headerName: "ส",
      width: 20,
    },
    {
      field: "orderPractice",
      headerName: "ลำดับการซ้อม",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <React.Fragment>
            {value?.length == 1 ? (
              <React.Fragment>0{value}</React.Fragment>
            ) : (
              <React.Fragment>{value}</React.Fragment>
            )}
          </React.Fragment>
        </Typography>
      ),
      width: 120,
    },
    {
      field: "orderPlay",
      headerName: "ลำดับการเล่น",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <React.Fragment>
            {value?.length == 1 ? (
              <React.Fragment>0{value}</React.Fragment>
            ) : (
              <React.Fragment>{value}</React.Fragment>
            )}
          </React.Fragment>
        </Typography>
      ),
      width: 100,
    },
    {
      field: "distance",
      headerName: "ระยะทางที่ได้",
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <React.Fragment>
            {value?.length == 1 ? (
              <React.Fragment>0{value}</React.Fragment>
            ) : (
              <React.Fragment>{value}</React.Fragment>
            )}
          </React.Fragment>
        </Typography>
      ),
      width: 120,
    },
    {
      headerName: "การดำเนินการ",
      field: ".",
      width: 180,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedTeam(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => router.push("/team/edit?id=" + row.id)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="start"
            size="large"
            onClick={() => router.push("/team/" + row.id)}
          >
            <PlayCircleFilledWhiteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Layout>
      {/* Summary Icons */}
      <DataGrid
        sx={{ backgroundColor: "white", height: "100vh", width: "80vw" }}
        rows={teamList ?? []}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25]}
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
      />
      {showDialog()}
    </Layout>
  );
};

export default withAuth(TeamPage);
