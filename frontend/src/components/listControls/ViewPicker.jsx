import {
  ViewList, ViewModule,
} from '@mui/icons-material';
import {
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import BasicConfig from '../config/BasicConfig';
import { useSetView, useView } from './hooks/viewHook';

const { viewTypes } = BasicConfig;

const viewIcons = {
  view_list: ViewList,
  default: ViewModule,
};

const ViewPicker = () => {
  const { t } = useTranslation();

  const view = useView();
  const setView = useSetView();

  return (
    <>
      {viewTypes.map(vt => {
        const IconToView = viewIcons[vt.icon] || viewIcons.default;
        return (
          <IconButton
            key={vt.name}
            aria-label={t(vt.translation)}
            onClick={() => {
              if (vt.name !== view) {
                setView(vt.name);
              }
            }}
            size="large"
          >
            <IconToView color={view === vt.name ? 'primary' : 'action'} />
          </IconButton>
        );
      })}
    </>
  );
};

export default ViewPicker;
