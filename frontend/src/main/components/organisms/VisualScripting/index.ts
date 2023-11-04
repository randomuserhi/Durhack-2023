declare namespace RHU {
    interface Modules {
        "components/organisms/VisualScripting": "organisms/VisualScripting";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/VisualScripting": Organisms.VisualScripting;
        }
    }
}

declare namespace Organisms {
    interface VisualScripting extends HTMLDivElement {
    }
}

RHU.module(new Error(), "components/organisms/VisualScripting", { 
    Macro: "rhu/macro", style: "components/organsisms/VisualScripting/style",
}, function({ 
    Macro, style,
}) {
    const VisualScripting = Macro((() => {
        const VisualScripting = function(this: Organisms.VisualScripting) {
        } as RHU.Macro.Constructor<Organisms.VisualScripting>;

        return VisualScripting;
    })(), "organisms/VisualScripting", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return VisualScripting;
});