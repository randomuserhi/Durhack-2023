declare namespace RHU {
    interface Modules {
        "components/organsisms/DrawFlow/style": {
            wrapper: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/organsisms/DrawFlow/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        width: 100%;
        height: 100%;
        `;

        return {
            wrapper,
        };
    });

    return style;
});