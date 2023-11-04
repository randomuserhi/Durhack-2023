declare namespace RHU {
    interface Modules {
        "components/organisms/Welcome": "organisms/Welcome";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Welcome": Organisms.Welcome;
        }
    }
}

declare namespace Organisms {
    interface Welcome extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/Welcome", { 
    Macro: "rhu/macro", style: "components/organsisms/Welcome/style",
}, function({ 
    Macro, style,
}) {
    const Welcome = Macro((() => {
        const Welcome = function(this: Organisms.TabPages) {
        } as RHU.Macro.Constructor<Organisms.Welcome>;

        return Welcome;
    })(), "organisms/Welcome", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Welcome;
});