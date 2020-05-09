import React, {Component} from "react";
import {PersonAdd, SwapHorizontalCircle, Delete} from '@material-ui/icons'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AddPlayer from './addplayer.component.js'

//auth
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import defaultimg from '../public/default-img.png';

class MyTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      imagePreviewUrl: '',
      file: defaultimg,
      //to track states of 3 modals
      showModal1: false,
      showModal2: false,
      showModal3: false,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/users/${this.props.auth.user.id}`)
      .then((res) => {
        //console.log(res.data); for testing if data is actually receive
        this.setState({ name: res.data.name });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `http://localhost:5000/api/users/profileimage/${this.props.auth.user.id}`,
        { responseType: 'arraybuffer' }
      )
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.setState({ file: 'data:;base64,' + base64 });
      });
  }

  //handles state change for images
  onFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          className='my-team-user-img-2'
          src={imagePreviewUrl}
          alt='user profile img'
        />
      );
    } else {
      $imagePreview = (
        <img
          className='my-team-user-img-2'
          src={this.state.file}
          alt='user profile img'
        />
      );
    }
    return (
      <div className='my-team-panel'>
        <div className='my-team-edit'>
          <button
            onClick={() =>
              this.setState({
                showModal1: true,
                showModal2: false,
                showModal3: false,
              })
            }
          >
            <PersonAdd />
            <br />
            Add Player
          </button>
          <Modal
            show={this.state.showModal1}
            onHide={() => this.setState({ showModal1: false })}
          >
            <Modal.Header>
              <Modal.Title>Add A Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddPlayer />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.setState({ showModal1: false })}
              >
                Close
              </Button>
              <Button variant='primary'>Add</Button>
            </Modal.Footer>
          </Modal>

          <button
            onClick={() =>
              this.setState({
                showModal1: false,
                showModal2: true,
                showModal3: false,
              })
            }
          >
            <SwapHorizontalCircle />
            <br />
            Propose a Trade
          </button>

          <Modal
            show={this.state.showModal2}
            onHide={() => this.setState({ showModal2: false })}
          >
            <Modal.Header>
              <Modal.Title>Propose a Trade with Another User</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.setState({ showModal2: false })}
              >
                Close
              </Button>
              <Button variant='primary'>Propose</Button>
            </Modal.Footer>
          </Modal>

          <button
            onClick={() =>
              this.setState({
                showModal1: false,
                showModal2: false,
                showModal3: true,
              })
            }
          >
            <Delete />
            <br />
            Drop Player
          </button>
          <Modal
            show={this.state.showModal3}
            onHide={() => this.setState({ showModal3: false })}
          >
            <Modal.Header>
              <Modal.Title>Drop a Player from your Team</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                onClick={() => this.setState({ showModal3: false })}
              >
                Close
              </Button>
              <Button variant='primary'>Drop</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className='my-team-user'>
          <div className='my-team-user-img'>{$imagePreview}</div>

          <div className='my-team-username'>{this.state.name}</div>
        </div>

        <div className='my-team-starters-wrapper'>
          <div className='my-team-starters-header'>Starters</div>

          <div className='my-team-starters-body'></div>
        </div>

        <div className='my-team-bench'>
          <div className='my-team-bench-header'>Bench</div>

          <div className='my-team-bench-body'></div>
        </div>
      </div>
    );
  }
}

MyTeam.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyTeam);
