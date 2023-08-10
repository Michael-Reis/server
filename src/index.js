import { Server } from "./server.js";

async function startServer() {
    
    const app = new Server();
    const port = process.env.PORT || 7000;

    app.listen(port, () => {
        console.log(`Aplicação inicializada na porta ${port}`);
    })
}

startServer();
