import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Runner } from "../types/race";

interface RunnerCardProps {
  runner: Runner;
}

const formatTime = (time: number): string => {
  if (time === 0) return "-";
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const RunnerCard: React.FC<RunnerCardProps> = ({ runner }) => {
  const getLatestSplit = () => {
    const completedSplits = runner.splits.filter((split) => split.time > 0);
    return completedSplits.length > 0
      ? completedSplits[completedSplits.length - 1]
      : null;
  };

  const latestSplit = getLatestSplit();
  const progress = latestSplit ? (latestSplit.km / 21.097) * 100 : 0;
  const hasStarted = new Date(runner.startDateTime) <= new Date();
  const isRunning = hasStarted && !runner.finishTimeNet;

  // Add Logikfabriken split
  const splitsWithLogikfabriken = [
    ...runner.splits,
    {
      key: "logikfabriken",
      name: "Logikfabriken",
      km: 16.6,
      time: 0,
      estimated: false,
    },
  ].sort((a, b) => a.km - b.km);

  return (
    <Card
      elevation={1}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        border: "1px solid",
        borderColor: hasStarted ? "success.main" : "divider",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 4px 8px rgba(9, 30, 66, 0.25)",
          borderColor: hasStarted ? "success.main" : "primary.main",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          bgcolor: hasStarted ? "success.main" : "primary.main",
          color: "primary.contrastText",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          position: "relative",
          overflow: "hidden",
          backgroundImage: "url(/bg-pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontSize: "1.5rem",
            }}
          >
            {runner.displayName}
          </Typography>
          <Chip
            label={
              isRunning ? "Running" : hasStarted ? "Finished" : "Not Started"
            }
            size="small"
            color={isRunning ? "success" : hasStarted ? "default" : "warning"}
            variant="filled"
            sx={{
              fontWeight: 500,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            opacity: 0.9,
            fontWeight: 500,
            fontSize: "1.1rem",
          }}
        >
          Start:{" "}
          {new Date(runner.startDateTime).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Chip
            label={`#${runner.startNo}`}
            size="small"
            color="primary"
            variant="filled"
            sx={{
              fontWeight: 500,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
          <Chip
            label={runner.startGroup}
            size="small"
            color="secondary"
            variant="filled"
            sx={{
              fontWeight: 500,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
          <Chip
            label={`Age: ${runner.ageOnRaceDay}`}
            size="small"
            variant="outlined"
            sx={{
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
          <Chip
            label={`ID: ${runner.idParticipant.slice(-6)}`}
            size="small"
            variant="outlined"
            sx={{
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ width: "100%", mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem" }}
                >
                  Progress
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: "1.1rem" }}
                >
                  {progress.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 1,
                  bgcolor: "action.hover",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 1,
                    bgcolor: "primary.main",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "text.primary",
                letterSpacing: "-0.01em",
                fontSize: "1.2rem",
              }}
            >
              Split Times
            </Typography>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        fontSize: "1rem",
                      }}
                    >
                      Split
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        fontSize: "1rem",
                      }}
                    >
                      Distance
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        fontSize: "1rem",
                      }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 500,
                        bgcolor: "action.hover",
                        fontSize: "1rem",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {splitsWithLogikfabriken.map((split) => (
                    <TableRow
                      key={split.key}
                      sx={{
                        bgcolor: split.time > 0 ? "action.selected" : "inherit",
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                        ...(split.key === "logikfabriken" && {
                          backgroundImage: "url(/bg-pattern.png)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          opacity: 0.9,
                          color: "#fff",
                          "& td, & th": {
                            color: "#fff",
                          },
                        }),
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: "1rem" }}
                      >
                        {split.name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "1rem" }}>
                        {split.km.toFixed(2)} km
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "1rem" }}>
                        {formatTime(split.time)}
                      </TableCell>
                      <TableCell align="right">
                        {split.key !== "logikfabriken" && (
                          <Chip
                            label={
                              split.time > 0
                                ? split.estimated
                                  ? "Not Completed"
                                  : "Completed"
                                : "Pending"
                            }
                            size="small"
                            color={
                              split.time > 0
                                ? split.estimated
                                  ? "warning"
                                  : "success"
                                : "default"
                            }
                            variant={split.time > 0 ? "filled" : "outlined"}
                            sx={{
                              fontWeight: 500,
                              minWidth: 80,
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RunnerCard;
