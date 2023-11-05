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
}, function({ 
    Macro, style,
    TabList,
}) {
    const TabPages = Macro((() => {
        const TabPages = function(this: Organisms.TabPages) {
            //this.createTab("Welcome", document.createMacro("organisms/Welcome")).click();
            this.createTab("Workspace", document.createMacro("organisms/VisualScripting")).click();
        } as RHU.Macro.Constructor<Organisms.TabPages>;

        TabPages.prototype.createTab = function(name, content) {
            const item = this.tablist.addItem(name);
            item.addEventListener("tabitem/enter", () => {
                this.content.replaceChildren(content);
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