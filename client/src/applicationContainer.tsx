import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ApplicationForm from './applicationForm';
import ApplicationFormEmpty from './applicationFormEmpty';
import { parseNumbers, trimNullFields } from './utils/inputUtils';
import {
    tryGetRecentApplication,
    tryGetApplicationById,
    trySaveApplicationById,
    trySubmitApplicationById,
} from './utils/apiCalls';
import type { Application } from './types/application';

export default function ApplicationContainer() {
    // const pathId = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pathId = queryParams.get('id');

    const [appData, setAppData] = useState<Application | null>();
    const [compErr, setErr] = useState<Error | null>(null);

    useEffect(() => {
        const appPromise = async () => {
            // check if we are trying to GET a specific application. If not
            // then try getting the most recent incomplete one.
            try {
                let app: Application;
                if (pathId) {
                    app = await tryGetApplicationById(Number(pathId));
                } else {
                    app = await tryGetRecentApplication();
                }
                if (app) {
                    setAppData((prevAppData) => ({ ...prevAppData, ...app }));
                }
            } catch (err) {
                console.error('Error: ', err);
                throw err;
            }
        };
        appPromise();
    }, [pathId]);

    const handleSubmit = (inputData) => {
        trimNullFields(inputData);
        const newData = parseNumbers(inputData);
        try {
            trySubmitApplicationById(appData.id, newData, errorHandler);
        } catch (err) {
            console.error('Error: ', err);
            throw err;
        }

        console.log('SUBMITTING...', newData);
    };

    const handleSave = (inputData) => {
        trimNullFields(inputData);
        const newData = parseNumbers(inputData);
        try {
            trySaveApplicationById(appData.id, newData, errorHandler);
        } catch (err) {
            console.error('Error: ', err);
            throw err;
        }

        console.log('SAVING...', newData);
    };

    const errorHandler = (error) => {
        setErr(error);
    };

    return (
        <div>
            {compErr ? <div className="text-red-400">{compErr.message}</div> : null}
            {pathId && !appData ? (
                <h2>Application not found</h2>
            ) : appData ? (
                <ApplicationForm
                    initialData={appData}
                    onSave={handleSave}
                    onSubmit={handleSubmit}
                />
            ) : (
                <ApplicationFormEmpty onSave={handleSave} onSubmit={handleSubmit} />
            )}
        </div>
    );
}
