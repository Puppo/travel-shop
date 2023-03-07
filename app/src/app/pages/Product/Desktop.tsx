import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { EVENTS, useEventBusSubscriber } from "@travel-shop-app/utils";
import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

const Product = lazy(() => import("@travel-shop-app/products/ui").then((module) => ({ default: module.Product })));


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function DesktopProductPage() {
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
  >
    <DialogContent dividers>
      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </DialogContent>
  </BootstrapDialog>
}