import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDropDown } from '@mui/icons-material';
import {
  Popover, List, ListItem, ListSubheader, Typography,
} from '@mui/material';

import CustomButton from '@/components/inputs/buttons/CustomButton';
import useClasses from '@/components/layout/hooks/useClasses';
import Flag from '@/components/translations/Flag';
import { useLanguage, useSetLanguage } from '@/screens/users/hooks/languageHook';
import useLanguages from '@/screens/adminTranslations/useLanguages';

const styles = {
  title: { color: 'rgba(0,0,0,0.6)', fontWeight: '400', lineHeight: '24px' },
  selectorButton: {
    justifyContent: 'right',
    alignItems: 'center !Important',
    '@media (max-width: 600px)': {
      minWidth: 'auto !important',
      padding: '12px 5px !important',
    },
  },
  flagRight: {
    marginRight: 7,
  },
};

const LanguageSelector = () => {
  const language = useLanguage();
  const changeLanguage = useSetLanguage();
  const classes = useClasses(styles);
  const { t } = useTranslation();

  const { languages: availableLanguages } = useLanguages();

  const [lang, setLang] = useState(language);

  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    if (lang !== language) setLang(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleChange = async newLang => {
    setLang(newLang);
    setTimeout(() => {
      changeLanguage(newLang);
    }, 0);
  };

  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <CustomButton
        onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
        variant="text"
        color="inherit"
        className={classes.selectorButton}
      >
        <Flag language={lang} print />
        <ArrowDropDown fontSize="small" color="inherit" />
      </CustomButton>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div>
          <List>
            <ListSubheader className={classes.title}>{t('selectLanguage')}</ListSubheader>
            {availableLanguages.map(item => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  handleChange(item).then();
                  setMenuAnchor(null);
                }}
              >
                <Flag language={item} className={classes.flagRight} />
                <Typography alignItems="center">
                  {t(`languageName.${item}`)}
                </Typography>
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
