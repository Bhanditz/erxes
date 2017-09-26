import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import Alert from 'meteor/erxes-notifier';
import { UserCommonInfos } from '/imports/react-ui/auth/components';
import { Wrapper } from '/imports/react-ui/layout/components';
import Sidebar from '../../Sidebar';

const propTypes = {
  user: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.save(
      {
        avatar: document.getElementById('avatar').value,
        fullName: document.getElementById('fullName').value,
        position: document.getElementById('position').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        twitterUsername: document.getElementById('twitterUsername').value,
        currentPassword: document.getElementById('password').value,
      },
      error => {
        if (error) return Alert.error(error.reason);

        return Alert.success('Your profile has been updated and good to go!');
      },
    );
  }

  render() {
    const content = (
      <form className="margined" onSubmit={this.handleSubmit}>
        <UserCommonInfos user={this.props.user} />

        <FormGroup className="password-input">
          <ControlLabel>Current password</ControlLabel>
          <FormControl id="password" type="password" />
        </FormGroup>

        <ButtonToolbar className="pull-right">
          <Button type="submit" bsStyle="primary">Save</Button>
        </ButtonToolbar>
      </form>
    );

    const breadcrumb = [
      { title: 'Settings', link: '/settings/channels' },
      { title: 'Profile settings' },
    ];

    return (
      <div>
        <Wrapper
          header={<Wrapper.Header breadcrumb={breadcrumb} />}
          leftSidebar={<Sidebar />}
          content={content}
        />
      </div>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
