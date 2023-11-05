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
        workspace: Organisms.Workspace;
        cache: Map<number, any>;

        drawflow: Organisms.DrawFlow;
        monaco: Organisms.Monaco;
        activeNode: Organisms.Node;

        view: HTMLDivElement;
        viewWrapper: HTMLDivElement;
        closeView: HTMLElement;

        monacoWrapper: HTMLDivElement;
        closeMonaco: HTMLElement;
        newNode: HTMLElement;

        modules: Map<number, Organisms.Node>;

        execute(): void;
    }
}

RHU.module(new Error(), "components/organisms/VisualScripting", { 
    Macro: "rhu/macro", style: "components/organsisms/VisualScripting/style",
    nodes: "VisualScripting",
    DrawFlow: "components/organisms/DrawFlow",
    Monaco: "components/organisms/Monaco",
}, function({ 
    Macro, style,
    nodes,
    DrawFlow,
    Monaco,
}) {
    const VisualScripting = Macro((() => {
        const VisualScripting = function(this: Organisms.VisualScripting) {
            (window as any).test = this;

            this.modules = new Map();

            this.drawflow.editor.on("connectionCreated", (param: any) => {
                const from = parseInt(param.output_id);
                const to = parseInt(param.input_id);

                this.modules.get(to)!.dependencies.add(from);
            });
            this.drawflow.editor.on("connectionRemoved", (param: any) => {
                const from: number = parseInt(param.output_id);
                const to: number = parseInt(param.input_id);

                this.modules.get(to)!.dependencies.delete(from);
            });

            this.newNode.addEventListener("click", () => {
                const computed = getComputedStyle(this.drawflow);
                const node = this.drawflow.createNode(-this.drawflow.editor.canvas_x + parseInt(computed.width)/2, -this.drawflow.editor.canvas_y + parseInt(computed.height)/2);

                node.edit.addEventListener("click", () => {
                    this.activeNode = node;
                    this.monaco.loadCode(node.code);
                    this.monacoWrapper.classList.toggle(`${style.active}`, true);
                });

                node.view.addEventListener("click", () => {
                    this.activeNode = node;
                    this.viewWrapper.classList.toggle(`${style.active}`, true);
                    if (node.viewFrag) {
                        this.view.replaceChildren(node.viewFrag);
                    } else {
                        this.view.replaceChildren();
                    }
                });

                this.modules.set(node.dFlowID, node);
            });

            this.closeMonaco.addEventListener("click", () => {
                this.activeNode.code = this.monaco.getCode();
                this.monacoWrapper.classList.toggle(`${style.active}`, false);
                this.execute();
            });

            this.closeView.addEventListener("click", () => {
                this.viewWrapper.classList.toggle(`${style.active}`, false);
            });
        } as RHU.Macro.Constructor<Organisms.VisualScripting>;

        VisualScripting.prototype.execute = function() {
            const run = (module: Organisms.Node) => {
                const input: {
                    [k in number]: any;
                } = {};
                for (const dependency of module.dependencies.keys()) {
                    input[dependency] = this.cache.get(dependency)!;
                }
                
                try {
                    if (module.code) {
                        const [res, frag] = (new Function(`input`, `workspace`, module.code))(input, this.workspace.files);
                        module.viewFrag = frag;
                        this.cache.set(module.dFlowID, res);
                    }
                } catch (err) {
                    console.error(`${module.dFlowID} threw an error.`);
                    console.error(err);
                }
            };

            // execute modules
            let waiting: Organisms.Node[] = [];
            this.cache = new Map<number, any>();
            const execute = (module: Organisms.Node) => {
                if (module.dependencies.size === 0) {
                    run(module);
                    return;
                }

                const missing: number[] = [];
                for (const dependency of module.dependencies.values()) {
                    if (!this.cache.has(dependency)) {
                        missing.push(dependency);
                    }
                }

                if (missing.length !== 0) {
                    waiting.push(module);
                    return;
                }

                run(module);
            }

            for (const module of this.modules.values()) {
                execute(module);

                let oldWaiting: Organisms.Node[];
                do 
                {
                    oldWaiting = waiting;
                    waiting = [];
                    for (const module of oldWaiting) {
                        execute(module);
                    }
                }
                while(waiting.length !== oldWaiting.length);
            }

            if (this.activeNode && this.activeNode.viewFrag) {
                this.view.replaceChildren(this.activeNode.viewFrag);
            } else {
                this.view.replaceChildren();
            }
        };

        return VisualScripting;
    })(), "organisms/VisualScripting", //html
        `
        <rhu-macro rhu-id="drawflow" rhu-type="${DrawFlow}"></rhu-macro>
        <div class="${style.hud}">
            <a rhu-id="newNode" class="${style.newNode}"></a>
        </div>
        <div rhu-id="monacoWrapper" class="${style.editor}">
            <div style="
            height: 35px;
            display: flex;
            flex-direction: row-reverse;
            padding: 0 2rem;
            justify-content: center;
            align-items: center;
            ">
            <a rhu-id="closeMonaco" class="${style.closeMonaco}"></a>
            <div style="flex: 1; background-color: #252526"></div>
            </div>
            <div style="
            flex: 1; background-color: white;
            ">
                <rhu-macro rhu-id="monaco" rhu-type="${Monaco}"></rhu-macro>
            </div>
        </div>

        <div rhu-id="viewWrapper" class="${style.editor}">
            <div style="
            height: 35px;
            display: flex;
            flex-direction: row-reverse;
            padding: 0 2rem;
            justify-content: center;
            align-items: center;
            ">
            <a rhu-id="closeView" class="${style.closeMonaco}"></a>
            <div style="flex: 1; background-color: #252526;"></div>
            </div>
            <div rhu-id="view" style="
            flex: 1;  background-color: white;
            ">
            </div>
        </div>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return VisualScripting;
});