import React, { useState } from 'react';
import PatientForm from './Components/PatientForm';
import SymptomForm from './Components/SymptomForm';
import Chat from './Components/Chat';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleNext = (data) => {
    setPatientData(data);
    setStep(2);
  };

  const handleSubmitSymptoms = async (symptoms) => {
    setSymptoms(symptoms);
    setStep(3);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const initialPrompt = `
        You are a medical expert providing a detailed diagnostic report and treatment plan based on the given patient data and symptoms. 
        Your response should be professional, focused, and free of unnecessary information. 
        Provide a possible diagnosis with reasons and suggest a comprehensive treatment plan that a doctor can review and decide whether to follow.

        Patient Data: ${JSON.stringify(patientData)}
        Symptoms: ${JSON.stringify(symptoms)}
        
        Please provide:
        1. A detailed diagnosis of what might be happening to the patient, including possible conditions or diseases, and the reasoning behind your conclusions.
        2. A recommended detailed treatment plan, including medications with dosage, lifestyle changes, further tests, or referrals to specialists if necessary.

        ## Assessment/Diagnosis:
              - **Primary Diagnosis:** [Diagnosis]
              - **Differential Diagnoses:** [List of potential diagnoses]

        ## Plan/Treatment:

        ### 1. Immediate Management:
            - **Medications:** [List of medications]
            - **Procedures:** [List of procedures]
            - **Instructions:** [Specific instructions for care]

        ### 2. Further Evaluation:
            - **Laboratory Tests:** [List of additional tests]
            - **Imaging:** [Further imaging studies if necessary]

        ### 3. Treatment Based on Diagnosis:
            - **Condition-Specific Treatments:** [Detailed treatment options based on diagnosis]

        ### 4. Referral to Specialist:
            - [Any referrals to specialists]

        ### 5. Follow-Up:
            - **Appointments:** [Schedule for follow-up visits]
            - **Monitoring:** [Instructions for monitoring symptoms]

        ---
        Do not include disclaimers or statements about being an AI. Focus solely on the medical content requested.
        If further information is needed, ask the necessary medical diagnosis questions ONE AT A TIME.
      `;

      const chatInstance = await model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: initialPrompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 2000,
        },
      });

      const result = await chatInstance.sendMessage(initialPrompt);
      const response = await result.response;
      const text = await response.text();

      setChat(chatInstance);
      setMessages([{ role: "model", text }]);

    } catch (error) {
      console.error('Error communicating with Generative AI:', error);
      alert('There was an error communicating with the AI. Please try again later.');
    }
  };

  const handleSendMessage = async (message) => {
    if (!chat) return;

    try {
      setMessages([...messages, { role: "user", text: message }]);
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = await response.text();

      setMessages(prevMessages => [...prevMessages, { role: "model", text }]);
    } catch (error) {
      console.error('Error sending message to Generative AI:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {step === 1 && <PatientForm onNext={handleNext} />}
      {step === 2 && <SymptomForm onSubmit={handleSubmitSymptoms} />}
      {step === 3 && <Chat messages={messages} onSendMessage={handleSendMessage} />}
    </div>
  );
}

export default App;
