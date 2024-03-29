import { Router } from 'express';

import * as Controllers from '../controllers/application';

const routes = Router();

routes.post('/', async (req, res) => {
    const app = await Controllers.createApplication();

    res.json({
        message: `Start a new insurance application with id ${app.id}`,
        data: app,
    });
});

routes.get('/', async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            error: err.message,
            hasIncomplete: false,
        });
    }
});

routes.get('/all', async (req, res) => {
    try {
        const apps = await Controllers.getAllApplications();

        res.json({
            message: `Get all insurance applications}`,
            data: apps,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

routes.get('/:id', async (req, res) => {
    const appId = Number(req.params.id);

    try {
        const app = await Controllers.getApplicationById(appId);

        res.json({
            message: `Get insurance application with id ${appId}`,
            data: app,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

routes.put('/:id', async (req, res) => {
    const appId = Number(req.params.id);
    const updatedData = req.body.data;

    try {
        const app = await Controllers.updateApplicationById(appId, updatedData);

        res.json({
            message: `Update insurance application with id ${req.params.id}`,
            data: app,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: err.message,
        });
    }
});

routes.post('/:id/submit', async (req, res) => {
    const appId = Number(req.params.id);
    const updatedData = req.body.data;

    try {
        const app = await Controllers.submitApplicationById(appId, updatedData);

        res.json({
            message: `Submit insurance application with id ${req.params.id}`,
            data: app,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

export default routes;
