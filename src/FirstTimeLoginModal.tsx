import React, { Component } from 'react';
import Modal from 'react-modal';
import FirstTimeLoginForm from './FirstTimeLoginForm';

interface FirstTimeLoginProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
const modalStyles = {
  content: {
    width: '500px',
    height: '600px',
    margin: 'auto',
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
        <h4 style={{ textAlign: 'center' }}>First Time Login</h4>
        <FirstTimeLoginForm />
      </Modal>
    );
  }
}

export default FirstTimeLoginModal;