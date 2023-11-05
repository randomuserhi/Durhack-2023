declare namespace RHU {
    interface Modules {
        "components/atoms/TabList/style": {
            list: {
                wrapper: Style.ClassName;
            },
            item: {
                wrapper: Style.ClassName;
                close: Style.ClassName;
                content: Style.ClassName;
                active: Style.ClassName;
            }
        };
    }
}

RHU.module(new Error(), "components/atoms/TabList/style", { 
    Style: "rhu/style" 
}, function({ Style }) {
    const height = `35px`;

    const list = Style(({ style }) => {

        const wrapper = style.class`
        display: flex;
        width: 100%;
        min-height: ${height};
        background-color: #252526;
        overflow-x: auto;
        overflow-y: hidden;
        `;

        return {
            wrapper,
        };
    });

    const item = Style(({ style }) => {
        const active = style.class``;

        const wrapper = style.class`
        user-select: none;

        flex-shrink: 0;
        height: ${height};
        background-color: #2d2d2d;

        display: flex;
        gap: 0.35rem;
        justify-content: center;
        align-items: center;

        padding: 0 0.5rem;

        color: rgba(255, 255, 255, 0.5);
        `;
        style`
        ${wrapper}:hover {
            cursor: pointer;
        }
        ${wrapper}${active} {
            background-color: #1e1e1e;
            color: white;
        }
        `;

        const close = style.class`
        border-radius: 3px;
        `;
        style`
        ${close}:hover {
            background-color: rgba(90, 93, 94, 0.31);
        }
        ${close}::before {
            opacity: 0;
            font-size: 1.125rem;
            font-family: codicon;
            content: "\\ea76";
        }
        ${wrapper}:hover>${close}::before,
        ${wrapper}${active}>${close}::before {
            opacity: 1;
        } 
        `;

        const content = style.class`
        display: flex;
        margin-bottom: 0.2rem;
        padding-left: 0.5rem;
        `;

        return {
            wrapper,
            close,
            active,
            content
        };
    });

    return {
        list,
        item
    };
});