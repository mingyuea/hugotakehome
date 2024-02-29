import db from '../db';

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
