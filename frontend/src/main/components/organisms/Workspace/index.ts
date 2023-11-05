declare namespace RHU {
    interface Modules {
        "components/organisms/Workspace": "organisms/Workspace";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/Workspace": Organisms.Workspace;
        }
    }
}

declare namespace Organisms {
    interface Workspace extends HTMLDivElement {
        onmessage(data: { workspace: string, type: string, content: any }): void;
        init(name: string): void;
        destructor(): void;

        name: string;
        files: Map<string, string>;
    }
}

RHU.module(new Error(), "components/organisms/Workspace", { 
    Macro: "rhu/macro", style: "components/organsisms/Workspace/style",
    App: "App"
}, function({ 
    Macro, style,
    App
}) {
    const watching = new Set<Organisms.Workspace>();
    App.ws.addEventListener("message", (e) => {
        for (const workspace of watching.values()) {
            workspace.onmessage(JSON.parse(e.data));
        }
    })
    
    const Workspace = Macro((() => {
        const Workspace = function(this: Organisms.Workspace) {
            watching.add(this);
            this.files = new Map();
        } as RHU.Macro.Constructor<Organisms.Workspace>;
        Workspace.prototype.init = function(name) {
            this.name = name;
        };

        Workspace.prototype.onmessage = function(data) {
            if (data.workspace !== this.name) {
                return;
            }

            if (data.type === "data") {
                for (const f of data.content) {
                    this.files.set(f.name, f.content);
                }
            }
        };

        Workspace.prototype.destructor = function() {
            console.log("close");
            watching.delete(this);
        };

        return Workspace;
    })(), "organisms/Workspace", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return Workspace;
});