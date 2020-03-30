// Importamos botframework con almacenamiento de memoria, y el estado de la conversación
import { BotFrameworkAdapter, MemoryStorage, ConversationState } from "botbuilder";
import * as restify from "restify";
import { ConfState } from "./types";

// Creamos el servidor con restify
// Indicamos el puerto de diferentes maneras para minimizar errores, con y sin variables de entorno.
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening on ${server.url}`);
})

// Creamos el adapter que contendrá variables de entorno de la aplicacion en microsoft
const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APPID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Instanciamos dos recursos que nos ayudaran a controlar el estado de la conversacion. 
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

// Escuchamos desde api/message e incluimos el adaptador para procesar la información
// En este middleware van a entrar todos los mensajes y vamos a decidir que hacer con ellos.

server.post("/api/messages", (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Detectamos explicitamente si hay actividad y la enviamos nuevamente
        if (context.activity.type === "message") {
            const state = conversationState.get(context);
            await context.sendActivity(`Estoy diciendo ${context.activity.text}`);
        } else {
            await context.sendActivity(`${context.activity.type} event detected`);
        }
    });
});