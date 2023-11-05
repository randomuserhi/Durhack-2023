declare namespace RHU {
    interface Modules {
        "components/atoms/TabList": "atoms/TabList";
    }

    namespace Macro {
        interface TemplateMap {
            "atoms/TabList": Atoms.TabList;
            "atoms/TabList/item": Atoms.TabList.Item
        }
    }
}

declare namespace Atoms {
    namespace TabList {
        interface Item extends HTMLLIElement {
            text: HTMLSpanElement;
            close: HTMLElement;
        }
    }
    interface TabList extends HTMLDivElement {
        addItem(text: string): TabList.Item;

        active?: TabList.Item;
    }
}

interface GlobalEventHandlersEventMap {
    "tabitem/enter": CustomEvent<{}>;
    "tabitem/exit": CustomEvent<{}>;
    "tabitem/close": CustomEvent<{}>;
}

RHU.module(new Error(), "components/atoms/TabList", { 
    Macro: "rhu/macro", style: "components/atoms/TabList/style",
}, function({ 
    Macro, style,
}) {
    const item = Macro((() => {
        const item = function(this: Atoms.TabList.Item) {
            /*const classes = [style.item.wrapper];
            for (const cl of classes) {
                this.classList.toggle(`${cl}`, true);
            }*/
        } as RHU.Macro.Constructor<Atoms.TabList.Item>;

        return item;
    })(), "atoms/TabList/item", //html
        `
        <div class="${style.item.content}">
            <span rhu-id="text">Name</span>
        </div>
        <a rhu-id="close" class="${style.item.close}"></a>
        `, {
            element: //html
            `<li class="${style.item.wrapper}"></li>`
        });

    const TabList = Macro((() => {
        const TabList = function(this: Atoms.TabList) {
            this.active = undefined;
        } as RHU.Macro.Constructor<Atoms.TabList>;

        TabList.prototype.addItem = function(text) {
            const i = document.createMacro(item);
            i.text.innerHTML = text;
            i.addEventListener("click", (e) => {
                e.stopPropagation();

                if (this.active !== i) {
                    if (this.active) {
                        this.active.classList.toggle(`${style.item.active}`, false);
                        this.active.dispatchEvent(RHU.CustomEvent("tabitem/exit", {}));
                    }
                    this.active = i;
                    this.active.classList.toggle(`${style.item.active}`, true);
                    this.active.dispatchEvent(RHU.CustomEvent("tabitem/enter", {}));
                }
            });
            i.close.addEventListener("click", (e) => {
                e.stopPropagation();

                if (this.active == i) {
                    let other = i.nextElementSibling as Atoms.TabList.Item;
                    if (i.previousElementSibling) {
                        other = i.previousElementSibling as Atoms.TabList.Item;
                    }
                    if (other) {
                        other.click();
                    }
                }
                
                i.replaceWith();
                i.dispatchEvent(RHU.CustomEvent("tabitem/close", {}));
            });
            this.append(i);
            return i;
        }

        return TabList
    })(), "atoms/TabList", //html
        `
        `, {
            element: //html
            `<ul class="${style.list.wrapper}"></ul>`
        });

    return TabList;
});