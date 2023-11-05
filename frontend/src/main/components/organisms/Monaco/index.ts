declare namespace RHU { 
    interface Modules {
        "components/organisms/Monaco": "organisms/Monaco";
    }
    
    namespace Macro {
        interface TemplateMap {
            "organisms/Monaco": Organisms.Monaco;
        }      
    }
}

declare namespace Organisms {
    interface Monaco extends HTMLDivElement {
        editor: monaco.editor.IStandaloneCodeEditor;

        getCode(): string;
        loadCode(code: string): void;
    }
}

commonjs(new Error(), ["vs/editor/editor.main"], () => { RHU.module(new Error(), 
    "components/organisms/Monaco", { 
        Macro: "rhu/macro" 
    }, function({
        Macro 
    }) {
        const Monaco = Macro((() => {
            const Monaco = function(this: Organisms.Monaco)
            {
                this.style.width = "100%";
                this.style.height = "100%";

                this.editor = monaco.editor.create(this, {
                    language: 'javascript',
                    automaticLayout: true,
                });
            } as any as RHU.Macro.Constructor<Organisms.Monaco>;
            
            Monaco.prototype.getCode = function() {
                return this.editor.getValue();
            };

            Monaco.prototype.loadCode = function(code) {
                this.editor.setValue(code);
            };

            return Monaco;
        })(), "organisms/Monaco", //html
        `
        `, {
            element: //html
            `<div></div>`
        });

        return Monaco;
    }
);});