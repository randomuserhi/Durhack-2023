declare namespace RHU {
    interface Modules {
        "components/atoms/ContextWindow": "atoms/ContextWindow";
    }

    namespace Macro {
        interface TemplateMap {
            "atoms/ContextWindow": Atoms.TabList;
        }
    }
}

declare namespace Atoms {
    interface ContextWindow extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/atoms/ContextWindow", { 
    Macro: "rhu/macro", style: "components/atoms/ContextWindow/style",
}, function({ 
    Macro, style,
}) {
    const ContextWindow = Macro((() => {
        const ContextWindow = function(this: Atoms.ContextWindow) {
        } as RHU.Macro.Constructor<Atoms.ContextWindow>;

        return ContextWindow
    })(), "atoms/ContextWindow", //html
        `
        
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return ContextWindow;
});