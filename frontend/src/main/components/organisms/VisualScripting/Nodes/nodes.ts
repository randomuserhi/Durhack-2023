declare namespace RHU {
    interface Modules {
        "VisualScripting": {
            compileScript(script: VisualScripting.Script): Map<string, Scripting.Dataframe | undefined>;
            define(macro: string, func: (input: { 
                data?: Scripting.Dataframe; 
                metadata: any;
            }) => Scripting.Dataframe | undefined): void;
            moduleDefinitions: Map<string, Scripting.ModuleDef>;
        };
    }
}

declare namespace Scripting {
    interface Dataframe {
        rows: any[];
    }

    interface ModuleDef {
        func: (input: { 
            data?: Dataframe; 
            metadata: any;
        }) => Dataframe;
    }
    
    interface Module {
        id: string;
        dependencies: Set<string>;
        func: (data?: Dataframe) => Dataframe | undefined;
    }
}

declare namespace VisualScripting {
    interface Module {
        id: string;
        type: string;
        x: number;
        y: number;
        
        metadata: any;
    }
    interface Dependency {
        to: string;
        from: string;

        fromSide: string;
        toSide: string;
    }
    interface Script {
        modules: {
            [k in string]: Module;
        };
        dependencies: Dependency[];
    }
}

RHU.module(new Error(), "VisualScripting", {
}, function({ 
}) {
    const loaded = new Set<string>();
    const loadNodes = (nodes: {
        src: string;
        tag: string;
    }[]) => {
        for (const node of nodes) {
            if (loaded.has(node.tag)) {
                continue;
            }

            loaded.add(node.tag);
            const script = document.createElement("script");
            script.onerror = () => {
                console.error(`Failed to load node, "${node.tag}".`);
                loaded.delete(node.tag);
            };
            script.src = node.src;
            document.head.append(script);
        }
    };

    const moduleDefinitions = new Map<string, Scripting.ModuleDef>();
    const define = (macro: string, func: (input: { 
        data?: Scripting.Dataframe; 
        metadata: any;
    }) => Scripting.Dataframe) => {
        moduleDefinitions.set(macro, {
            func
        });
    };

    const compileScript = (script: VisualScripting.Script) => {
        const modules = new Map<string, Scripting.Module>(); 

        // get modules
        for (const [id, module] of Object.entries(script.modules)) {
            const func = moduleDefinitions.get(module.type)!.func;
            const metadata = module.metadata;
            modules.set(id, {
                id,
                dependencies: new Set<string>(),
                func: (data) => func({ data, metadata })
            });
        }

        // construct dependency chain
        for (const dependency of script.dependencies) {
            const to = modules.get(dependency.to)!;
            to.dependencies.add(dependency.to);
        }

        // execute modules
        let waiting: Scripting.Module[] = [];
        const cache = new Map<string, Scripting.Dataframe | undefined>();
        const execute = (module: Scripting.Module) => {
            if (module.dependencies.size === 0) {
                module.func();
                return;
            }

            const missing: string[] = [];
            for (const dependency of module.dependencies) {
                if (!cache.has(dependency)) {
                    missing.push(dependency);
                }
            }

            if (missing.length === 0) {
                waiting.push(module);
                return;
            }

            const join: Scripting.Dataframe = {
                rows: []
            };
            for (const dependency of module.dependencies) {
                join.rows.push(...cache.get(dependency)!.rows);
            }

            cache.set(module.id, module.func(join));
        }

        for (const module of modules.values()) {
            execute(module);

            let oldWaiting: Scripting.Module[];
            do 
            {
                oldWaiting = waiting;
                waiting = [];
                for (const module of oldWaiting) {
                    execute(module);
                }
            }
            while(waiting.length !== oldWaiting.length);
        }

        return cache;
    };

    return {
        define,
        compileScript,
        moduleDefinitions
    };
});