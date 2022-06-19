import { toCapitilizeCategory } from './onSubmitForm';

export default function calculationTotalCategories(items) {
  const categories = [...new Set(items.map(todo => todo.category))];

  const markup = categories
    .map(category => {
      return `<div class="container active">
         <ul class="active-list active-list--archived">
            <li class="list__item list__item--archived icon ${category}"></li>
            <li class="list__item list__item--archived">${toCapitilizeCategory(
              category
            )}</li>
            <li class="list__item list__item--archived">${
              items.filter(
                todo => todo.category === category && !todo.isArchived
              ).length
            }</li>
            <li class="list__item list__item--archived">${
              items.filter(
                todo => todo.category === category && todo.isArchived
              ).length
            }</li>
         </ul>
      </div>`;
    })
    .join('');
  return markup;
}
