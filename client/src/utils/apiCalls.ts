import { Application } from '@prisma/client';
import { BASE_SERVER_URL, SUBMIT_ROUTE } from './../constants';

export async function tryStartNewApplication(): Promise<Application> {
    try {
        const res = await fetch(BASE_SERVER_URL, {
            method: 'POST',
            mode: 'cors',
        });
        if (res.status !== 200) {
            const errorMessage = 'Server error starting new application';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const resJson = await res.json();
        return resJson.data;
    } catch (err) {
        console.error(`Error starting a new application: ${err}`);
        throw err;
    }
}

export async function tryGetRecentApplication(): Promise<Application> {
    try {
        // initial GET request to check if there is a recent incomplete application
        const res = await fetch(BASE_SERVER_URL, {
            mode: 'cors',
        });
        if (res.status !== 200) {
            // TODO: Handle error here
            const errorMessage = 'Server error getting most recent application';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const resJson = await res.json();
        if (resJson.hasIncomplete) {
            return resJson.data;
        } else {
            // if no applications are incomplete, start new one
            let newApp = await tryStartNewApplication();
            return newApp;
        }
    } catch (err) {
        console.error('Error getting the most recent incomplete application');
        throw err;
    }
}

export async function tryGetApplicationById(appId: number): Promise<Application> {
    try {
        const res = await fetch(BASE_SERVER_URL + '/' + appId.toString(), {
            mode: 'cors',
        });
        if (res.status !== 200) {
            const errorMessage = `Error getting application ${appId}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
        const resJson = await res.json();
        return resJson.data;
    } catch (err) {
        console.error(`Error getting the application ${appId}`);
        throw err;
    }
}

export async function trySaveApplicationById(
    appId: number,
    updatedApp: Application,
    errorHandler: Function
): Promise<Application> {
    try {
        const res = await fetch(BASE_SERVER_URL + '/' + appId.toString(), {
            method: 'PUT',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: updatedApp }),
        });
        if (res.status !== 200) {
            const resJson = await res.json();
            const resErr = resJson.error;
            const errorMessage = `Error saving application ${appId}: ${resErr}`;
            console.error(errorMessage);
            const newErr = new Error(errorMessage);

            errorHandler(newErr);
            throw newErr;
        }
        const resJson = await res.json();
        errorHandler(null);
        return resJson.data;
    } catch (err) {
        console.error(`Error updating the application ${appId}`);
        throw err;
    }
}

export async function trySubmitApplicationById(
    appId: number,
    updatedApp: Application,
    errorHandler: Function
): Promise<Application> {
    try {
        const res = await fetch(BASE_SERVER_URL + '/' + appId.toString() + SUBMIT_ROUTE, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: updatedApp }),
        });
        if (res.status !== 200) {
            const resJson = await res.json();
            const resErr = resJson.error;
            const errorMessage = `Error submitting application ${appId}: ${resErr}`;
            console.error(errorMessage);
            const newErr = new Error(errorMessage);

            errorHandler(newErr);
            throw newErr;
        }
        const resJson = await res.json();
        errorHandler(null);
        return resJson.data;
    } catch (err) {
        console.error(`Error updating the application ${appId}`);
        errorHandler(err);
        throw err;
    }
}
