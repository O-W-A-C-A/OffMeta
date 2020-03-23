import React, {Component} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class NavBarLanding extends Component{
    constructor(){
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }      

      onChange = e =>{
          this.setState({[e.target.id]: e.target.value})
      }
  
      onSubmit = e =>{
          e.preventDefault()
  
          const userData = {
              email: this.state.email,
              password: this.state.password
          };
  
          this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render(){
        const { errors } = this.state;
        return(
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-land fixed-top">
                    <div className="container">
                        <Link className="navbar-title-landing" to={"/"} style={{color: '#fff'}}>OffMeta</Link>
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                <input type="email" 
                                    id="email"
                                    name="email"
                                    placeholder="Enter email" 
                                    value={this.state.email}
                                    onChange={this.onChange} 
                                    className={classnames("landing-form-control", {
                                        invalid: errors.email || errors.emailnotfound
                                })}/>
                                <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                                </li>
                                <li>
                                <input type="password"
                                    id="password" 
                                    name="password"
                                    placeholder="Enter password" 
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className={classnames("landing-form-control", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}/>
                                <span className="red-text">{errors.password}{errors.passwordincorrect}</span>
                                </li>
                                <li className="nav-item">
                                    <button type="submit" className="landing-btn">Login</button>
                                </li> 
                            </ul>
                        </div>
                        </form>
                    </div>
                </nav>
            </div> 
        );
    }
}
 
NavBarLanding.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser }
  )(NavBarLanding);