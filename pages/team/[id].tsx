import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import { getTeam } from "@/services/teamService";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  createTheme,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  IconButton,
  Stack,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { getHistory, getHistoryByTeamId } from "@/services/historyService";
import { HistoryData } from "@/models/history.model";
import { useAppDispatch } from "@/store/store";
import {
  createTeamHistory,
  deleteHistory,
  fetchHistoryByTeamId,
} from "@/store/slices/historySlice";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import withAuth from "@/components/withAuth";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Moment from "react-moment";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  team: TeamData;
  histories: HistoryData[];
};

const TeamInterface = ({ team, histories }: Props) => {
  const router = useRouter();
  const [stopwatch, setStopwatch] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const firstStart: any = useRef(true);
  const tick: any = useRef();
  const dispatch: any = useAppDispatch();
  const [historyState, setHistoryState] = useState(histories);
  // const [audio] = useState(
  //   typeof Audio !== "undefined" &&
  //     new Audio("/static/sound/mixkit-racing-countdown-timer-1051.mp3")
  // );

  // const [startAudio] = useState(
  //   typeof Audio !== "undefined" &&
  //     new Audio("/static/sound/mixkit-water-sci-fi-bleep-902.mp3")
  // );

  // const [resetAudio] = useState(
  //   typeof Audio !== "undefined" &&
  //     new Audio("/static/sound/mixkit-hard-click-1118.mp3")
  // );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

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
            หากคุณลบประวัติการบันทึกเวลาแล้ว จะไม่สามารถกู้คืนข้อมูลได้ !
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

  const handleDeleteConfirm = async () => {
    if (selectedHistory) {
      await dispatch(deleteHistory(String(selectedHistory)));
      await dispatch(fetchHistoryByTeamId(team.id));
      setOpenDialog(false);
    }
  };

  let theme = createTheme({
    typography: {
      fontSize: 400,
      button: {
        fontSize: 90,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const dispSecondsAsMins = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;

    if (start) {
      var element = document.getElementById("stopwatch");
      element?.classList.remove("blink_me");
    }

    return (
      (mins === 10 ? "" : "0") +
      mins.toString() +
      ":" +
      (seconds_ == -1 ? "00" : (seconds_ < 10 ? "0" : "") + seconds_.toString())
    );
  };

  const toggleStart = () => {
    // resetAudio.play();
    if (stopwatch === 0) {
      // startAudio.play();
    }
    setReset(false);
    setStart(!start);
  };

  const resetButton = () => {
    // var element = document.getElementById("stopwatch");
    setStart(false);
    setReset(true);
    setStopwatch(0);
  };

  const timeStampHandle = async () => {
    console.log(histories.length);
    const data = { TeamId: team.id, timestamp: String(stopwatch) };
    const create = await dispatch(createTeamHistory(data));
    if (create.meta.requestStatus === "rejected") {
      alert("timestap failed");
    } else {
      const teamId = router.query.id;
      await dispatch(fetchHistoryByTeamId(String(teamId))).then((resp: any) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setHistoryState(resp.payload);
          toast.success(
            `บันทึกเวลาสำเร็จ ${stopwatch} วินาที โปรดตรวจสอบที่ประวัติการบันทึกเวลา`
          );
        }
      });
    }
  };

  const handleUserKeyPress = useCallback((event: any) => {
    const { key, keyCode } = event;
    if (keyCode === 33) {
      setStart(!start);
      // resetAudio.play();
    }
    if (key === "0") {
      setStopwatch(0);
      // resetAudio.play();
    }
  }, []);

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => {
        setStopwatch((stopwatch) => stopwatch + 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [selectedHistory, setSelectedHistory] = React.useState<any | null>(
    null
  );

  const TeamHistoryColumns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 280 },
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
      {team && (
        <>
          <h2>
            คุณกำลังอยู่ใน อินเทอร์เฟส ของทีม {team.name} ซึ่งเป็นทีมที่{" "}
            {team.orderPlay} จากโรงเรียน {team.school}
          </h2>
          <Box>
            <h3>เวลาที่ใช้ในรอบปัจจุบัน {stopwatch} วินาที</h3>
            {stopwatch < 3 ? (
              <Button variant="contained" disabled>
                บันทึกเวลา
              </Button>
            ) : (
              <Button variant="contained" onClick={timeStampHandle}>
                บันทึกเวลา
              </Button>
            )}
          </Box>
        </>
      )}
      {/* <Button variant="outlined">Outlined</Button> */}

      <div className="Stopwatch text-align-center">
        <ThemeProvider theme={theme}>
          <Typography
            id="stopwatch"
            align="center"
            sx={{ mt: -15, mb: -10, color: "black", fontWeight: 400 }}
          >
            {dispSecondsAsMins(stopwatch)}
          </Typography>
          <Box textAlign="center">
            <Button onClick={resetButton}> RESET </Button>
            <Button sx={{ mx: 10 }} onClick={toggleStart}>
              {!start ? "START" : "STOP"}
            </Button>
          </Box>
        </ThemeProvider>

        {histories && (
          <>
            <Typography variant="h4" sx={{ mt: 3 }}>
              ประวัติการบันทึกเวลา ไม่เกิน 3 ครั้ง
            </Typography>

            <Divider />

            {/* <DataGrid
              sx={{ backgroundColor: "white", height: "70vh" }}
              rows={histories ?? []}
              
              columns={TeamHistoryColumns}
              pageSize={15}
              rowsPerPageOptions={[15]}
              autoHeight={true}
              componentsProps={{
                panel: {
                  anchorEl: filterButtonEl,
                },
                toolbar: {
                  setFilterButtonEl,
                },
              }}
            /> */}

            <Box sx={{ mt: 2 }}>
              {historyState.map((history, idx) => (
                <>
                  <Alert severity="success">
                    ครั้งที่ {idx + 1} ---- {history.timestamp} วินาที
                    {history.id}
                  </Alert>

                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => {
                      setSelectedHistory(history.id);
                      setOpenDialog(true);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </>
              ))}
            </Box>
          </>
        )}

        <style jsx global>
          {`
            .blink_me {
              animation: blinker 1s linear infinite;
            }

            @keyframes blinker {
              50% {
                opacity: 0;
                color: red;
              }
            }
          `}
        </style>
      </div>
      {showDialog()}
    </Layout>
  );
};
export default withAuth(TeamInterface);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.params;
  if (id) {
    const team = await getTeam(id);
    let histories = await getHistoryByTeamId(id);
    return {
      props: {
        team,
        histories,
      },
    };
  } else {
    return { props: {} };
  }
};
