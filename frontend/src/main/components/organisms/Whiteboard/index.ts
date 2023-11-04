declare namespace RHU {
    interface Modules {
        "components/organisms/Whiteboard": "organisms/Whiteboard";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Whiteboard": Organisms.Whiteboard;
        }
    }
}

declare namespace Organisms {
    interface Whiteboard extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/Whiteboard", { 
    Macro: "rhu/macro", style: "components/organsisms/Whiteboard/style",
}, function({ 
    Macro, style,
}) {
    const Workspace = Macro((() => {
        const Workspace = function(this: Organisms.TabPages) {
        } as RHU.Macro.Constructor<Organisms.Whiteboard>;

        return Workspace;
    })(), "organisms/Whiteboard", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Workspace;
});