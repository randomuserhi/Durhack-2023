declare namespace RHU {
    interface Modules {
        "components/organsisms/TabPages/style": {
            wrapper: Style.ClassName;
            content: Style.ClassName;
            navbar: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/organsisms/TabPages/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        `;

        const content = style.class`
        width: 100%;
        flex: 1;
        `;

        const navbar = style.class`
        display: flex;
        `;

        return {
            wrapper,
            content,
            navbar,
        };
    });

    return style;
});