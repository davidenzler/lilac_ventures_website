import React, { useState, useEffect } from "react";
import "../ProgressBar.css";
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";

const StepControl = ({ handleClick, currentStep, steps }: { handleClick: any, currentStep: number, steps: any }) => {
  const { auth }: any = useAuth();
  const [clientId, setClientId] = useState<number | null>(null);
  const [clientMaxProgressStep, setClientMaxProgressStep] = useState<number | null>(null);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get(`/customerProgress/getID/${auth.user}`);
        const id = response.data.id;
        setClientId(id);
      } catch (error) {
        console.error('Error fetching client ID:', error);
        // Handle errors here
      }
    };

    const fetchClientMaxProgressStep = async () => {
      try {
        const response = await axios.get(`/customerProgress/${clientId}`);
        const maxProgressStep = response.data.progress;
        setClientMaxProgressStep(maxProgressStep);
      } catch (error) {
        console.error('Error fetching client max progress step:', error);
        // Handle errors here
      }
    };

    if (!clientId) {
      fetchClientId();
    } else {
      fetchClientMaxProgressStep();
    }
  }, [auth.user, clientId]);

  const buttonName = () => {
    if (currentStep === steps.length) {
      return ("Finish");
    } else if (currentStep === steps.length + 1) {
      return ("You're Done!");
    } else {
      return ("Next");
    }
  };

  return (
    <div className="step-control">
      <button
        onClick={() => handleClick()}
        className={currentStep === 1 ? "disabled-back-button" : "back"}
      >
        Back
      </button>
      <button
        onClick={() => handleClick("next")}
        className={(currentStep === steps.length + 1 || currentStep >= (clientMaxProgressStep || 0)) ? "disabled-next-button" : "next"}
      >
        {buttonName()}
      </button>
    </div>
  );
};

export default StepControl;
