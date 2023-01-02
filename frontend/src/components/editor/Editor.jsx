import SunEditor from 'suneditor-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import CodeMirror from 'codemirror';

// eslint-disable-next-line import/no-unresolved
import 'codemirror/mode/htmlmixed/htmlmixed';
// eslint-disable-next-line import/no-unresolved
import 'codemirror/lib/codemirror.css';

import './suneditor.css';
import './suneditor-contents.css';

const sunEditorOptions = {
  codeMirror: {
    src: CodeMirror,
    options: {
      htmlMode: true,
    },
  },
  height: 200,
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'fontColor', 'hiliteColor', 'list', 'align', 'outdent', 'indent'],
    ['table', 'link'],
    ['-right', 'codeView'],
  ],
};

const Editor = ({
  value = '', name, onChange, options, ...rest
}) => {
  const [localValue, setLocalValue] = useState(value);

  const changeValue = newValue => {
    setLocalValue(newValue);
    onChange && onChange({ name, value: newValue });
  };

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Typography
      component="div"
      sx={{
        '& > p': {
          marginBlockStart: 0,
          marginBlockEnd: 0,
        },
      }}
    >
      <SunEditor
        setOptions={{ ...sunEditorOptions, ...options }}
        defaultValue={value}
        onChange={changeValue}
        {...rest}
      />
    </Typography>
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
};

export default Editor;
