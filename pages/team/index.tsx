import Layout from "@/components/Layouts/Layout";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
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
  const dispatch = useAppDispatch();
  const teamList = useSelector(teamSelector);
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
      field: "number",
      headerName: "หมายเลขทีม",
      width: 90,
    },
    {
      field: "name",
      headerName: "ชื่อทีม",
      width: 200,
    },
    {
      field: "school",
      headerName: "โรงเรียน",
      width: 240,
    },
    {
      headerName: "วันที่สมัคร",
      field: "createdAt",
      width: 220,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: "ACTION",
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
        sx={{ backgroundColor: "white", height: "70vh" }}
        rows={teamList ?? []}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
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

export default TeamPage;
