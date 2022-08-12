import Layout from "@/components/Layouts/Layout";
import {
  Box,
  Button,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useRef, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState(3); // 25 minutes
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);
  const firstStart: any = useRef(true);
  const tick: any = useRef();

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }
    console.log("subsequent renders");
    console.log(start);
    if (start) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      console.log("clear interval");
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    setReset(false)
    if(timer ===0){
      setTimer(600)
    }
    setStart(!start);
  };

  const resetButton = () => {
    setStart(false);
    setReset(true)
    setTimer(600);
  };

  const [userText, setUserText] = useState("");
  const handleUserKeyPress = useCallback((event: any) => {
    const { key, keyCode } = event;
    if (keyCode === 33) {
      setStart(!start);
    }
    if (key === "0") {
      setTimer(600);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const dispSecondsAsMins = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    console.log(seconds_);
    console.log(mins);

    if (start | reset){
      var element = document.getElementById("timer");
      element?.classList.remove("blink_me");
    }

    if (mins === -1 && seconds_ === -1) {
      var element = document.getElementById("timer");
      element?.classList.add("blink_me");
      setStart(false);
      setTimer(0);
    } 
    return (
      mins.toString() + ":" + (seconds_ == -1 ? "00" : seconds_.toString())
    );
  };

  let theme = createTheme({
    typography: {
      fontSize: 500,
      button: {
        fontSize: 90,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <Layout>
      <div className="Timer text-align-center">
        <ThemeProvider theme={theme}>
          <Typography
            id="timer"
            align="center"
            sx={{ mt: -15, mb: -10, color: "black", fontWeight: 400 }}
          >
            {dispSecondsAsMins(timer)}
          </Typography>
          <Box align="center">
            <Button onClick={resetButton}> RESET </Button>
            <Button sx={{ mx: 10 }} onClick={toggleStart}>
              {" "}
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

export default Timer;
