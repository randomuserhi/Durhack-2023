declare namespace RHU {
    interface Modules {
        "VisualScripting": void;
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
        func: (data?: Dataframe) => Dataframe;
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
    const moduleDefinitions = new Map<string, Scripting.ModuleDef>();

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
        const waiting: Scripting.Module[] = [];
        const cache = new Map<string, Scripting.Dataframe>();
        for (const module of modules.values()) {
            if (module.dependencies.size === 0) {
                module.func();
                continue;
            }

            const missing: string[] = [];
            for (const dependency of module.dependencies) {
                if (!cache.has(dependency)) {
                    missing.push(dependency);
                }
            }

            if (missing.length === 0) {
                waiting.push(module);
                continue;
            }

            const join: Scripting.Dataframe = {
                rows: []
            };
            for (const dependency of module.dependencies) {
                join.rows.push(...cache.get(dependency)!.rows);
            }

            cache.set(module.id, module.func(join));

            // TODO(randomuserhi): Reconcile shit
        }
    };
});