import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

import CustomLink from '../inputs/CustomLink';

const styles = {
  image: {
    width: '100%',
    height: 'auto',
    verticalAlign: 'middle',
  },
};

const WrappedImage = ({
  item,
  onClick,
}) => {
  const {
    href, linkClass, linkProps = {}, alt, src, imageClass = '', imageProps = {}, imageSizes = {},
  } = item;
  const classes = useClasses(styles);
  // eslint-disable-next-line no-const-assign

  const { width = 1200, height = 400 } = imageSizes;
  const imageComponent = (
    <img
      className={`${classes.image} ${imageClass}`}
      src={src}
      data-src={src}
      alt={alt || src}
      width={width}
      height={height}
      {...imageProps}
    />
  );

  if (href) {
    return (
      <CustomLink
        tabIndex="-1"
        onClick={onClick}
        plain
        to={href}
        className={linkClass}
        {...linkProps}
      >
        {imageComponent}
      </CustomLink>
    );
  }

  return imageComponent;
};

WrappedImage.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default WrappedImage;
