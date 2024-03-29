import { useState, ChangeEvent } from 'react';

//import type { Application } from './types/application';

type Props = {
    // defining initialData type will mess with setting the state, so we use any
    initialData: any;
    onSubmit: any;
    onSave: any;
};

const dobDateParser = function (dob: number) {
    const dateObj = new Date(dob);
    return dateObj.toISOString().split('T')[0];
};

export default function ApplicationForm({ initialData, onSubmit, onSave }: Props) {
    const initStateObj = {
        id: initialData?.id,
        isComplete: initialData?.isComplete,
        firstname: initialData?.firstname || '',
        lastname: initialData?.lastname || '',
        dob: initialData && initialData.dob ? dobDateParser(initialData.dob) : '',
        street: initialData?.street || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        zip: initialData?.zip || '',
        vehiclevin1: initialData?.vehiclevin1 || '',
        vehicleyear1: initialData?.vehicleyear1 || '',
        vehiclemake1: initialData?.vehiclemake1 || '',
        vehiclevin2: initialData?.vehiclevin2 || '',
        vehicleyear2: initialData?.vehicleyear2 || '',
        vehiclemake2: initialData?.vehiclemake2 || '',
        vehiclevin3: initialData?.vehiclevin3 || '',
        vehicleyear3: initialData?.vehicleyear3 || '',
        vehiclemake3: initialData?.vehiclemake3 || '',
        price: initialData?.price,
    };
    const [formData, setFormData] = useState({ ...initStateObj });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <form>
            <div>
                <h2>Application Form</h2>
            </div>
            <div>
                <span>First Name:</span>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Last Name:</span>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Date of Birth:</span>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Street Address:</span>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>City:</span>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>State:</span>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Zip Code:</span>
                <input
                    type="number"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 1 Vin:</span>
                <input
                    type="text"
                    id="vehiclevin1"
                    name="vehiclevin1"
                    value={formData.vehiclevin1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 1 year:</span>
                <input
                    type="number"
                    id="vehicleyear1"
                    name="vehicleyear1"
                    value={formData.vehicleyear1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 1 make/model:</span>
                <input
                    type="text"
                    id="vehiclemake1"
                    name="vehiclemake1"
                    value={formData.vehiclemake1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 2 VIN:</span>
                <input
                    type="text"
                    id="vehiclevin2"
                    name="vehiclevin2"
                    value={formData.vehiclevin2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 2 year:</span>
                <input
                    type="number"
                    id="vehicleyear2"
                    name="vehicleyear2"
                    value={formData.vehicleyear2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 2 make/model:</span>
                <input
                    type="text"
                    id="vehiclemake2"
                    name="vehiclemake2"
                    value={formData.vehiclemake2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 3 VIN:</span>
                <input
                    type="text"
                    id="vehiclevin3"
                    name="vehiclevin3"
                    value={formData.vehiclevin3}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 3 year:</span>
                <input
                    type="number"
                    id="vehicleyear3"
                    name="vehicleyear3"
                    value={formData.vehicleyear3}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <span>Vehicle 3 make/model:</span>
                <input
                    type="text"
                    id="vehiclemake3"
                    name="vehiclemake3"
                    value={formData.vehiclemake3}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button type="button" onClick={handleSave}>
                    Save
                </button>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            {formData.price !== null ? <p>Estimated cost: ${formData.price}</p> : null}
        </form>
    );
}
