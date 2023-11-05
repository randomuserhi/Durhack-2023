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

        contextMenu: Atoms.ContextWindow;
    }
}

RHU.module(new Error(), "components/organisms/VisualScripting", { 
    Macro: "rhu/macro", style: "components/organsisms/VisualScripting/style",
    ContextWindow: "components/atoms/ContextWindow",
    nodes: "VisualScripting"
}, function({ 
    Macro, style, 
    ContextWindow,
    nodes
}) {
    const VisualScripting = Macro((() => {
        const VisualScripting = function(this: Organisms.VisualScripting) {
            this.addEventListener("contextmenu", (e) => {
                this.contextMenu.innerHTML="CRINGE";
            });
        } as RHU.Macro.Constructor<Organisms.VisualScripting>;

        return VisualScripting;
    })(), "organisms/VisualScripting", //html
        `
        <rhu-macro rhu-type="vs/example"></rhu-macro>
        <rhu-macro rhu-id="contextMenu" rhu-type="${ContextWindow}"></rhu-macro>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return VisualScripting;
});