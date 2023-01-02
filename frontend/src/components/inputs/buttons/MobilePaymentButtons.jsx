import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';
import { CustomGroupColors } from '@/components/layout/theme/ThemeColors';

import CustomButton from './CustomButton';
import MobileBottom from './MobileBottom';

const styles = {
  price: {
    fontSize: '150%',
    marginLeft: 5,
  },
  buyNow: {
    minWidth: 150,
    flexGrow: 1,
    backgroundColor: CustomGroupColors.greyOne,
    color: CustomGroupColors.darkBlue,
    '&:hover': {
      color: '#fff',
      backgroundColor: CustomGroupColors.darkBlue,
    },
  },
  disabled: {
    backgroundColor: '#CCC !important',
  },
};

const MobilePaymentButtons = ({
  loading,
  canPlaceOrder,
  onClick,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  return (
    <MobileBottom>
      <CustomButton
        className={classes.buyNow}
        size="large"
        color="primary"
        disabled={!canPlaceOrder || loading}
        onClick={onClick}
        classes={{
          disabled: classes.disabled,
        }}
      >
        {
          loading
            ? t('cart.preparingOrder')
            : t('cart.placeOrder')
        }
      </CustomButton>
    </MobileBottom>
  );
};

export default MobilePaymentButtons;

MobilePaymentButtons.propTypes = {
  loading: PropTypes.bool,
  canPlaceOrder: PropTypes.bool,
  onClick: PropTypes.func,
};
