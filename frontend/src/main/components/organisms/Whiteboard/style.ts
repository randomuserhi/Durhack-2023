declare namespace RHU {
    interface Modules {
        "components/organsisms/Whiteboard/style": {
            wrapper: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/organsisms/Whiteboard/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        `;

        return {
            wrapper,
        };
    });

    return style;
});