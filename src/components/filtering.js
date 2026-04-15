import {createComparison, defaultRules, rules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes).forEach((elementName) => {
        const sellerNames = Object.values(indexes[elementName]);

        const options = sellerNames.map((name) => {
            const el = document.createElement('option');
            el.textContent = name;
            el.value = name;
            return el;
        });
        
        elements[elementName].append(...options);
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
         if (action && action.name === 'clear') {
            const parentElement = action.parentElement;
            const inputField = parentElement?.querySelector('input[type="text"], input[type="search"]');
            const fieldName = action.dataset.field;

            if (inputField) {
                inputField.value = '';
                inputField.dispatchEvent(new Event('change', {bubbles: true}));
            }

            if (fieldName) {
                state[fieldName] = '';
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter((row) => compare(row, state));
    }
}