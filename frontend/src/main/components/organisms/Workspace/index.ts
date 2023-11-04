declare namespace RHU {
    interface Modules {
        "components/organisms/Workspace": "organisms/Workspace";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Workspace": Organisms.Welcome;
        }
    }
}

declare namespace Organisms {
    interface Workspace extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/Workspace", { 
    Macro: "rhu/macro", style: "components/organsisms/Workspace/style",
}, function({ 
    Macro, style,
}) {
    const Workspace = Macro((() => {
        const Workspace = function(this: Organisms.TabPages) {
        } as RHU.Macro.Constructor<Organisms.Welcome>;

        return Workspace;
    })(), "organisms/Workspace", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Workspace;
});