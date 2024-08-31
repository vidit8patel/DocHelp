import React, { useState } from 'react';

const initialSymptomsList = ['Fatigue', 'Fever', 'Chills', 'Sweating', 'Weight Loss', 'Weight Gain', 'Malaise (general feeling of discomfort)', 'Night Sweats', 'Weakness', 'Dehydration', 'Flushing', 'Hypothermia (low body temperature)', 'Generalized Swelling', 'Hot Flashes', 'Shivering', 'Reduced Activity Levels', 'Skin and Hair Symptoms', 'Rash', 'Itching', 'Dry Skin', 'Flushing', 'Pallor (pale skin)', 'Bruising', 'Swelling', 'Lumps or Bumps', 'Hair Loss', 'Excessive Hair Growth', 'Changes in Skin Color', 'Ulcers', 'Blisters', 'Hives', 'Scaly Patches', 'Stretch Marks', 'Moles', 'Birthmarks', 'Calluses', 'Spider Veins', 'Varicose Veins', 'Peeling Skin', 'Skin Thickening', 'Excessive Sweating (Hyperhidrosis)', 'Brittle Nails', 'Nail Discoloration', 'Head Symptoms', 'Headache', 'Dizziness', 'Lightheadedness', 'Fainting', 'Loss of Balance', 'Scalp Tenderness', 'Temporal Pain', 'Facial Pain', 'Facial Swelling', 'Jaw Clicking', 'Eye Symptoms', 'Blurred Vision', 'Double Vision', 'Eye Pain', 'Redness', 'Discharge', 'Swelling', 'Sensitivity to Light', 'Vision Loss', 'Itchy Eyes', 'Watery Eyes', 'Dry Eyes', 'Floaters', 'Night Blindness', 'Eye Twitching', 'Eye Discharge', 'Eye Swelling', 'Eye Dryness', 'Eye Itchiness', 'Red Eyes', 'Eye Irritation', 'Droopy Eyelids', 'Eye Strain', 'Ear Symptoms', 'Ear Pain', 'Hearing Loss', 'Tinnitus (ringing in the ears)', 'Discharge', 'Itching', 'Vertigo', 'Fullness in Ears', 'Ear Popping', 'Itchy Ears', 'Nose and Sinus Symptoms', 'Nasal Congestion', 'Runny Nose', 'Nosebleeds', 'Sinus Pressure', 'Loss of Smell', 'Postnasal Drip', 'Sinus Headache', 'Frequent Sneezing', 'Nasal Polyps', 'Mouth and Throat Symptoms', 'Sore Throat', 'Hoarseness', 'Difficulty Swallowing', 'Mouth Ulcers', 'Dry Mouth', 'Bad Breath', 'Difficulty Speaking', 'Voice Changes', 'Jaw Pain', 'Swollen Gums', 'Bleeding Gums', 'Cracked Lips', 'Loss of Taste', 'Sore Gums', 'Swollen Tonsils', 'Tonsil Stones', 'Oral Thrush', 'Altered Taste', 'Difficulty Chewing', 'Respiratory Symptoms', 'Cough', 'Shortness of Breath', 'Wheezing', 'Chest Pain', 'Sputum Production', 'Rapid Breathing', 'Hoarseness', 'Chronic Cough', 'Coughing Up Blood', 'Snoring', 'Stridor (high-pitched wheezing sound)', 'Chronic Bronchitis', 'Pleural Effusion (fluid around lungs)', 'Cardiovascular Symptoms', 'Chest Pain', 'Palpitations', 'Irregular Heartbeat', 'Swelling of Legs/Ankles', 'High Blood Pressure', 'Low Blood Pressure', 'Rapid Heartbeat', 'Slow Heartbeat', 'Heart Murmurs', 'Syncope (fainting spells)', 'Cold Extremities', 'Cyanosis (bluish discoloration of the skin)', 'Cold Sweats', 'Leg Pain when Walking (Claudication)', 'Gastrointestinal Symptoms', 'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal Pain', 'Bloating', 'Heartburn', 'Loss of Appetite', 'Blood in Stool', 'Jaundice (yellowing of the skin and eyes)', 'Acid Reflux', 'Belching', 'Flatulence (excessive gas)', 'Rectal Bleeding', 'Hemorrhoids', 'Hiccups', 'Fecal Incontinence', 'Difficulty Swallowing', 'Feeling of Fullness', 'Early Satiety (feeling full quickly)', 'Clay-Colored Stools', 'Greasy Stools', 'Rectal Pain', 'Intestinal Gas', 'Urinary Symptoms', 'Painful Urination', 'Frequent Urination', 'Urgent Need to Urinate', 'Blood in Urine', 'Incontinence', 'Difficulty Urinating', 'Cloudy Urine', 'Foul-Smelling Urine', 'Decreased Urine Output', 'Nocturia (frequent urination at night)', 'Burning Sensation during Urination', 'Urinary Retention', 'Urinary Incontinence', 'Urinary Hesitancy', 'Reproductive Symptoms', 'Vaginal Discharge', 'Pelvic Pain', 'Irregular Menstrual Periods', 'Heavy Menstrual Bleeding', 'Testicular Pain', 'Erectile Dysfunction', 'Painful Intercourse', 'Infertility', 'Reduced Libido', 'Breast Pain', 'Nipple Discharge', 'Menstrual Cramps', 'Menstrual Irregularities', 'Vaginal Dryness', 'Pelvic Pressure', 'Musculoskeletal Symptoms', 'Joint Pain', 'Muscle Pain', 'Stiffness', 'Swelling', 'Limited Range of Motion', 'Muscle Weakness', 'Back Pain', 'Neck Pain', 'Shoulder Pain', 'Elbow Pain', 'Wrist Pain', 'Hip Pain', 'Knee Pain', 'Ankle Pain', 'Foot Pain', 'Muscle Cramping', 'Deformity', 'Locking of Joints', 'Popping or Clicking Sounds', 'Cramps', 'Joint Redness', 'Muscle Spasms', 'Joint Instability', 'Muscle Fatigue', 'Muscle Stiffness', 'Neurological Symptoms', 'Numbness', 'Tingling', 'Weakness', 'Seizures', 'Tremors', 'Memory Loss', 'Confusion', 'Difficulty Concentrating', 'Loss of Coordination', 'Slurred Speech', 'Visual Disturbances', 'Numbness or Tingling in Extremities', 'Involuntary Movements', 'Difficulty Walking', 'Muscle Twitching', 'Involuntary Jerking Movements', 'Loss of Sensation', 'Feeling of Pins and Needles', 'Changes in Reflexes', 'Psychological Symptoms', 'Anxiety', 'Depression', 'Mood Swings', 'Insomnia', 'Irritability', 'Hallucinations', 'Aggression', 'Paranoia', 'Delusions', 'Social Withdrawal', 'Restlessness', 'Panic Attacks', 'Obsessive Thoughts', 'Compulsive Behaviors', 'Suicidal Thoughts', 'Emotional Numbness', 'Lack of Motivation', 'Endocrine Symptoms', 'Excessive Thirst', 'Excessive Hunger', 'Frequent Urination', 'Unexplained Weight Loss', 'Heat Intolerance', 'Cold Intolerance', 'Goiter (enlarged thyroid gland)', 'Hyperactivity', 'Fatigue despite rest', 'Increased Appetite', 'Decreased Appetite', 'Intolerance to Cold', 'Intolerance to Heat', 'Unexplained Weight Changes', 'Immune System Symptoms', 'Recurrent Infections', 'Autoimmune Reactions', 'Swollen Lymph Nodes', 'Enlarged Spleen', 'Recurrent Cold Sores', 'Chronic Fatigue', 'Sensitivity to Sunlight', 'Hives', 'Persistent Fatigue', 'Fever of Unknown Origin', 'Rash with Fever', 'Miscellaneous Symptoms', 'Difficulty Breathing', 'Chest Tightness', 'Cyanosis (bluish discoloration of the skin)', 'Sweating', 'Unusual Bleeding or Bruising', 'Bad Taste in Mouth', 'Persistent Cough', 'Persistent Hiccups', 'Persistent Vomiting', 'Foul Body Odor', 'Abnormal Sweating', 'Unusual Taste', 'Metallic Taste in Mouth', 'Increased Sensitivity to Pain'];

const SymptomForm = ({ onSubmit }) => {
    const [symptom, setSymptom] = useState('');
    const [severity, setSeverity] = useState(1);
    const [duration, setDuration] = useState('');
    const [symptoms, setSymptoms] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddSymptom = () => {
        const newSymptom = { symptom, severity, duration };
        if (isEditing) {
            const updatedSymptoms = symptoms.map((s, index) =>
                index === editIndex ? newSymptom : s
            );
            setSymptoms(updatedSymptoms);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setSymptoms([...symptoms, newSymptom]);
        }
        setSymptom('');
        setSeverity(1);
        setDuration('');
    };

    const handleDeleteSymptom = (index) => {
        const newSymptoms = symptoms.filter((_, i) => i !== index);
        setSymptoms(newSymptoms);
    };

    const handleEditSymptom = (index) => {
        const symptomToEdit = symptoms[index];
        setSymptom(symptomToEdit.symptom);
        setSeverity(symptomToEdit.severity);
        setDuration(symptomToEdit.duration);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(symptoms);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-3xl font-bold bg-gradient-to-r from-red-600 via-red-1000 to-indigo-400 inline-block text-transparent bg-clip-text">Dr. Assist</h1>
                <p className="text-gray-600 mt-2">Add your symptoms to receive a detailed diagnosis.</p>
            </div>
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Symptom</label>
                        <input
                            list="symptoms-list"
                            value={symptom}
                            onChange={(e) => setSymptom(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
                        />
                        <datalist id="symptoms-list">
                            {initialSymptomsList.map((sym, index) => (
                                <option key={index} value={sym} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Severity</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={severity}
                            onChange={(e) => setSeverity(Number(e.target.value))}
                            className="mt-1 block w-full"
                        />
                        <div className="text-sm mt-2 text-center">Selected Severity: {severity}</div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Duration (days)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"
                            min="0"
                        />
                    </div>
                    <button type="button" onClick={handleAddSymptom} className="bg-indigo-500 text-white w-full py-3 rounded-md">
                        {isEditing ? 'Update Symptom' : 'Add Symptom'}
                    </button>
                    <ul className="list-disc pl-5">
                        {symptoms.map((s, index) => (
                            <li key={index} className="flex justify-between items-center mt-4">
                                <span>{`${s.symptom} - Severity: ${s.severity}, Duration: ${s.duration} days  `} </span>
                                <div className="flex space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handleEditSymptom(index)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteSymptom(index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="bg-green-500 text-white w-full py-3 rounded-md mt-4 hover:bg-green-600 transition">
                        Submit Symptoms
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SymptomForm;