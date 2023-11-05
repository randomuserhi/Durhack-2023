declare namespace Jobs {
    export interface Job<T extends (...args: any[]) => any = any> {
        job: T;
        params: Parameters<T>;
    }

    export function initialiseWorkers(numWorkers: number): void;
    export function enqueue(...jobs: Job[]): void;
}