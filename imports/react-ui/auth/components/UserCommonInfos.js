import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Col, Grid, Row } from 'react-bootstrap';
import Alert from 'meteor/erxes-notifier';
import uploadHandler from '/imports/api/client/uploadHandler';

const propTypes = {
  user: PropTypes.object.isRequired,
};

class UserCommonInfos extends Component {
  constructor(props) {
    super(props);

    const defaultAvatar = '/images/userDefaultIcon.png';

    this.state = {
      avatar: this.props.user.details.avatar,
      avatarPreviewUrl: this.props.user.details.avatar || defaultAvatar,
      avatarPreviewStyle: {},
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    const imageFile = e.target.files[0];

    uploadHandler({
      file: imageFile,

      beforeUpload: () => {
        this.setState({ avatarPreviewStyle: { opacity: '0.2' } });
      },

      afterUpload: ({ response }) => {
        this.setState({
          avatar: response.url,
          avatarPreviewStyle: { opacity: '1' },
        });

        Alert.info('Looking good!');
      },

      afterRead: ({ result }) => {
        this.setState({ avatarPreviewUrl: result });
      },
    });
  }

  render() {
    const user = this.props.user;
    const { avatar, avatarPreviewStyle, avatarPreviewUrl } = this.state;

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <FormGroup>
              <ControlLabel>Photo</ControlLabel>
              <div className="profileCircleImg">
                <img
                  alt="avatar"
                  className="avatar"
                  style={avatarPreviewStyle}
                  src={avatarPreviewUrl}
                />

                <div ref="uploadForm" className="profileSelector">
                  <FormControl
                    type="file"
                    id="file"
                    onChange={this.handleImageChange}
                    className="profileImageInput"
                  />
                  <label htmlFor="file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      className="svgUpload"
                      viewBox="0 0 20 17"
                    >
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                    </svg>
                    <span>Upload Image</span>
                  </label>
                </div>

              </div>
              <input type="hidden" id="avatar" value={avatar} />
            </FormGroup>
          </Col>

          <Col xs={12} md={8}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl type="text" id="fullName" defaultValue={user.details.fullName} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Position</ControlLabel>
              <FormControl type="text" id="position" defaultValue={user.details.position} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Username</ControlLabel>
              <FormControl type="text" id="username" defaultValue={user.username} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="email" id="email" defaultValue={user.emails[0].address} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Twitter username</ControlLabel>
              <FormControl
                type="text"
                id="twitterUsername"
                defaultValue={user.details.twitterUsername}
              />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserCommonInfos.propTypes = propTypes;

export default UserCommonInfos;
