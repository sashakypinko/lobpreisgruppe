import { Grid } from '@mui/material';

import { useView } from '@/components/listControls/hooks/viewHook';
import LoadingItemCardLine from '@/components/loading/LoadingItemCardLine';
import BasicConfig from '@/components/config/BasicConfig';
import LoadingItemCardTile from '@/components/loading/LoadingItemCardTile';

const LoadingItems = () => {
  const view = useView();
  return (
    <Grid container spacing={3}>
      {
        Array(12).fill(null).map((el, i) => (
          view === BasicConfig.viewTypes[0].name
            ? <LoadingItemCardTile key={`loading-${i}`} />
            : <LoadingItemCardLine key={`loading-${i}`} />
        ))
      }
    </Grid>
  );
};

export default LoadingItems;
