import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useDevice = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('sm', 'md')
  );
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
