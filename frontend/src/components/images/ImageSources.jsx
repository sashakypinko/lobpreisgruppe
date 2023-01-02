import { useTranslation } from 'react-i18next';
import {
  Box, Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';

import CustomTextField from '@/components/inputs/CustomTextField';
import FileDropZone from '@/components/files/FileDropZone';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  dropZoneWrapper: {
    width: '99%',
    textAlign: 'center',
  },
};

const ImageSources = ({
  src,
  onChange,
  name,
  fieldName,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  const handleChange = (file, callback) => {
    onChange({
      name: fieldName || name,
      value: file,
      callback,
    });
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Tooltip title={t('uploadImage')}>
          <div className={classes.dropZoneWrapper}>
            <FileDropZone
              style={{
                width: '100%',
              }}
              onLoadRawFile={handleChange}
              accept={{
                'image/*': [],
              }}
            />
          </div>
        </Tooltip>
      </Box>
      <Box>
        <CustomTextField value={src} label={t('src')} name="src" onChange={onChange} />
      </Box>
    </>
  );
};

ImageSources.propTypes = {
  src: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  fieldName: PropTypes.string,
};

export default ImageSources;
