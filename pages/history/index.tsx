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
import {
  deleteHistory,
  getHistories,
  historiesSelector,
} from "@/store/slices/historySlice";
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
import Moment from "react-moment";

import DeleteIcon from "@mui/icons-material/Delete";
import { HistoryData } from "@/models/history.model";
import { TransitionProps } from "@mui/material/transitions";
import Link from "next/link";
import { TeamData } from "@/models/team.model";
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
   
  </GridToolbarContainer>
);

type Props = {};

const HistoryPage = ({}: Props) => {
  const dispatch = useAppDispatch();
  const historyList = useSelector(historiesSelector);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [selectedHistory, setSelectedHistory] =
    React.useState<HistoryData | null>(null);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    dispatch(getHistories());
  }, [dispatch]);

  const showDialog = () => {
    if (selectedHistory === null) {
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
          Confirm to delete the history? : {selectedHistory.id}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You cannot restore deleted history.
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
    if (selectedHistory) {
      dispatch(deleteHistory(String(selectedHistory.id)));
      setOpenDialog(false);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 280 },
    {
      field: "TeamSchool",
      valueGetter: (params) => {
        return params.row.team.school
      },
      headerName: "โรงเรียน",
      width: 240,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">{value}</Typography>
      ),
    },
    {
      field: "Team",
      valueGetter: (params: GridValueGetterParams<any, TeamData>) => {
        return params.getValue(params.id, "team").name;
      },
      headerName: "ทีม",
      width: 240,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">{value}</Typography>
      ),
    },
    {
      field: "timestamp",
      headerName: "บันทึกเวลา (วินาที)",
      width: 130,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">{value}</Typography>
      ),
    },
    {
      headerName: "TIME",
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
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          {/* <IconButton
            aria-label="edit"
            size="large"
            onClick={() => router.push("/history/edit?id=" + row.id)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton> */}
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedHistory(row);
              setOpenDialog(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Layout>
      {/* Summary Icons */}
      <DataGrid
        sx={{ backgroundColor: "white", height: "100vh", width: "80vw"}}
        rows={historyList ?? []}
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

export default withAuth(HistoryPage);
