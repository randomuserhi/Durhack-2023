declare namespace RHU { 
    interface Modules {
        "Main": void;
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

RHU.module(new Error(), "Main", { 
    Style: "rhu/style", Macro: "rhu/macro",
    TabPages: "components/organisms/TabPages"
}, function({ 
    Style, Macro, TabPages 
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