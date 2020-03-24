import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
//import { ReCaptcha } from 'react-recaptcha-google';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarLanding from './navbar-landing.component';

const Landing = () => {
  return (
    <div
      className='landing'
      style={{ background: 'linear-gradient(90deg, #1B95DF 50%, #18202F 50%)' }}
    >
      <div className='landing-right-content'>
        <div className='navbar'></div>
        <div className='landing-title'>
          <h2>Start a fantasy league today</h2>
          <h6 style={{ color: '#819091' }}>
            Create a free fantasy esports league in just 60 seconds
          </h6>
        </div>
        <div className='login-link'>
          <div className='auth-wrapper-landing'>
            <div className='auth-inner-landing'>
              <div className='get-started'>
                <button
                  type='button'
                  onClick={() => this.handleModal()}
                  className='btn-get-started'
                >
                  Sign Up
                </button>
                <Modal
                  className='signup-modal'
                  onHide={() => this.handleModal()}
                >
                  <div className='auth-wrapper'>
                    <div className='auth-inner'>
                      <h3>Create Your Account</h3>

                      <div className='form-group'>
                        <label>Username</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Enter Username'
                        />{' '}
                        />
                      </div>

                      <div className='form-group'>
                        <label>Email address</label>
                        <input
                          type='email'
                          className='form-control'
                          placeholder='Enter email'
                        />
                      </div>

                      <div className='form-group'>
                        <label>Password</label>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='Enter password'
                        />
                      </div>

                      <button
                        type='submit'
                        className='btn btn-primary btn-block'
                      >
                        Sign Up
                      </button>
                      <p className='forgot-password text-right'>
                        Already registered <Link to={'/login'}>login?</Link>
                      </p>
                    </div>
                  </div>
                </Modal>
              </div>

              <Link to={'/login'}>
                <button className='btn-login-started'>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='landing-left-content'>
        <img className='landing-img' src={Image} alt='landing-image' />
        <h2 style={{ textAlign: 'center' }}> Esports is better with friends</h2>
        <h6 style={{ textAlign: 'center' }}>
          OffMeta is a fantasy esports league and chat all in one platform Have
          fun and enjoy esports with your closest friends
        </h6>
      </div>
    </div>
  );
};

export default Landing;
