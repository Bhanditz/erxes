import { compose } from 'react-komposer';
import { getTrackerLoader } from '/imports/react-ui/utils';
import AuthLayout from '../components/AuthLayout';

function composer(props, onData) {
  onData(null, {});
}

export default compose(getTrackerLoader(composer))(AuthLayout);
