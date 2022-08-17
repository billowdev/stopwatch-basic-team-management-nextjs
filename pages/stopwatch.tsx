import Layout from "@/components/Layouts/Layout";
import { TeamData } from "@/models/team.model";
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  createTheme,
  Grid,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {};

const StopWatch = ({}: Props) => {
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const firstStart: any = useRef(true);
  const tick: any = useRef();

  const [audio] = useState(
    typeof Audio !== "undefined" &&
      new Audio("/static/sound/mixkit-racing-countdown-timer-1051.mp3")
  );

  const [startAudio] = useState(
    typeof Audio !== "undefined" &&
      new Audio("/static/sound/mixkit-water-sci-fi-bleep-902.mp3")
  );

  const [resetAudio] = useState(
    typeof Audio !== "undefined" &&
      new Audio("/static/sound/mixkit-hard-click-1118.mp3")
  );

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
      var element = document.getElementById("timer");
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
    if (timer === 0) {
      // startAudio.play();
    }
    setReset(false);
    setStart(!start);
  };

  const resetButton = () => {
    // resetAudio.play();
    setStart(false);
    setReset(true);
    setTimer(0);
  };

  const handleUserKeyPress = useCallback((event: any) => {
    const { key, keyCode } = event;
    if (keyCode === 33) {
      setStart(!start);
      // resetAudio.play();
    }
    if (key === "0") {
      setTimer(0);
      // resetAudio.play();
    }
  }, []);

  useEffect(() => {
    if (firstStart.current) {
      // console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }
    // console.log("subsequent renders");
    // console.log(start);
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      // console.log("clear interval");
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
      <Typography align="center" variant="h4" sx={{ mt: 1 }}>
        นาฬิกาจับเวลา
      </Typography>

      <Box className="Timer text-align-center" sx={{mb: 8}}>
        <ThemeProvider theme={theme}>
          <Typography
            id="timer"
            align="center"
            sx={{ mt: -15, mb: -10, color: "black", fontWeight: 400 }}
          >
            {dispSecondsAsMins(timer)}
          </Typography>

          <Box textAlign='center'>
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
      </Box>
    </Layout>
  );
};
export default StopWatch;
