import { Router } from 'express';

export class RouterAuth {

    static Create() {

        const router = Router();

        router.post('/', (req, res) => {
            console.log(req.body);
            res.send("ok")
        });

        return router;
    }

}
