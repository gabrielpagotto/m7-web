import { FetchError } from "$lib/utils/responsesUtils";
import { writable } from "svelte/store";
import { type Writable } from 'svelte/store';

type FetchState<T> = {
    isLoading: Writable<boolean>;
    isSuccess: Writable<boolean>;
    isError: Writable<string | null>;
    runAction: (...args: any[]) => Promise<T | void>;
};


export function useFetchState<T>(action: (...args: any[]) => Promise<T>): FetchState<T> {
    const isLoading = writable<boolean>(false);
    const isSuccess = writable<boolean>(false);
    const isError = writable<string | null>(null);

    async function runAction(...args: any[]): Promise<T | void> {
        isLoading.set(true);
        isSuccess.set(false);
        isError.set(null);

        try {
            const result = await action(...args);
            isSuccess.set(true);
            return result;
        } catch (error) {
            isError.set(error instanceof FetchError ? error.message : String(error));
        } finally {
            isLoading.set(false);
        }
    }

    return { isLoading, isSuccess, isError, runAction };
}