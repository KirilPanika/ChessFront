import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import './login.css';


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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "", password: "", loading: false, message: ""
        };
    }
    /**
     * Username field
     * @param value user entered text
     * @returns {JSX.Element}
     */
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    /**
     * Password field
     * @param value user entered password
     * @returns {JSX.Element}
     */
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    /**
     * Form validation for singing up
     * @param e sing in event
     */
    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "", loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(() => {
                this.props.history.push("/games");
                window.location.reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                this.setState({
                    loading: false, message: resMessage
                });
            });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <h1>Log In</h1>
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}>
                            <div className="form-group">
                                <Input
                                    placeholder="Username"
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}/>
                            </div>

                            <div className="form-group">
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}/>
                            </div>

                            <div className="form-group">
                                <div className="text-center">
                                    <button
                                        className="btn btn-outline-primary col-12"
                                        disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>)}
                                        <span>Login</span>
                                    </button>
                                </div>
                            </div>

                            {this.state.message && (<div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>)}
                            <CheckButton
                                style={{display: "none"}}
                                ref={c => {
                                    this.checkBtn = c;
                                }}/>
                        </Form>
                    </div>
                </div>
            </div>);
    }
}