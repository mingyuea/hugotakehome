import db from '../db';
import { typeValidation, nullCheckValidation } from '../common/validation';

export async function createApplication() {
    const app = await db.application.create({
        data: {},
    });

    return app;
}

export async function getFirstIncompleteApplication() {
    const app = await db.application.findFirst({
        where: {
            isComplete: false,
        },
    });

    return app;
}

export async function getApplicationById(appId: number) {
    const app = await db.application.findUnique({
        where: {
            id: appId,
        },
    });

    return app;
}

export async function updateApplicationById(appId: number, updatedData: any) {
    try {
        typeValidation(updatedData);
    } catch (err) {
        throw err;
    }

    const app = await db.application.update({
        where: {
            id: appId,
        },
        data: updatedData,
    });

    return app;
}

export async function submitApplicationById(appId: number, updatedData: any) {
    updatedData.isComplete = true;
    updatedData.price = Math.random() * 100;

    try {
        typeValidation(updatedData);
        nullCheckValidation(updatedData);
    } catch (err) {
        throw err;
    }

    const app = await db.application.update({
        where: {
            id: appId,
        },
        data: updatedData,
    });

    return app;
}

export async function getAllApplications() {
    const apps = await db.application.findMany();

    return apps;
}
