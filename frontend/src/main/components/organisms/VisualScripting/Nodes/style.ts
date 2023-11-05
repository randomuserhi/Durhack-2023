declare namespace RHU {
    interface Modules {
        "components/organsisms/Node/style": {
            wrapper: Style.ClassName;
            view: Style.ClassName;
            edit: Style.ClassName;
        };
    }
}

RHU.module(new Error(), "components/organsisms/Node/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const style = Style(({ style }) => {
        const wrapper = style.class`
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        `;

        const edit = style.class`
        padding-top: 0.25rem;
        padding-left: 0.25rem;
        `;
        style`
        ${edit}::before {
            font-family: codicon;
            content: "\\ea73";
            cursor: pointer;
            text-align: center;
            user-select: none;
            -webkit-user-select: none;
        }
        `;

        const view = style.class`
        padding-top: 0.25rem;
        padding-left: 0.25rem;
        `;
        style`
        ${view}::before {
            font-family: codicon;
            content: "\\eaae";
            cursor: pointer;
            text-align: center;
            user-select: none;
            -webkit-user-select: none;
        }
        `;

        return {
            wrapper,
            edit,
            view
        }
    });

    return style;
});