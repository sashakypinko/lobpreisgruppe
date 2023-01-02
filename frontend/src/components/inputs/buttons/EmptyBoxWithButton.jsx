import {
  Apps, Close, Favorite, ShoppingCart,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import CustomLink from '../CustomLink';
import UrlEnums from '../../connections/enums/UrlEnums';

const icons = {
  apps: Apps,
  shopping_cart: ShoppingCart,
  favorite: Favorite,
  close: Close,
};

const EmptyBoxWithButton = ({
  text,
  icon,
  continueText,
}) => {
  const IconToView = icons[icon] || icons.close;
  return (
    <>
      <IconToView fontSize="large" />
      <Typography>{text}</Typography>
      <CustomLink
        buttonProps={{ color: 'primary', className: '' }}
        button
        to={UrlEnums.CATALOG}
      >{continueText}
      </CustomLink>
    </>
  );
};

export default EmptyBoxWithButton;

EmptyBoxWithButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  continueText: PropTypes.string,
};
