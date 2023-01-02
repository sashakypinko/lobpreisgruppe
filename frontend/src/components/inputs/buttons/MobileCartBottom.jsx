import { useState } from 'react';
import {
  ArrowForwardIos, KeyboardArrowUp, KeyboardArrowDown,
} from '@mui/icons-material';
import {
  Grid, Backdrop, Zoom, List,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useCartCalculations } from '@/screens/cart/hooks/cartHooks';
import CartListItems from '@/screens/cart/CartListItems';
import useClasses from '@/components/layout/hooks/useClasses';
import { CustomGroupColors } from '@/components/layout/theme/ThemeColors';

import CustomLink from '../CustomLink';
import PriceDisplay from '../../prices/PriceDisplay';
import UrlEnums from '../../connections/enums/UrlEnums';
import MobileBottom from './MobileBottom';
import CustomButton from './CustomButton';

const styles = {
  checkOrder: {
    backgroundColor: `${CustomGroupColors.darkBlue} !important`,
    color: 'white !Important',
    alignItems: 'center !Important',
  },
  bag: {
    color: 'white',
  },
  cartButton: {
    textAlign: 'center',
    display: 'flex',
    border: 'none',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center !Important',
    backgroundColor: 'white !Important',
    color: `${CustomGroupColors.blue} !Important`,
    '&:hover': {
      backgroundColor: `${CustomGroupColors.darkBlue} !Important`,
      color: 'white !Important',
    },
  },
  mainButton: {
    maxWidth: '50%',
    flex: 1,
    selfAlign: 'flex-end',
    color: 'white',
  },
  container: {
    gap: 1,
  },
  backdrop: {
    bottom: 57,
  },
  listItemsWrapper: {
    position: 'fixed',
    bottom: 57,
    borderRadius: 3,
    left: 0,
    top: 0,
    background: 'white',
    color: 'black',
    margin: 0,
    width: 450,
    maxWidth: '100%',
    overflowY: 'auto',
  },
};

const MobileCartBottom = () => {
  const classes = useClasses(styles);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    totalSum,
    currency,
  } = useCartCalculations();

  const { t } = useTranslation();

  return (
    <MobileBottom grey>
      <Backdrop
        open={openDialog}
        onClick={() => setOpenDialog(false)}
        className={classes.backdrop}
      />
      <Zoom in={openDialog}>
        <div
          className={classes.listItemsWrapper}
        >
          <List>
            <CartListItems />
          </List>
        </div>
      </Zoom>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <CustomButton
            className={classes.cartButton}
            variant="outline"
            color="inherit"
            size="small"
            onClick={() => setOpenDialog(!openDialog)}
          >
            {
              openDialog
                ? <KeyboardArrowDown />
                : <KeyboardArrowUp />
            }
            {t('total')} <PriceDisplay value={totalSum} currency={currency} symbols />
          </CustomButton>
        </Grid>
        <Grid item xs={6}>
          <CustomLink to={UrlEnums.CART}>
            <CustomButton
              className={classes.checkOrder}
              fullWidth
              endIcon={<ArrowForwardIos />}
              size="small"
            >
              {t('checkOrder')}
            </CustomButton>
          </CustomLink>
        </Grid>
      </Grid>
    </MobileBottom>
  );
};

export default MobileCartBottom;
