import React from 'react';
import './CustomerAccount.css';

class CustomerAccount extends React.Component {
  state = {
    inputValues: ['', '', '', '', '', ''],
  };

  handleChange(index: number, value: string) {
    const newInputValues = [...this.state.inputValues];
    newInputValues[index] = value;
    this.setState({ inputValues: newInputValues });
  }

  render() {
    return (
      <div className="CustomerAccountBody">
        <div className="partition">
          <p>Name</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[0]}
              onChange={(e) => this.handleChange(0, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
        <div className="partition">
          <p>Mailing Address</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[1]}
              onChange={(e) => this.handleChange(1, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
        <div className="partition">
          <p>Phone</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[2]}
              onChange={(e) => this.handleChange(2, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
        <div className="partition">
          <p>Email</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[3]}
              onChange={(e) => this.handleChange(3, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
        <div className="partition">
          <p>Preferred Contact Method</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[4]}
              onChange={(e) => this.handleChange(4, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
        <div className="partition">
          <p>Password</p>
          <div className="input-container">
            <input
              type="text"
              placeholder="text box"
              value={this.state.inputValues[5]}
              onChange={(e) => this.handleChange(5, e.target.value)}
            />
            <button>Edit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerAccount;

