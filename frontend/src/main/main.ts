declare namespace RHU { 
    interface Modules {
        "Main": void;
        "App": {
            ws: RHU.WebSockets.wsClient<RHU.WebSockets.ws, () => { url: string }>;
        };
    }

    namespace Macro {
        interface TemplateMap
        {
            "App": App;
        }
    }
}

interface App extends HTMLDivElement
{
}

RHU.module(new Error(), "App", {
    WebSockets: "rhu/websockets"
}, function({
    WebSockets
}) {
    const host = "192.168.137.1";
    const wsApp = new WebSockets.wsClient(
        WebSockets.ws,
        () => ({
            url: `ws://${host}:3677/`,
        })
    );
    wsApp.prototype.onopen = function(e) {
        this.ws.send(JSON.stringify({
            type: "join",
            content: "christopher"
        }));
    };
    const ws = new wsApp();

    return {
        ws
    };
});

RHU.module(new Error(), "Main", { 
    Style: "rhu/style", Macro: "rhu/macro",
    TabPages: "components/organisms/TabPages"
}, function({ 
    Style, Macro, 
    TabPages 
}) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        width: 100%;
        height: 100%;

        font-family: IBM Plex Sans;
        `;

        return {
            wrapper
        }
    });
    
    Macro((() => {
        const App = function(this: App)
        {
            
        } as RHU.Macro.Constructor<App>;

        return App;
    })(), "App", //html
        `
        <rhu-macro rhu-type="${TabPages}"></rhu-macro>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });
});