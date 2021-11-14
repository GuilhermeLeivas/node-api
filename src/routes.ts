import { Express, Request, Response } from 'express';
/**
 * This function is responsible for routing the requests
 * for its correspondent controller so they can be handled properly;
 * @param app App running. 
 */
function routes(app: Express): void {
    app.get('/healthcheck', (req: Request, res: Response) => res.status(200).send("<h1>Teste</h1>"));
}

export default routes;