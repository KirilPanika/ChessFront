import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";

/**
 * Required field error message
 * @param value user entered value in textbox
 * @returns {JSX.Element} error text
 */
const required = value => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">
                This field is required!
            </div>);
    }
};
/**
 * Username field
 * @param value user entered text
 * @returns {JSX.Element}
 */
const username = value => {
    if (value.length < 5 || value.length > 20) {
        return (<div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>);
    }
};
/**
 * Password field
 * @param value user entered password
 * @returns {JSX.Element}
 */
const password = value => {
    if (value.length < 8 || value.length > 40) {
        return (<div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>);
    }
};
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            username: "", password: "", successful: false, message: ""
        };
    }


    /**
     * Saves values to state as it's typed
     * @param e input event
     */
    onChangeUsername(e) {
        this.setState({

            username: e.target.value
        });
    }

    /**
     * Saves values to state as it's typed
     * @param e input event
     */
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    /**
     * Form validation for singing up
     * @param e sing up event
     */
    handleRegister(e) {
        e.preventDefault();
        this.setState({
            message: "", successful: false
        });
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(this.state.username, this.state.password).then(response => {
                this.setState({
                    message: response.data.message, successful: true
                });
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    successful: false, message: resMessage
                });
            });
        }
    }

    render() {
        return (<div className="container mt-3">
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <h1>Sing Up</h1>
                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}>
                            {!this.state.successful && (<div>
                                    <div className="form-group">
                                        <Input
                                            placeholder="Username"
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required, username]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required, password]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-outline-primary col-12">Sign Up</button>
                                    </div>
                                </div>)}
                            {this.state.message && (<div className="form-group">
                                    <div
                                        className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>)}
                            <CheckButton
                                style={{display: "none"}}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>

                    </div>
                </div>
            </div>);
    }
}