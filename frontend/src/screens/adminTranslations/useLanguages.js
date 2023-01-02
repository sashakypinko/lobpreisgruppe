import { useEffect, useState } from 'react';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';

const defaultLanguage = 'de';

const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const { loading, setLoading } = useLoading();
  const { isError, setIsError } = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await Connections.postRequest(ApiEndpoints.getTranslationsList);
      if (res.ok) {
        setLanguages(res.data.translations.map(item => item.language));
      } else {
        setIsError(true);
      }

      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const additionalLanguages = languages.filter(lang => lang !== defaultLanguage);

  return {
    languages, loading, isError, additionalLanguages, defaultLanguage,
  };
};

export default useLanguages;
