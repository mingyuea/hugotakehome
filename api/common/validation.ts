const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';
const TYPE_BOOLEAN = 'boolean';
const YEAR_1900 = -2208988800000;
const APP_FIELD_TYPE = {
    id: TYPE_NUMBER,
    isComplete: TYPE_BOOLEAN,
    firstname: TYPE_STRING,
    lastname: TYPE_STRING,
    dob: TYPE_NUMBER,
    street: TYPE_STRING,
    city: TYPE_STRING,
    state: TYPE_STRING,
    zip: TYPE_NUMBER,
    vehiclevin1: TYPE_STRING,
    vehicleyear1: TYPE_NUMBER,
    vehiclemake1: TYPE_STRING,
    vehiclevin2: TYPE_STRING,
    vehicleyear2: TYPE_NUMBER,
    vehiclemake2: TYPE_STRING,
    vehiclevin3: TYPE_STRING,
    vehicleyear3: TYPE_NUMBER,
    vehiclemake3: TYPE_STRING,
    price: TYPE_NUMBER,
};
const REQUIRED_FIELDS = {
    id: true,
    isComplete: true,
    firstname: true,
    lastname: true,
    dob: true,
    street: true,
    city: true,
    state: true,
    zip: true,
    vehiclevin1: true,
    vehicleyear1: true,
    vehiclemake1: true,
    price: true,
};

function zipValidation(zip: number) {
    if (zip > 99999 || zip.toString().length < 5) {
        throw new Error(`Invalid zipcode ${zip}`);
    }
}

function vehicleYearValidation(vYear: number) {
    const date = new Date();
    const maxYear = date.getFullYear() + 1;

    if (vYear < 1985 || vYear > maxYear) {
        throw new Error(`Invalid vehicle year ${vYear}`);
    }
}

function birthdayValidation(dob: number) {
    // DOB is passed as unixtime, we check if it's within a valid range and
    // if the applicant is over 16 year old
    const currDate = Date.now();
    const dobYears = (currDate - dob) / (1000 * 60 * 60 * 24 * 365);

    if (dob > currDate || dob < YEAR_1900) {
        throw new Error('Invalid birthday');
    }
    if (dobYears < 16) {
        throw new Error('Must be over 16 to apply');
    }
}

function sharedValidation(app) {
    if ('zip' in app) {
        zipValidation(app.zip);
    }
    if ('vehicleyear1' in app) {
        vehicleYearValidation(app.vehicleyear1);
    }
    if ('vehicleyear2' in app) {
        vehicleYearValidation(app.vehicleyear2);
    }
    if ('vehicleyear3' in app) {
        vehicleYearValidation(app.vehicleyear3);
    }
    if ('dob' in app) {
        birthdayValidation(app.dob);
    }
}

export function typeValidation(app) {
    for (const field in app) {
        if (typeof app[field] !== APP_FIELD_TYPE[field]) {
            throw new Error(`There was a type error for the field ${field} in the application`);
        }
    }
    sharedValidation(app);
}

export function nullCheckValidation(app) {
    for (const field in REQUIRED_FIELDS) {
        if (!(field in app)) {
            throw new Error(`The application was missing the required field ${field}`);
        }
    }
    sharedValidation(app);
}
