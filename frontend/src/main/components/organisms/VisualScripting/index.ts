declare namespace RHU {
    interface Modules {
        "components/organisms/VisualScripting": "organisms/VisualScripting";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/VisualScripting": Organisms.Welcome;
        }
    }
}

declare namespace Organisms {
    interface Workspace extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/VisualScripting", { 
    Macro: "rhu/macro", style: "components/organsisms/VisualScripting/style",
}, function({ 
    Macro, style,
}) {
    const Workspace = Macro((() => {
        const Workspace = function(this: Organisms.TabPages) {
        } as RHU.Macro.Constructor<Organisms.Welcome>;

        return Workspace;
    })(), "organisms/VisualScripting", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Workspace;
});