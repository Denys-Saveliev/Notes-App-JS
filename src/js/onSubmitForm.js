import { markupToDoList, isToDoArchived, toDoList } from './index';
import refs from './refs';
import toggleModal from './toggleModal';
import flatpickr from 'flatpickr';
import uniqid from 'uniqid';

function onSubmitForm(e) {
  e.preventDefault();

  const form = e.currentTarget.elements;

  const id = uniqid();
  const today = flatpickr.formatDate(new Date(), 'F d, Y');
  const newToDoItem = {
    id,
    name: form.name.value,
    category: form.category.value,
    categoryText: toCapitilizeCategory(form.category.value),
    created: today,
    content: form.content.value,
    isArchived: false,
    dates: form.content.value
      .split(' ')
      .filter(str =>
        str.match(
          '^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$'
        )
      ),
  };

  const elementIdToChange = refs.form.dataset.id;
  if (elementIdToChange) {
    updateToDoItem(elementIdToChange, newToDoItem);
    form.submitBtn.textContent = 'Create note';
  } else {
    toDoList.push(newToDoItem);
  }

  delete refs.form.dataset.id;

  e.currentTarget.reset();
  toggleModal();
  markupToDoList(isToDoArchived);
}

function toCapitilizeCategory(category) {
  let categoryText = '';
  switch (category) {
    case 'idea':
      categoryText = 'Idea';
      break;
    case 'thought':
      categoryText = 'Random thought';
      break;
    case 'task':
      categoryText = 'Task';
      break;

    case 'quote':
      categoryText = 'Quote';
      break;
  }
  return categoryText;
}

function updateToDoItem(id, { name, category, categoryText, content, dates }) {
  const index = toDoList.findIndex(todo => todo.id === id);
  toDoList[index].name = name;
  toDoList[index].category = category;
  toDoList[index].categoryText = categoryText;
  toDoList[index].content = content;
  toDoList[index].dates = dates;
}

export { onSubmitForm, toCapitilizeCategory };
