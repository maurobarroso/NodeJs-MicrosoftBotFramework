import { TurnContext } from "botbuilder";

export class EchoBot {
    async onTurn(context: TurnContext) {
        // Detectamos explicitamente si hay actividad y la enviamos nuevamente
        if (context.activity.type === "message") {
            await context.sendActivity(`Estoy diciendo ${context.activity.text}`);
        } else {
            await context.sendActivity(`${context.activity.type} event detected`);
        }
    }
}
