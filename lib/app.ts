// Importamos botframework con almacenamiento de memoria, y el estado de la conversación
import { BotFrameworkAdapter } from "botbuilder";
import * as restify from "restify";
import { EchoBot } from "./bot";

// Creamos el servidor con restify
// Indicamos el puerto de diferentes maneras para minimizar errores, con y sin variables de entorno.
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
})

// Creamos el adapter que contendrá variables de entorno de la aplicacion en microsoft
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APPID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Escuchamos desde api/message e incluimos el adaptador para procesar la información
// En este middleware van a entrar todos los mensajes y vamos a decidir que hacer con ellos.

const echo: EchoBot = new EchoBot;

server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await echo.onTurn(context);
    });
});