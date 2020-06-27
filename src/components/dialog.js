/**
 * DIALOG/MODAL
 * Çoklu amaçlar için kullanılabilecek bir modal componenti
 * Success ve Warn olarak iki tipe cevap verir durumda.
 */

import React, { useEffect, useState } from 'react';

// MODULES
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// ICONS
import WarningIcon from '@material-ui/icons/Warning';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

// props ile kapsayısından veri alır. 
// aynı şekilde gerekirse gönderir.
export default function AlertDialog(props) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    props.type === "success" ? setOpen(props.saved) : setOpen(props.delete)
  }, [props])

  // Close sonrası veriyi parent component'e taşır. Aynı zamanda component state'ini false yapar modal'ı kapatır.
  // Buradaki üst komponente gidecek durum bu komponent'in type'ına göre JSX içerisinde yapılır.
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