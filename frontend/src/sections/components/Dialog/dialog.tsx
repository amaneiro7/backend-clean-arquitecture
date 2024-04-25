import { Dialog } from '../../mui/Dialog'
import { DialogActions } from '../../mui/DialogActions'
import { DialogContent } from '../../mui/DialogContent'
import { DialogContentText } from '../../mui/DialogContentText'
import { Button } from '../../mui/Button'
import { DialogTitle } from '../../mui/DialogTitle'
import { TextField } from '../../mui/TextField'
export default function DialogAdd ({
    open,
    handleClose,
    dialogValue,
    setDialogValue,
    handleSubmit
}) {
    return (
        <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) => {
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value
                })
              }
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) => {
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value
                })
              }
              }
              label="year"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    )
}