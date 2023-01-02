import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-undef
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { t, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <p style={{ textAlign: 'center', fontSize: 25 }}>{t('app.somethingWentWrong')}</p>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(ErrorBoundary);
