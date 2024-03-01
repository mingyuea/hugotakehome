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
                console.log('APPDATE RETRIEVED IS', app);
            } catch (err) {
                console.error('Error: ', err);
                throw err;
            }
        };
        appPromise();
    }, [pathId]);

    const handleSubmit = (inputData) => {
        const newData = parseNumbers(inputData);
        trySubmitApplicationById(appData.id, newData);
        console.log('SUBMITTING', newData);
    };

    const handleSave = (inputData) => {
        trimNullFields(inputData);
        const newData = parseNumbers(inputData);
        trySaveApplicationById(appData.id, newData);
        console.log('SAVING', newData);
    };

    return (
        <div>
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
