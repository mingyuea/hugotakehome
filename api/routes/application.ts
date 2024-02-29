import { Router } from 'express';

import * as Controllers from '../controllers/application';

const routes = Router();

routes.post('/', async (req, res) => {
    const app = await Controllers.createApplication();

    res.json({
        message: `Start a new insurance application with id ${app.id}`,
    });
});

routes.get('/', async (req, res) => {
    console.log('HIT GET');
    const app = await Controllers.getFirstIncompleteApplication();

    if (app == null) {
        res.json({
            message: 'No incomplete application',
            hasIncomplete: false,
            data: null,
        });
    } else {
        res.json({
            message: `Get first incomplete insurance application`,
            hasIncomplete: true,
            data: app,
        });
    }
});

routes.get('/:id', async (req, res) => {
    const appId = Number(req.params.id);
    const app = await Controllers.getApplicationById(appId);

    res.json({
        message: `Get insurance application with id ${appId}`,
        data: app,
    });
});

routes.put('/:id', async (req, res) => {
    const appId = Number(req.params.id);
    const updatedData = req.body.data;
    const app = await Controllers.updateApplicationById(appId, updatedData);

    res.json({
        message: `Update insurance application with id ${req.params.id}`,
        data: app,
    });
});

routes.post('/:id/submit', async (req, res) => {
    const appId = Number(req.params.id);
    const updatedData = req.body.data;
    updatedData['isComplete'] = true;
    const app = await Controllers.updateApplicationById(appId, updatedData);

    res.json({
        message: `Submit insurance application with id ${req.params.id}`,
        data: app,
        price: Math.random(),
    });
});

routes.get('/all', async (req, res) => {
    const apps = await Controllers.getAllApplications();

    res.json({
        message: `Get all insurance applications}`,
        data: apps,
    });
});

export default routes;
