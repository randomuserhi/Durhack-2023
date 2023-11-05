declare namespace RHU {
    interface Modules {
        "components/atoms/ContextWindow/style": {
            wrapper: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/atoms/ContextWindow/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        `;

        return {
            wrapper,
        };
    });

    return style;
});