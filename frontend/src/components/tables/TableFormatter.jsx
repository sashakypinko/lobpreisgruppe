import {
  Box, IconButton, LinearProgress, Tooltip, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Trans, useTranslation } from 'react-i18next';
import { Fragment, useMemo, useState } from 'react';
import axios from 'axios';
import {
  ChatBubbleOutline, OpenInNew, Person, PersonOff, Delete, EditOutlined, Send,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

import useClasses, { createClassName } from '@/components/layout/hooks/useClasses';
import PriceDisplay from '@/components/prices/PriceDisplay';
import Connections, { ApiEndpoints, getImagefileUrl, getTyreLabelUri } from '@/components/connections/Connections';
import { ScheduleDetailsText } from '@/screens/orders/ScheduleDetailsTable';
import ThemeColors, { CustomGroupColors } from '@/components/layout/theme/ThemeColors';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import { UserStatuses } from '@/screens/users/enums/UserEnums';
import { OrderStatuses } from '@/screens/orders/OrderEnums';
import Hide from '@/components/layout/Hide';
import UrlHelper from '@/components/connections/UrlHelper';
import StringHelper from '@/components/helpers/StringHelper';
import CustomButton from '@/components/inputs/buttons/CustomButton';
import useConfirm from '@/components/dialogs/hooks/useConfirm';
import DnDConverter from '@/components/widgets/DnDConverter';
import { NotificationTypes } from '@/screens/notifications/enums/NotificationEnums';
import CustomSelect from '@/components/inputs/CustomSelect';
import useSnackbar from '@/components/dialogs/snackbars/hooks/useSnackbar';

import DateHelper from '../helpers/DateHelper';

const styles = {
  box: { cursor: 'pointer' },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,
  },
  noWrap: {
    maxWidth: 450,
  },
  mobileButton: {
    marginBottom: '7px',
  },
};

const AvailableProgressBar = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--theme-palette-success-contrastText)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'var(--theme-palette-success-main)',
  },
}));

const UnavailableProgressBar = styled(LinearProgress)({
  height: 10,
  borderRadius: 4,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--theme-palette-error-contrastText)',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'var(--theme-palette-error-main)',
  },
});

export const StockFormatter = ({
  row: {
    stock,
    comment,
    promisedDate,
  },
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      {!!(comment || promisedDate) && promisedDate !== 'none' && (
        <Tooltip
          title={(
            <>
              {comment && <>{comment}<br /></>}
              {promisedDate && (
                <>
                  <Typography variant="caption">{t('promisedDate')}</Typography><br />
                  {DateHelper.getPromisedDate(promisedDate)}
                </>
              )}
            </>
          )}
          classes={{
            tooltip: createClassName({
              backgroundColor: CustomGroupColors.greyTwo,
              color: ThemeColors.primaryText,
              border: `1px solid ${CustomGroupColors.blue}`,
              fontWeight: 500,
              boxShadow: '1px 1px 4px',
              padding: '5px 10px 8px 10px',
            }),
          }}
        >
          <ChatBubbleOutline sx={{
            marginLeft: 'auto',
            cursor: 'pointer',
          }}
          />
        </Tooltip>
      )}
      <Typography textAlign="center" fontWeight="bold">{stock}</Typography>
      {stock ? (
        <AvailableProgressBar
          variant="determinate"
          value={Math.min(stock, 100)}
        />
      ) : <UnavailableProgressBar variant="determinate" value={100} />}
    </Box>
  );
};

StockFormatter.propTypes = {
  row: PropTypes.shape({
    stock: PropTypes.number,
    comment: PropTypes.string,
    promisedDate: PropTypes.string,
  }).isRequired,
};

export const LabelFormatter = ({
  row: {
    tyreKits,
    label,
  },
  renderProps: { setLabelPreviewUrls },
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);
  const [useLabel, setUseLabel] = useState(false);

  const { eprelId: mainEprelId } = tyreKits[0];

  let thumb = useLabel ? label : '';
  const urlList = useLabel ? [label] : [];

  if (mainEprelId) {
    thumb = getTyreLabelUri(mainEprelId);

    urlList.push(...tyreKits.map(({ eprelId }) => getTyreLabelUri(eprelId)));
  }

  if (!thumb && !label) return null;

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      onClick={() => setLabelPreviewUrls(urlList)}
      className={classes.box}
    >
      <img
        src={useLabel ? label : thumb}
        onError={() => setUseLabel(true)}
        alt={t('tyreLabel')}
        height={50}
        width="auto"
      />
    </Box>
  );
};

LabelFormatter.propTypes = {
  row: PropTypes.shape({
    label: PropTypes.string,
    tyreKits: PropTypes.arrayOf(PropTypes.shape({
      eprelId: PropTypes.string,
    })).isRequired,
  }).isRequired,
  renderProps: PropTypes.shape({
    setLabelPreviewUrls: PropTypes.func,
  }).isRequired,
};

const path = getImagefileUrl('/winterwheels/images/');

/* IMPORTANT:
  Needs to set AllowCrossOrigin at the server for subdomain files...
  location ~ ^/winterwheels/images/$ {
  autoindex on;
  autoindex_format json;
}
*/
async function getTyreImages() {
  return axios.get(path);
}

let availableTyreImages;
getTyreImages()
  .then(tyreImages => {
    availableTyreImages = Object
      .entries(tyreImages.data)
      .map(imgData => imgData[1].name.match(/(.*)(\.jpg|\.png)/)[0]);
  });

export const RimFormatter = ({
  row: {
    rim,
    name,
  },
  renderProps: { setRimPreviewImage },
}) => {
  let tyreImage = null;
  availableTyreImages.some(img => {
    if (img === `${rim}.jpg` || img === `${rim}.png`) {
      tyreImage = img;
      return true;
    }
    return false;
  });

  if (tyreImage === null) return null;
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      onClick={() => setRimPreviewImage(`${path}${tyreImage}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        id={`tyreImage_${rim}`}
        src={`${path}${tyreImage}`}
        onError={() => {
          document.getElementById(`tyreImage_${rim}`).style.display = 'none';
        }}
        height={50}
        width="auto"
        alt=""
        title={name}
      />
    </Box>
  );
};

RimFormatter.propTypes = {
  row: PropTypes.shape({
    rim: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  renderProps: PropTypes.shape({
    setRimPreviewImage: PropTypes.func,
  }).isRequired,
};

export const DealerCodeWithLink = (
  { row: { dealerCode } },
) => (
  <CustomLink to={`${UrlEnums.DEALERS}/${dealerCode}`}>
    {dealerCode}
    <IconButton size="small" sx={{ pl: 1, pt: 1 }}>
      <OpenInNew fontSize="small" sx={{ height: 18, width: 18 }} />
    </IconButton>
  </CustomLink>
);

DealerCodeWithLink.propTypes = {
  row: PropTypes.shape({
    dealerCode: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export const StatusRenderer = (
  {
    row: {
      status,
      _id,
    },
    renderProps: { changeStatus },
  },
) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={status === UserStatuses.ACTIVE ? t('subDealers.isActive') : t('subDealers.isInactive')}>
      <Button
        onClick={() => changeStatus({
          _id,
          status: status === UserStatuses.ACTIVE
            ? UserStatuses.INACTIVE
            : UserStatuses.ACTIVE,
        })}
      >
        {status === UserStatuses.ACTIVE ? <Person /> : <PersonOff />}
      </Button>
    </Tooltip>
  );
};

StatusRenderer.propTypes = {
  row: PropTypes.shape({
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  renderProps: PropTypes.shape({
    changeStatus: PropTypes.func,
  }).isRequired,
};

export const TotalSumFormatter = (
  {
    row: {
      totalSum,
      currency,
    },
  },
) => <PriceDisplay currency={currency} value={totalSum} />;

TotalSumFormatter.propTypes = {
  row: PropTypes.shape({
    totalSum: PropTypes.number,
    currency: PropTypes.string,
  }).isRequired,
};

export const OrderStatusFormatter = (
  { row: { status } },
) => <Trans>orderStatus.{status || OrderStatuses.OPEN}</Trans>;

OrderStatusFormatter.propTypes = {
  row: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
};

export const ItemsFormatter = ({
  row: {
    items,
    currency,
    orderNumber,
  },
}) => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  const mappedItems = useMemo(() => {
    const itemsProSupplier = {};

    for (const item of items) {
      if (itemsProSupplier[item.supplier]) {
        itemsProSupplier[item.supplier].push(item);
      } else {
        itemsProSupplier[item.supplier] = [item];
      }
    }

    return itemsProSupplier;
  }, [items]);

  return Object.entries(mappedItems)
    .map(([supplier, supplierItems]) => (
      <Fragment key={supplier}>
        <Typography fontWeight="bold">{supplier}</Typography>
        {supplierItems.map(({
          ean,
          productDescription,
          orderReferenceId,
          quantity,
          dealerReference,
          scheduleDetails,
          brandText,
          grossPrice,
          discountPrice,
          supplierCode,
          isThirdPartyDelivery,
        }) => (
          <div
            key={ean}
            className={classes.textDiv}
          >
            <Typography
              noWrap
              className={classes.noWrap}
            >
              {quantity} x {productDescription} (
              <PriceDisplay value={discountPrice || grossPrice} currency={currency} symbols />
              )
            </Typography>
            <Typography variant="caption">{brandText}</Typography>
            <Typography variant="caption">{t('supplierReference')}: {orderReferenceId}</Typography>
            <Typography variant="caption">{t('dealerReference')}: {orderNumber}</Typography>
            <Typography variant="caption">
              {`${t('ean')}: ${ean} / ${t('products.productCode')}: ${supplierCode}`}
            </Typography>
            {dealerReference && <Typography variant="caption">{t('dealerReference')}: {dealerReference}</Typography>}
            <ScheduleDetailsText scheduleDetails={scheduleDetails} />
            {isThirdPartyDelivery && <Typography variant="caption">{t('thirdPartyDelivery')}</Typography>}
          </div>
        ))}
      </Fragment>
    ));
};

ItemsFormatter.propTypes = {
  row: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      ean: PropTypes.string,
      productDescription: PropTypes.string,
      orderReferenceId: PropTypes.string,
      quantity: PropTypes.number,
      dealerReference: PropTypes.string,
      scheduleDetails: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        time: PropTypes.string,
      })),
      brandText: PropTypes.string,
      discountPrice: PropTypes.number,
      supplierCode: PropTypes.string,
    })).isRequired,
    currency: PropTypes.string,
    orderNumber: PropTypes.string,
  }).isRequired,
};

export const TyreDimensionFormatter = ({ row: { tyreKits } }) => tyreKits.map(({ text }, i) => (
  <Fragment key={`${text}${i}`}>{text}<br /></Fragment>
));

export const TyreTypeFormatter = ({ row: { tyreType } }) => {
  const typeCode = tyreType.split('-')[0].trim();
  const { t } = useTranslation();

  if (typeCode.toLowerCase() === 'nof') {
    return (
      <img
        src="/img/snow.svg"
        width={45}
        alt={t('friction.nordic')}
        title={t('friction.nordic')
          .toLowerCase()}
      />
    );
  }
  if (typeCode.toLowerCase() === 'euf') {
    return (
      <img
        src="/img/snow_eu.svg"
        width={45}
        alt={t('friction.eu')}
        title={t('friction.eu')
          .toLowerCase()}
      />
    );
  }
  return (
    <img
      src="/img/studded.svg"
      width={45}
      alt={t('friction.studded')}
      title={t('friction.studded')
        .toLowerCase()}
    />
  );
};

TyreTypeFormatter.propTypes = {
  row: PropTypes.shape({
    tyreType: PropTypes.string,
  }).isRequired,
};

export const SupplierLogoFormatter = ({
  row: {
    logo,
    name,
  },
}) => (logo
  ? (
    <img
      src={logo}
      width={45}
      alt={name}
      title={name}
    />
  )
  : '');

SupplierLogoFormatter.propTypes = {
  row: PropTypes.shape({
    logo: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

const formatDate = (string, data) => {
  const createdDate = new Date(string);
  return DateHelper.getFormattedDate(createdDate, 'uk', data);
};

export const DateFormatter = ({ row: { createdAt } }) => formatDate(createdAt);

export const DateFormatterUpdated = ({ row: { updatedAt } }) => formatDate(updatedAt);

export const LastOrderDateFormatter = ({ row: { lastOrderDate } }) => (
  <div style={{ textAlign: 'center' }}>
    {lastOrderDate ? formatDate(lastOrderDate, {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
    }) : '-'}
  </div>
);

LastOrderDateFormatter.propTypes = {
  row: PropTypes.shape({
    lastOrderDate: PropTypes.string,
  }).isRequired,
};

export const OrdersCountFormatter = ({ row: { ordersCount } }) => (
  <div style={{ textAlign: 'center' }}>
    {ordersCount}
  </div>
);

OrdersCountFormatter.propTypes = {
  row: PropTypes.shape({
    ordersCount: PropTypes.number,
  }).isRequired,
};

export const RemoveSubDealerFormatter = ({
  row,
  renderProps: { deleteUser },
}) => (
  <Button onClick={() => deleteUser(row)}>
    <Delete />
  </Button>
);

RemoveSubDealerFormatter.propTypes = {
  row: PropTypes.object.isRequired,
  renderProps: PropTypes.shape({
    deleteUser: PropTypes.func,
  }).isRequired,
};

export const EditTemplateFormatter = ({
  row: {
    _id,
    templateName,
  },
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Hide mdUp>
        <CustomLink
          button
          to={UrlHelper.replaceParamsInReactUrl(UrlEnums.EDIT_NOTIFICATION_TEMPLATE, { id: _id })}
          buttonProps={{
            fullMobile: true,
            'aria-label': 'edit',
          }}
        >
          {t('edit')}
        </CustomLink>
      </Hide>
      <Hide mdDown>
        <CustomLink
          plain
          to={UrlHelper.replaceParamsInReactUrl(UrlEnums.EDIT_NOTIFICATION_TEMPLATE, { id: _id })}
        >
          <Tooltip title={<>{t('edit')} {StringHelper.truncate(templateName, 15)}</>}>
            <IconButton size="large">
              <EditOutlined color="primary" />
            </IconButton>
          </Tooltip>
        </CustomLink>
      </Hide>
    </>
  );
};

EditTemplateFormatter.propTypes = {
  row: PropTypes.shape({
    templateName: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export const SupplierActionsFormatter = ({
  row: {
    _id,
    name,
  },
  onRemove,
}) => {
  const { t } = useTranslation();
  const handleRemove = () => onRemove(_id);

  return (
    <>
      <Hide mdUp>
        <CustomLink
          button
          to={UrlHelper.replaceParamsInReactUrl(UrlEnums.EDIT_SUPPLIER_PROFILE, { id: _id })}
          buttonProps={{
            fullMobile: true,
            'aria-label': 'edit',
            style: styles.mobileButton,
          }}
        >
          {t('edit')}
        </CustomLink>
      </Hide>
      <Hide mdUp>
        <CustomButton
          onClick={handleRemove}
          color="primary"
        >
          {t('remove')}
        </CustomButton>
      </Hide>
      <Hide mdDown>
        <CustomLink
          plain
          to={UrlHelper.replaceParamsInReactUrl(UrlEnums.EDIT_SUPPLIER_PROFILE, { id: _id })}
        >
          <Tooltip title={<>{t('edit')} {StringHelper.truncate(name, 15)}</>}>
            <IconButton size="large">
              <EditOutlined color="primary" />
            </IconButton>
          </Tooltip>
        </CustomLink>
        <Tooltip title={<>{t('remove')} {StringHelper.truncate(name, 15)}</>}>
          <IconButton size="large" onClick={handleRemove}>
            <Delete color="primary" />
          </IconButton>
        </Tooltip>
      </Hide>
    </>
  );
};

SupplierActionsFormatter.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  onRemove: PropTypes.func,
};

export const SendNotificationFormatter = ({
  row: {
    elements,
    subject,
  },
  renderProps: {
    countries = [],
  },
}) => {
  const [type, setType] = useState(NotificationTypes.MAINTENANCE);
  const [country, setCountry] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const {
    createSuccessSnackbar,
    createErrorSnackbar,
  } = useSnackbar();

  const sendNotification = async () => {
    const viewElements = DnDConverter.convert(elements);
    const res = await Connections.postRequest(ApiEndpoints.createNotifications, {
      notification: {
        type,
        elements: viewElements,
        subject,
      },
      ...(country !== 'ALL' ? { country } : {}),
    });

    if (res.ok) {
      // createSuccessSnackbar(t('notificationSent'));
      setIsOpen(false);
    } else {
      createErrorSnackbar(t('sendingNotificationFailed'));
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="input-dialog"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="input-dialog">{t('sendNotification')}</DialogTitle>
        <DialogContent>
          <CustomSelect
            value={type}
            label={t('notificationType')}
            options={Object.values(NotificationTypes)
              .map(val => ({
                value: val,
                text: t(`notificationType.${val}`),
              }))}
            onChange={({ value }) => setType(value)}
          />
          <CustomSelect
            value={country}
            label={t('country')}
            options={
              countries.map(({
                name,
                iso3,
              }) => ({
                value: iso3,
                text: name,
              }))
            }
            onChange={({ value }) => setCountry(value)}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={() => setIsOpen(false)}
            color="primary"
          >
            {t('close')}
          </CustomButton>
          <CustomButton
            onClick={sendNotification}
            color="primary"
          >
            {t('send')}
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Hide mdUp>
        <CustomButton onClick={() => setIsOpen(true)} fullMobile>
          {t('send')}
        </CustomButton>
      </Hide>
      <Hide mdDown>
        <Tooltip title={t('sendNotification')}>
          <IconButton size="large" onClick={() => setIsOpen(true)}>
            <Send color="primary" />
          </IconButton>
        </Tooltip>
      </Hide>
    </>
  );
};

SendNotificationFormatter.propTypes = {
  row: PropTypes.shape({
    elements: PropTypes.object.isRequired,
    subject: PropTypes.string,
  }),
  renderProps: PropTypes.object,
};

export const RemoveTemplateFormatter = (
  {
    row: {
      _id,
      templateName,
    },
    renderProps: {
      afterRemove,
    },
  },
) => {
  const { t } = useTranslation();

  const {
    ConfirmDialog,
    openDialog,
  } = useConfirm();

  const deleteTemplate = async () => {
    const confirmed = await openDialog(t('deleteTemplateConfirmation'));

    if (!confirmed) return;

    const res = await Connections.postRequest(ApiEndpoints.removeTemplate, {
      _id,
    });

    if (res.ok) {
      afterRemove();
    }
  };

  return (
    <>
      {ConfirmDialog}
      <Hide mdUp>
        <CustomButton onClick={deleteTemplate} fullMobile>
          {t('remove')}
        </CustomButton>
      </Hide>
      <Hide mdDown>
        <Tooltip title={<>{t('remove')} {StringHelper.truncate(templateName, 15)}</>}>
          <IconButton size="large" onClick={deleteTemplate}>
            <Delete color="primary" />
          </IconButton>
        </Tooltip>
      </Hide>
    </>
  );
};
RemoveTemplateFormatter.propTypes =
  {
    row: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      templateName: PropTypes.string.isRequired,
    }),
    renderProps: PropTypes.object,
  };
export default {};
