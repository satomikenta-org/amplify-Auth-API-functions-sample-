import React, { Component } from 'react';
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {

    handleSignUp = () => {
      const username = "satomikennta";
      const password = "mypassword";
      const email = "sample@gmail.com";
      Auth.signUp({
        username,
        password,
        attributes: { email}
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
    };

    handleConfirmCode = () => {
      const confirmCode = "231809";
      Auth.confirmSignUp("satomikennta", confirmCode)
      .then( data => console.log(data))
      .catch( err => console.log(err));
    };

    handleLogIn = async () => {
      try {
        const user = await Auth.signIn("satomikennta", "mypassword");
        const userInfo = await this.handleGetJWT();
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            alert("先に確認コードの入力を完了させてください。");
        } else if (err.code === 'PasswordResetRequiredException') {
            alert("never show up for now cuz there is no reset policy");
        } else {
            alert("ログインに失敗しました。再度お願いします。")
        }
      }
    };

    handleSignOut = () => {
      Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    };

    handleGetJWT = () => {
      Auth.currentSession()
      .then(data => console.log(data.idToken.jwtToken))
      .catch(err => console.log(err));
    };

    handleForgotPass = () => {
      Auth.forgotPassword("satomikennta")
      .then(data => console.log("forgot pass",data))
      .catch(err => console.log("forgot pass err", err));
      // Auth.forgotPassword function automatically send confirmation code to user's email_address.
    };

    handleChangePass = () => {
      Auth.forgotPasswordSubmit("satomikennta", "699155", "new_password")
      .then(data => console.log("changePass", data))
      .catch(err => console.log("changePass Error", err));
    };

    render() {
      return (
        <div>
          <button onClick={this.handleSignUp}>===========SignUp========</button>
          <button onClick={this.handleConfirmCode}>========Confirm Code========</button>
          <button onClick={this.handleLogIn}>==========Login==========</button>
          <button onClick={this.handleGetJWT}>==========Get JWT========</button>
          <button onClick={this.handleForgotPass}>==========ForGot Pass=======</button>
          <button onClick={this.handleChangePass}>==========Change NewPass=======</button>
          <button onClick={this.handleSignOut}>==========SignOut========</button>
        </div>
      );
    }
}

export default (App);

