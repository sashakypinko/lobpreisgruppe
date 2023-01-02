/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';

const useTranslations = (defaultLanguage, selectedLanguage) => {
  const [idDefault, setIdDefault] = useState(null);
  const [idSelected, setIdSelected] = useState(null);

  const [hasChanged, setHasChanged] = useState(false);

  const { loading, setLoading } = useLoading();
  const { isError, setIsError } = useState(false);
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  const onChange = (key, value, language) => {
    const item = rows.find(row => row.id === key);
    if (item[language] !== value) {
      setRows(rows.map(row => (row.id === key ? { ...row, [language]: value } : row)));
      setHasChanged(true);
    }
  };

  const onDelete = key => {
    setRows(rows.filter(row => row.id !== key));
    setHasChanged(true);
  };

  const onCreate = values => {
    setRows([...rows, values]);
    setHasChanged(true);
  };

  const saveLanguage = async (id, language, data) => {
    const res = await Connections.postRequest(ApiEndpoints.updateTranslation, {
      translation: {
        _id: id,
        language,
        data: JSON.stringify(data),
      },
    });
    return res.ok;
  };

  const onSave = async openDialog => {
    setLoading(true);

    const newDefaultData = {};
    const newSelectedLanguageData = {};
    const emptyDefaultValues = [];
    const emptySelectedLanguageValues = [];
    rows.forEach(row => {
      if (!row[defaultLanguage] || !row[defaultLanguage].trim()) {
        emptyDefaultValues.push(row.id);
      }

      if (!row[selectedLanguage] || !row[selectedLanguage].trim()) {
        emptySelectedLanguageValues.push(row.id);
      }
      newDefaultData[row.id] = row[defaultLanguage];
      newSelectedLanguageData[row.id] = row[selectedLanguage];
    });

    if (emptyDefaultValues.length) {
      const message = `${t('translations.emptyValueError')} ${defaultLanguage} \n"${emptyDefaultValues.join('"\n"')}"
      ${t('areYouSureYouWantToContinue')}`;

      const confirmed = await openDialog(message);

      if (!confirmed) {
        setLoading(false);
        return;
      }
    }

    if (selectedLanguage && emptySelectedLanguageValues.length) {
      const message = `${t('translations.emptyValueError')} ${selectedLanguage}
      "${emptySelectedLanguageValues.join('"\n"')}"
      ${t('areYouSureYouWantToContinue')}`;

      const confirmed = await openDialog(message);

      if (!confirmed) {
        setLoading(false);
        return;
      }
    }

    const resDefaultOk = await saveLanguage(idDefault, defaultLanguage, newDefaultData);
    let resSelectedOk = true;
    if (selectedLanguage) {
      resSelectedOk = await saveLanguage(idSelected, selectedLanguage, newSelectedLanguageData);
    }
    if (resDefaultOk && resSelectedOk) {
      setHasChanged(false);
    }

    setLoading(false);

    return resDefaultOk && resSelectedOk;
  };

  useEffect(() => {
    if (selectedLanguage) {
      (async () => {
        setLoading(true);
        const res = await Connections.postRequest(
          ApiEndpoints.getTranslationByLanguage,
          { language: selectedLanguage },
        );

        if (res.ok) {
          setIdSelected(res.data.translation._id);
          const data = JSON.parse(res.data.translation.data);
          setRows(rows.map(item => ({
            id: item.id,
            [defaultLanguage]: item[defaultLanguage],
            [selectedLanguage]: data[item.id] || '',
          })));
        } else {
          setIsError(true);
        }
        setLoading(false);
        setHasChanged(false);
      })();
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (defaultLanguage) {
      (async () => {
        setLoading(true);

        const res = await Connections.postRequest(
          ApiEndpoints.getTranslationByLanguage,
          { language: defaultLanguage },
        );

        if (res.ok) {
          setIdDefault(res.data.translation._id);
          const data = JSON.parse(res.data.translation.data);
          setRows(Object.keys(data).map(key => ({
            id: key,
            [defaultLanguage]: data[key],
          })));
        } else {
          setIsError(true);
        }

        setLoading(false);
      })();
    }
  }, []);

  return {
    rows, loading, isError, hasChanged, onChange, onDelete, onCreate, onSave,
  };
};

export default useTranslations;
