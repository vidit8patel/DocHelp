
# Dr. Assist 👨‍⚕️🩺

Dr. Assist is a web application designed to assist healthcare professionals by providing a comprehensive diagnostic and treatment planning tool. The application collects detailed patient data, symptoms, and then leverages Google's Generative AI to generate a professional diagnostic report and treatment plan based on the provided information.

## Features

- **Patient Information Collection**: Step-by-step form to gather essential patient details such as vitals, medications, medical history, and lifestyle habits.
- **Symptom Entry**: Allows users to input and edit symptoms with details about severity and duration.
- **AI-Powered Diagnostic Report**: Utilizes Google Generative AI to generate a detailed diagnosis and treatment plan based on the patient's data and symptoms.
- **Interactive Chat Interface**: Displays the AI-generated diagnosis and allows for ongoing interaction with the AI model to refine and expand the treatment plan.

## Components

### 1. Chat Component (`Chat.jsx`)
- **Purpose**: Renders the interactive chat interface for displaying AI-generated diagnostic reports and ongoing communication with the AI model.
- **Features**:
  - Parses markdown-style message content and renders it with appropriate formatting.
  - Supports headings, bullet points, and bold text in messages.
  - Handles user input and sends messages to the AI model.

### 2. Symptom Form Component (`SymptomForm.jsx`)
- **Purpose**: Enables users to input symptoms with severity and duration.
- **Features**:
  - Add, edit, and delete symptoms.
  - Input validation for symptoms, severity (1-10 scale), and duration (in days).
  - Displays the list of entered symptoms before submission.

### 3. Patient Form Component (`PatientForm.jsx`)
- **Purpose**: Collects comprehensive patient information through a multi-step form.
- **Features**:
  - Handles input for patient details such as name, age, gender, vitals, medical history, and lifestyle habits.
  - Input validation and progress indicator for each step of the form.
  - Navigates between form steps and allows for data submission.

### 4. Main Application Component (`App.jsx`)
- **Purpose**: Manages the overall flow of the application from patient data collection to AI-based diagnosis.
- **Features**:
  - Step-based progression through patient data collection, symptom entry, and AI interaction.
  - Integrates with Google Generative AI to generate diagnostic reports.
  - Displays AI-generated responses in the chat interface.

## Deployment

The application is deployed and accessible at [drassist.netlify.app](https://drassist.netlify.app).

## Installation and Setup

To run the application locally, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/dr-assist.git
    cd dr-assist
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Google Generative AI API key:
     ```
     VITE_API_KEY=your-google-generative-ai-api-key
     ```

4. **Run the Application**:
    ```bash
    npm run dev
    ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **Google Generative AI**: AI model for generating diagnostic reports.
- **Netlify**: Platform for deploying the web application.

## Future Enhancements

- **User Authentication**: Allow healthcare professionals to securely log in and save patient records.
- **Multi-Language Support**: Provide diagnostic reports in multiple languages.
- **Advanced AI Interaction**: Enable more complex dialogues with the AI for iterative diagnostic processes.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
