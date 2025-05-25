import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  Paper,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

interface ParticipantManagerProps {
  participantIds: string[];
  onUpdateParticipants: (ids: string[]) => void;
}

const ParticipantManager: React.FC<ParticipantManagerProps> = ({
  participantIds,
  onUpdateParticipants,
}) => {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState<{ id: string; name?: string }[]>([]);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");

  // Parse the participant IDs into individual participants on component mount
  useEffect(() => {
    // If the participantIds array contains a single string with comma-separated values,
    // split it into individual IDs
    if (participantIds.length === 1 && participantIds[0].includes(',')) {
      const ids = participantIds[0].split(',');
      setParticipants(ids.map(id => ({ id: id.trim() })));
    } else {
      // Otherwise, assume they are already individual IDs
      setParticipants(participantIds.map(id => ({ id })));
    }
  }, [participantIds]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setNewId("");
    setNewName("");
  };

  const handleSave = () => {
    // Combine all participant IDs into a single array
    const updatedIds = participants.map(p => p.id);
    onUpdateParticipants(updatedIds);
    
    // Show success message
    setSnackbarMessage("Participants updated successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    
    handleClose();
  };

  const handleAdd = () => {
    if (!newId.trim()) {
      setSnackbarMessage("Please enter a participant ID");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Check if ID already exists
    if (participants.some(p => p.id === newId.trim())) {
      setSnackbarMessage("This participant ID already exists");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (editIndex !== null) {
      // Update existing participant
      const updatedParticipants = [...participants];
      updatedParticipants[editIndex] = {
        id: newId.trim(),
        name: newName.trim() || undefined,
      };
      setParticipants(updatedParticipants);
      setEditIndex(null);
    } else {
      // Add new participant
      setParticipants([
        ...participants,
        { id: newId.trim(), name: newName.trim() || undefined },
      ]);
    }

    // Reset form
    setNewId("");
    setNewName("");
  };

  const handleEdit = (index: number) => {
    const participant = participants[index];
    setNewId(participant.id);
    setNewName(participant.name || "");
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants.splice(index, 1);
    setParticipants(updatedParticipants);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PersonSearchIcon />}
        onClick={handleOpen}
        sx={{
          mb: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Manage Participants
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "primary.main", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">Manage Race Participants</Typography>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              {editIndex !== null ? "Edit Participant" : "Add New Participant"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
              <TextField
                label="Participant ID"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                helperText="Enter the runner's unique ID from Göteborgsvarvet"
              />
              <TextField
                label="Name (Optional)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                helperText="Optional: Add a note or name to identify this participant"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                startIcon={editIndex !== null ? <EditIcon /> : <AddIcon />}
                sx={{ minWidth: 120, alignSelf: { xs: "flex-start", sm: "center" } }}
              >
                {editIndex !== null ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
            Current Participants ({participants.length})
          </Typography>
          
          <Paper variant="outlined" sx={{ maxHeight: 300, overflow: 'auto' }}>
            <List dense>
              {participants.length > 0 ? (
                participants.map((participant, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={
                        <Typography fontWeight="medium">
                          {participant.id}
                        </Typography>
                      }
                      secondary={participant.name && (
                        <Typography variant="body2" color="text.secondary">
                          {participant.name}
                        </Typography>
                      )}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit">
                        <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)} sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No participants added yet" />
                </ListItem>
              )}
            </List>
          </Paper>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ParticipantManager;
