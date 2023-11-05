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
        loadScript(): void;
        addModule(): void;
        deleteModule(): void;
        addDependency(): void;
        deleteDependency(): void;
    }
}

RHU.module(new Error(), "components/organisms/VisualScripting", { 
    Macro: "rhu/macro", style: "components/organsisms/VisualScripting/style",
    nodes: "VisualScripting"
}, function({ 
    Macro, style,
    nodes
}) {
    const VisualScripting = Macro((() => {
        const VisualScripting = function(this: Organisms.VisualScripting) {
        } as RHU.Macro.Constructor<Organisms.VisualScripting>;

        return VisualScripting;
    })(), "organisms/VisualScripting", //html
        `
        <rhu-macro rhu-type="vs/example"></rhu-macro>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return VisualScripting;
});