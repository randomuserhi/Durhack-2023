declare namespace RHU {
    interface Modules {
        "components/organisms/Node": "organisms/Node";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Node": Organisms.Node;
        }
    }
}

declare namespace Organisms {
    interface Node extends HTMLDivElement {
        set(id: number): void;
        
        viewFrag: DocumentFragment;

        view: HTMLElement;
        edit: HTMLElement;
        
        dFlowID: number;
        flowID: HTMLSpanElement;
        dependencies: Set<number>;
        code: string;
    }
}

RHU.module(new Error(), "components/organisms/Node", { 
    Macro: "rhu/macro", style: "components/organsisms/Node/style",
}, function({ 
    Macro, style,
}) {
    const Node = Macro((() => {
        const Node = function(this: Organisms.Node) {
            this.code = "";
            this.dependencies = new Set();
        } as RHU.Macro.Constructor<Organisms.Node>;

        Node.prototype.set = function(id: number) {
            this.dFlowID = id;
            this.flowID.innerHTML = `${id}`;
        }

        return Node;
    })(), "organisms/Node", //html
        `
        <a rhu-id="view" class="${style.view}"></a>
        <a rhu-id="edit" class="${style.edit}"></a>
        <span style="flex: 1;" contenteditable>Action</span>
        <span rhu-id="flowID"></span>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Node;
});