export function parseNumbers(initialData) {
    const newData = { ...initialData };
    if (newData.dob) {
        newData.dob = Date.parse(initialData.dob);
    } else {
        delete newData.dob;
    }

    if (newData.zip) {
        newData.zip = Number(newData.zip);
    } else {
        delete newData.zip;
    }

    if (newData.vehicleyear1) {
        newData.vehicleyear1 = Number(newData.vehicleyear1);
    } else {
        delete newData.vehicleyear1;
    }

    if (newData.vehicleyear2) {
        newData.vehicleyear2 = Number(newData.vehicleyear2);
    } else {
        delete newData.vehicleyear2;
    }

    if (newData.vehicleyear3) {
        newData.vehicleyear3 = Number(newData.vehicleyear3);
    } else {
        delete newData.vehicleyear3;
    }

    if (newData.price) {
        newData.price = Number(newData.price);
    } else {
        delete newData.price;
    }

    return newData;
}

export function trimNullFields(initialData) {
    for (const field in initialData) {
        if (initialData[field] == '') {
            delete initialData[field];
        }
    }
}
