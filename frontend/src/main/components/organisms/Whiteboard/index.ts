declare namespace RHU {
    interface Modules {
        "components/organisms/Whiteboard": "organisms/Whiteboard";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Whiteboard": Organisms.Welcome;
        }
    }
}

declare namespace Organisms {
    interface Workspace extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/Whiteboard", { 
    Macro: "rhu/macro", style: "components/organsisms/Whiteboard/style",
}, function({ 
    Macro, style,
}) {
    const Workspace = Macro((() => {
        const Workspace = function(this: Organisms.TabPages) {
        } as RHU.Macro.Constructor<Organisms.Welcome>;

        return Workspace;
    })(), "organisms/Whiteboard", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Workspace;
});