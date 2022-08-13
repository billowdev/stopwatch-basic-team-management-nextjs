import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import { getTeam } from "@/services/teamService";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { getHistory } from "@/services/historyService";
import { HistoryData } from "@/models/history.model";
import { useAppDispatch } from "@/store/store";
import { createTeamHistory } from "@/store/slices/historySlice";

type Props = {
  team: TeamData;
  history: HistoryData;
};

const TeamInterface = ({ team, history }: Props) => {
  const [stopwatch, setStopwatch] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const firstStart: any = useRef(true);
  const tick: any = useRef();
  const dispatch = useAppDispatch();

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
    var element = document.getElementById("stopwatch");
    setStart(false);
    setReset(true);
    setStopwatch(0);
  };

  const timeStampHandle = async () => {
    const data = {TeamId: team.id, timestamp:  String(stopwatch)}
    const create = await dispatch(createTeamHistory(data));
    if (create.meta.requestStatus === "rejected") {
      alert("timestap failed");
    } else {
      alert("timestap successfuly");
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
      // console.log("first render, don't run useEffect for Stopwatch");
      firstStart.current = !firstStart.current;
      return;
    }
    // console.log("subsequent renders");
    // console.log(start);
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

  return (
    <Layout>
      {team && (
        <>
          <h2>
            คุณกำลังอยู่ใน อินเทอร์เฟส ของทีม {team.name} ซึ่งเป็นทีมที่{" "}
            {team.number} จากโรงเรียน {team.school}
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
          <Box >
            <Button onClick={resetButton}> RESET </Button>
            <Button sx={{ mx: 10 }} onClick={toggleStart}>
              {!start ? "START" : "STOP"}
            </Button>
          </Box>
        </ThemeProvider>

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
    </Layout>
  );
};
export default TeamInterface;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.params;
  if (id) {
    const team = await getTeam(id);
    const history = await getHistory(id);
    return {
      props: {
        team,
        history,
      },
    };
  } else {
    return { props: {} };
  }
};
