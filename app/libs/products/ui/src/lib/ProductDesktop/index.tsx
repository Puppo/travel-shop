import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { EVENTS, useEventBusSubscriber } from "@travel-shop-app/utils";
import { useNavigate } from "react-router-dom";
import { Product } from "../Product";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
  },
}));


export function DesktopProductPage() {
  const navigate = useNavigate();

  useEventBusSubscriber(EVENTS.PRODUCT.ADDED, () => {
    navigate("/products");
  })

  function handleClose() {
    navigate("/products");
  }


  return <BootstrapDialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={true}
    sx={{
      width: '450px',
      margin: 'auto'
    }}
  >
    <DialogContent dividers>
      <Product />
    </DialogContent>
  </BootstrapDialog>
}