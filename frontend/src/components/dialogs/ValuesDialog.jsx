import { useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useValues from '@/components/dataHandling/hooks/useValues';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextField from '@/components/inputs/CustomTextField';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  },
};

const ValuesDialog = ({
  title,
  text,
  open,
  defaultValues,
  inputs = [],
  onClose,
  onSave,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  const { values, handleChange, resetValues } = useValues({ defaultValues });

  useEffect(() => {
    resetValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, defaultValues]);

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="input-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="input-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
        <Grid container>
          {inputs.map((inputData, index) => {
            const {
              inputType, props, gridProps = { xs: 12 }, key = `values_dialog_input_${index}`,
            } = inputData;
            // eslint-disable-next-line react/prop-types
            const { name } = props;

            return (
              <Grid item {...gridProps} key={key}>
                {inputType === 'text' && (
                  <CustomTextField
                    fullWidth
                    onChange={handleChange}
                    {...props}
                    value={values[name]}
                  />
                )}
                {inputType === 'select' && (
                  <CustomSelect
                    fullWidth
                    onChange={handleChange}
                    {...props}
                    value={values[name]}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => onClose()}
          color="primary"
          className={classes.button}
        >
          {t('cancel')}
        </CustomButton>
        <CustomButton
          variant="outline"
          onClick={() => {
            onClose();
            onSave(values);
          }}
          intent="secondary"
          className={classes.button}
        >
          {t('save')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ValuesDialog;

ValuesDialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  defaultValues: PropTypes.object,
  inputs: PropTypes.arrayOf(PropTypes.object),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};
