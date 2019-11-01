export const getStoredItem = (key) => {
    const savedData = localStorage.getItem(key);
    return savedData;
}

export const setItemInStorage = (key, string) => {
    localStorage.setItem(key, string);
}