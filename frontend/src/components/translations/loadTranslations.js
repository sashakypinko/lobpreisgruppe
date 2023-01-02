import axios from 'axios';

import BasicConfig from '@/components/config/BasicConfig';

const baseURL = `${BasicConfig.SERVER_URL}/${BasicConfig.API_VERSION}`;

const loadTranslations = async language => {
  try {
    const res = await axios.post(`${baseURL}/translations/getByLanguage`, { language });
    const translationData = JSON.parse(res.data.data.translation.data);

    Object.entries(translationData).forEach(([key, value]) => {
      if (!value) {
        delete translationData[key];
      }
    });

    return translationData;
  } catch (e) {
    console.error(e);
  }
};

export default loadTranslations;
