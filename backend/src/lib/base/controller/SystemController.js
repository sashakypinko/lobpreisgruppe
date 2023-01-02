// import sslCert from 'get-ssl-certificate';

import SystemSettingsServices from '#modules/systemSettings/SystemSettingsServices';

const SystemController = {
  async getCertExpireDate(ctx) {
    const settings = SystemSettingsServices.getSettings();
    let validTo = new Date();

    // await sslCert.get(settings.DOMAIN).then(certificate => {
    //   validTo = certificate.valid_to;
    // });

    return ctx.modS.responses.createSuccessResponse(ctx, {
      validTo,
    });
  },
};

export default SystemController;
