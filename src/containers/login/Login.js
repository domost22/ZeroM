import React from "react";
import cover from '../../assets/cover.png'
import FormInput from "../../components/FormInput";
import SingleButton from "../../components/SingleButton";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        identifier: '',
        password: null,
        user: null,
        error:false,
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user && 'null' !== user) {
            this.props.history.push("/home")
        }
    }

    login = () => {

        if (!this.state.identifier){

            this.setState({error:true});
            return;
        }
        const formdata = new FormData();
        formdata.append("identifier", this.state.identifier);
        formdata.append("password", this.state.password);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://zm-job-application.herokuapp.com/auth/local", requestOptions)
            .then(response => response.text())
            .then(result => {
                localStorage.setItem('user', result);
                this.setState({user:result})
                this.props.history.push("/home");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {

        return (
            <div className="layout">
                <form onSubmit={this.onSubmit} className="login-form">
                    <label className="login-title">Login</label>
                    <FormInput
                        formInputClassName="email-form-input"
                        labelClassName="email-label"
                        type="text"
                        inputClassName="email-input"
                        title="Email*"
                        errorMessage={this.state.error===true?"Email can not be empty":''}
                        validation={true}
                        onChange={(e) => {
                            this.setState({identifier: e.target.value});
                        }}
                    />
                    <FormInput
                        formInputClassName="password-form-input"
                        labelClassName="password-label"
                        type="password"
                        inputClassName="password-input"
                        title="Password*"
                        onChange={(e) => {
                            this.setState({password: e.target.value});
                        }}
                    />
                    <SingleButton
                        buttonDiv="sign-button-div"
                        className="sign-button"
                        labelClassName="sign-button-text"
                        type="submit"
                        text="Sign In"
                        onClick={this.login}
                    />
                </form>
                <div className="cover">
                    <img src={cover} alt=""/>
                </div>
            </div>


        )
    }
}

export default withRouter(Login)
