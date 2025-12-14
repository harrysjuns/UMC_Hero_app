export const useLocalStorage = <T,>(key: string) => {
    const setItem = (value: unknown) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.log(e);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : null;
        } catch (e) {
            console.log(e);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};  