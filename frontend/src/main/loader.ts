declare namespace RHU { 
    interface Modules {
        "loader": {
            require: Loader.Require;
        };
    }
}

declare namespace Loader {
    interface Require {
        (paths: string[], callback: () => void): void;
    }
}

RHU.module(new Error(), 
    "loader", {},
    function() {
        interface Require {
            (paths: string[], callback: () => void): void;
            config: ({}) => void;
        }
        const global = window as any;
        const require: Require = global.require;

        require.config({ paths: { vs: '../js3party/monaco-editor/dev/vs' } });
        //require.config({ paths: { vs: '../js3party/monaco-editor/min/vs' } });

        return {
            require: global.require
        }       
    }
);

const commonjs = (trace: Error, imports: string[], callback: () => void) => {
    RHU.require(trace, { Loader: "loader" }, 
        function({ Loader: { require } }) {
            require(imports, callback);
        }
    );
}