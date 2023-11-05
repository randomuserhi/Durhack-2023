declare namespace RHU {
    interface Modules {
        "components/organisms/TabPages": "organisms/TabPages";
    }

    namespace Macro {
        interface TemplateMap {
            "organisms/TabPages": Organisms.TabPages;
        }
    }
}

declare namespace Organisms {
    interface TabPages extends HTMLDivElement {
        createTab(name: string, content: Node): Atoms.TabList.Item;

        tablist: Atoms.TabList;
        content: HTMLDivElement;
    }
}

RHU.module(new Error(), "components/organisms/TabPages", { 
    Macro: "rhu/macro", style: "components/organsisms/TabPages/style",
    TabList: "components/atoms/TabList",
    Workspace: "components/organisms/Workspace"
}, function({ 
    Macro, style,
    TabList, Workspace
}) {
    const TabPages = Macro((() => {
        const TabPages = function(this: Organisms.TabPages) {
            //this.createTab("Welcome", document.createMacro("organisms/Welcome")).click();
            const workspace = document.createMacro(Workspace);
            workspace.init("christopher");
            this.createTab(workspace.name, workspace).click();
        } as RHU.Macro.Constructor<Organisms.TabPages>;

        TabPages.prototype.createTab = function(name, content) {
            const item = this.tablist.addItem(name);
            item.addEventListener("tabitem/enter", () => {
                this.content.replaceChildren(content);
            });
            item.addEventListener("tabitem/close", () => {
                if ((content as Organisms.Workspace).destructor) {
                    (content as Organisms.Workspace).destructor();
                }
            });
            return item;
        };

        return TabPages
    })(), "organisms/TabPages", //html
        `
        <div class="${style.navbar}">
            <rhu-macro rhu-id="tablist" rhu-type="${TabList}"></rhu-macro>
        </div>
        <div rhu-id="content" class="${style.content}"></div>
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    return TabPages;
});