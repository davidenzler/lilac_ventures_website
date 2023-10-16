import React, { Component, ChangeEvent, FormEvent } from 'react';
import "./FirstTimeLoginForm.css";

interface FirstTimeLoginFormProps {
}

interface FirstTimeLoginFormState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  error: string | null;
  success: boolean;
}

class FirstTimeLoginForm extends Component<FirstTimeLoginFormProps, FirstTimeLoginFormState> {
  constructor(props: FirstTimeLoginFormProps) {
    super(props);

    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      error: null,
      success: false,
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };  

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = this.state;

    if (newPassword !== confirmNewPassword) {
      this.setState({ error: "New passwords do not match" });
      return;
    }

    // Implement backend API call to change the password and handle success and error responses
    try {
      // Make an API request here to change the password    

      this.setState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: null,
        success: true,
      });
    } catch (error) {
      this.setState({ error: "Password change failed. Please try again." });
    }
  };

  render() {
    const { currentPassword, newPassword, confirmNewPassword, error, success } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
          <label htmlFor="username">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={this.handleChange}
              placeholder="Current Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={this.handleChange}
              placeholder="New Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={this.handleChange}
              placeholder="Confirm New Password"
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">Password changed successfully!</div>}
      </div>
    );
  }
}

export default FirstTimeLoginForm;
