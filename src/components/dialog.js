import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(props.saved)
    console.log(props.saved)
  }, [props.saved])

  const handleClose = () => {
    props.modalResult(false)
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
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-buttons">
          {props.type !== "success" ? 
            <Button onClick={handleClose} color="primary">
              Evet
            </Button>: null
          }
          <Button variant="contained" onClick={handleClose} color="primary" autoFocus>
            {props.type === "success" ? "Tamam" : "Vazgeç"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}