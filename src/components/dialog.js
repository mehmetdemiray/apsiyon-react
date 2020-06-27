import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import WarningIcon from '@material-ui/icons/Warning';

export default function AlertDialog(props) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    props.type === "success" ? setOpen(props.saved) : setOpen(props.delete)
  }, [props])

  const handleClose = (res) => {
    props.modalResult(res)
    setOpen(false)
  }

  return (
    <div>
      <Dialog className="dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          {props.type === "success" ? 
            <DoneOutlineIcon className="alert-icon success" /> : <WarningIcon className="alert-icon warn" />
          }
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-buttons">
          {props.type !== "success" ? 
            <Button onClick={() => handleClose(true)} color="secondary" variant="contained">
              Evet
            </Button>: null
          }
          <Button variant="outlined" onClick={() => handleClose(false)} color="primary" autoFocus>
            {props.type === "success" ? "Tamam" : "Vazgeç"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}