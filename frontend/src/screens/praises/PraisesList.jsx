import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import PraiseItem from '@/screens/praises/PraiseItem';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  noResults: {
    textAlign: 'center',
    width: '100%',
    color: '#d32f2f',
  },
};

const PraisesList = ({
  praises,
  loading,
  Loading,
  onEdit,
  onDelete,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  if (loading) return <Loading/>;
  return (
    <>
      {
        praises.length
          ? praises.map(praise => (
            <PraiseItem
              key={praise._id}
              praise={praise}
              onEdit={onEdit}
              onDelete={onDelete}
              onConfirm={onConfirm}
            />
          ))
          : (
            <div className={classes.noResults}>
              {t('noResults')}
            </div>
          )
      }
    </>
  );
};

export default PraisesList;

PraisesList.propTypes = {
  praises: PropTypes.array,
  loading: PropTypes.bool,
  Loading: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
};
