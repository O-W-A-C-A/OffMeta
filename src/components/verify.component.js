import React, { Component } from "react";
import NavBar from './navbar.component'
export default class Verify extends Component
{
    constructor(props, context){
        super(props, context);

        this.state = {
            confirmCode: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            confirmCode: this.state.confirmCode
        }
    }

    render()
    {
        return(
            <div className="auth-wrapper-form">
                <NavBar></NavBar>
                <div className="auth-inner">
                    <form >
                        <h3>Verify your Account</h3>

                        <div className="form-group">
                            <label>Enter your Code:</label>
                            <input type="text" 
                            className="form-control" 
                            name="confirmCode"
                            placeholder="Confirmation Code" 
                            value={this.state.confirmCode}
                            onChange={this.onChange} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Verify</button>
                        </form>
                </div>
            </div>
        );
    }
}