declare namespace RHU {
    namespace Macro {
        interface TemplateMap {
            "vs/example": VisualScripting.Macros.ExampleNode;
        }
    }
}

declare namespace VisualScripting {
    namespace Macros {
        interface ExampleNode extends HTMLDivElement {

        }
    }
}

RHU.require(new Error(), {
    Macro: "rhu/macro", Style: "rhu/style",
    vs: "VisualScripting"
}, function({ 
    Macro, Style,
    vs
}) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        position: absolute;
        top: 0;
        left: 0;

        width: 200px;
        height: 200px;
        background-color: white;
        `;

        return {
            wrapper,
        };
    });

    const node = Macro((() => {
        const node = function(this: VisualScripting.Macros.ExampleNode) {
        } as RHU.Macro.Constructor<VisualScripting.Macros.ExampleNode>;

        return node;
    })(), "vs/example", //html
        `
        `, {
            element: //html
            `<div class="${style.wrapper}"></div>`
        });

    vs.define(node, (input) => {
        return input.data;
    });
});