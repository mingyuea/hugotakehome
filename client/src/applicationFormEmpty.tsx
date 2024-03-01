import { useState, ChangeEvent } from 'react';

//import type { Application } from './types/application';

type Props = {
    // defining initialData type will mess with setting the state, so we use any
    onSubmit: any;
    onSave: any;
};

export default function ApplicationFormEmpty({ onSubmit, onSave }: Props) {
    const initStateObj = {
        isComplete: '',
        firstname: '',
        lastname: '',
        dob: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        vehiclevin1: '',
        vehicleyear1: '',
        vehiclemake1: '',
        vehiclevin2: '',
        vehicleyear2: '',
        vehiclemake2: '',
        vehiclevin3: '',
        vehicleyear3: '',
        vehiclemake3: '',
        price: '',
    };

    // const [firstname, setFirstName] = useState(initialData.firstname || '');

    const [formData, setFormData] = useState({ ...initStateObj });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    const handleSave = () => {
        onSave(form);
    };

    return (
        <form>
            <div>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="vehiclevin1"
                    name="vehiclevin1"
                    value={formData.vehiclevin1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    id="vehicleyear1"
                    name="vehicleyear1"
                    value={formData.vehicleyear1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="vehiclemake1"
                    name="vehiclemake1"
                    value={formData.vehiclemake1}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="vehiclevin2"
                    name="vehiclevin2"
                    value={formData.vehiclevin2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    id="vehicleyear2"
                    name="vehicleyear2"
                    value={formData.vehicleyear2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="vehiclemake2"
                    name="vehiclemake2"
                    value={formData.vehiclemake2}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    id="vehiclevin3"
                    name="vehiclevin3"
                    value={formData.vehiclevin3}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    id="vehicleyear3"
                    name="vehicleyear3"
                    value={formData.vehicleyear3}
                    onChange={handleInputChange}
                />
            </div>
            <div>
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
