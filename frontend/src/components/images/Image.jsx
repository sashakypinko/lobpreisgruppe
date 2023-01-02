import PropTypes from 'prop-types';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  itemContent: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
  },
  imageWrapper: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    objectFit: 'contain',
  },
};

const Image = ({ src, ...imageProps }) => {
  const classes = useClasses(styles);
  return (
    <div className={classes.imageWrapper}>
      <img
        alt="tyreImage"
        src={src}
        className={classes.image}
        {...imageProps}
      />
    </div>
  );
};

export default Image;

Image.propTypes = {
  src: PropTypes.string,
};

Image.defaultProps = {
  src: '/img/tyreDummy.png',
};
