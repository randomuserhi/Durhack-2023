declare namespace RHU {
    interface Modules {
        "components/organisms/DrawFlow": "organisms/DrawFlow";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/DrawFlow": Organisms.DrawFlow;
        }
    }
}

declare namespace Organisms {
    interface DrawFlow extends HTMLDivElement {
        createNode(x: number, y: number): Organisms.Node;

        editor: any;
    }
}

declare var Drawflow: any;

RHU.module(new Error(), "components/organisms/DrawFlow", { 
    Macro: "rhu/macro", style: "components/organsisms/DrawFlow/style",
    Node: "components/organisms/Node"
}, function({ 
    Macro, style,
    Node
}) {
    const DFlow = Macro((() => {
        const DFlow = function(this: Organisms.DrawFlow) {
            this.editor = new Drawflow(this);
            this.editor.start();
        } as RHU.Macro.Constructor<Organisms.DrawFlow>;

        DFlow.prototype.createNode = function(x: number, y: number) {
            let node = document.createMacro(Node);
            node.set(this.editor.addNode("node", 1, 1, x, y, "node", {}, node, "rhu"));
            return node;
        }

        return DFlow
    })(), "organisms/DrawFlow", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return DFlow;
});