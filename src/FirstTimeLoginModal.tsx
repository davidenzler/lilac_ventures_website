import React, { Component } from 'react';
import Modal from 'react-modal';
import FirstTimeLoginForm from './FirstTimeLoginForm';

interface FirstTimeLoginProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const modalStyles = {
  content: {
    width: '800px',
    height: '500px',
    margin: 'auto',
    padding: '20px',
  },
};

class FirstTimeLoginModal extends Component<FirstTimeLoginProps> {
  render() {
    const { isOpen, onRequestClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="FirstTimeLoginModal"
        style={modalStyles}
      >
        <h2>First Time Login</h2>
        <FirstTimeLoginForm />
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    );
  }
}

export default FirstTimeLoginModal;
