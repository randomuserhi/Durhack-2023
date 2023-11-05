declare namespace RHU {
    interface Modules {
        "components/organsisms/VisualScripting/style": {
            wrapper: Style.ClassName;
            canvas: Style.ClassName;
            hud: Style.ClassName;
            editor: Style.ClassName;
            active: Style.ClassName;
            newNode: Style.ClassName;
            closeMonaco: Style.ClassName;
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
        overflow: hidden;
        `;

        const canvas = style.class`
        position: absolute;
        top: 0;
        height: 0;
        width: 100%;
        height: 100%;
        `;

        const hud = style.class`
        position: absolute;
        display: flex;
        gap: 0.125rem;
        padding: 0.125rem;
        border-radius: 5px;
        background-color: #333;
        color: white;
        bottom: 1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
        `;

        const newNode = style.class`
        text-align: center;
        padding-top: 0.25rem;
        padding-left: 0.25rem;
        `;
        style`
        ${newNode}::before {
            font-size: 3rem;
            font-family: codicon;
            content: "\\ec19";
            cursor: pointer;
            text-align: center;
            user-select: none;
            -webkit-user-select: none;
            cursor: pointer;
        }
        `;

        const closeMonaco = style.class`
        text-align: center;
        padding-top: 0.25rem;
        padding-left: 0.25rem;
        `;
        style`
        ${closeMonaco}::before {
            font-size: 1.25rem;
            color: white;
            font-family: codicon;
            content: "\\eab8";
            cursor: pointer;
            text-align: center;
            user-select: none;
            -webkit-user-select: none;
            cursor: pointer;
        }
        `;

        const active = style.class`
        `;
        
        const editor = style.class`
        display: none;
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        flex-direction: column;
        `;
        style`
        ${editor}${active} {
            display: flex;
        }
        `;

        return {
            wrapper,
            canvas,
            hud,
            editor,
            newNode,
            active,
            closeMonaco
        };
    });

    return style;
});