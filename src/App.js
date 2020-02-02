import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

import "./App.css";
import Layout from "./containers/Layout/Layout";

class App extends Component {
  state = {
    user: {},
    isUserLoggedIn: false
  };

  responseGoogle = response => {
    const user = response.profileObj;
    if (user) {
      this.setState({
        isUserLoggedIn: true,
        user: {
          name: response.profileObj.givenName,
          ProfileImage: response.profileObj.imageUrl,
          email: response.profileObj.email
        }
      });
    } else {
      alert(response.error);
    }
  };
  logout = response => {
    this.setState({ isUserLoggedIn: false });
  };

  render() {
    let googleLogin = (
      <GoogleLogin
        clientId="247640660626-ka4mvr1f6btl51jd0sh3h5d14lr4r6ek.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
    if (this.state.isUserLoggedIn) {
      googleLogin = (
          <Layout user={this.state.user} logout={this.logout}/>
      );
    }
    return <div className="App">{googleLogin}</div>;
  }
}
export default App;
