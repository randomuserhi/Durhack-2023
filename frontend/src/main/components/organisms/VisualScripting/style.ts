declare namespace RHU {
    interface Modules {
        "components/organsisms/VisualScripting/style": {
            wrapper: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/organsisms/VisualScripting/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        position: relative;
        width: 100%;
        height: 100%;

        background-color: #1e1e1e;
        `;

        return {
            wrapper,
        };
    });

    return style;
});