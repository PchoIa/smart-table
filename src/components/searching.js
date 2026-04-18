export function initSearching(searchField) {
    return (query, state, action) => {
        const search = state[searchField];

        return search ?
            { 
                ...query,  // проверяем, что в поле поиска было что-то введено
                search, // устанавливаем в query параметр
            } 
            : query; // если поле с поиском пустое, просто возвращаем query без изменений
    }
}