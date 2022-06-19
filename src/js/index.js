import refs from './refs';
import data from '../data/tempData.json';
import ontoDoItemClick from './onToDoItemClick';
import onSubmitForm from './onSubmitForm';
import toggleModal from './toggleModal';
import '../sass/main.scss';

const toDoList = [...data];

let isToDoArchived = false;
markupToDoList(isToDoArchived);
refs.itemsActiveList.addEventListener('click', ontoDoItemClick);
refs.form.addEventListener('submit', onSubmitForm);
refs.addNewItemsBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.showArchivedBtn.addEventListener('click', onShowAllArchivedItems);
refs.deleteAllItemsBtn.addEventListener('click', onDeleteAllItems);

function markupToDoList(showArchived) {
  const markup = toDoList
    .filter(todo => todo.isArchived === showArchived)
    .map(({ id, name, category, categoryText, content, created, dates }) => {
      return `<div class="container active">
         <ul class="active-list">
            <li class="list__item icon ${category}"></li>
            <li class="list__item">${name}</li>
            <li class="list__item">${created}</li>
            <li class="list__item">${categoryText}</li>
            <li class="list__item">${content}</li>
            <li class="list__item">${dates ? dates : ''}</li>
            <li class="list__item">
               <ul class="btn-list">
                  <li>
                     <button type="button" data-id=${id} data-operation='edit' class="btn icon edit">
                     </button>
                  </li>
                  <li>
                     <button type="button" data-id=${id} data-operation='archive' class="btn icon archive">
                     </button>
                  </li>
                  <li>
                     <button type="button" data-id=${id} data-operation='delete' class="btn icon bin">
                     </button>
                  </li>
               </ul>
            </li>
         </ul>
      </div>`;
    })
    .join('');
  refs.itemsActiveList.innerHTML = markup;
}

function onShowAllArchivedItems() {
  isToDoArchived = !isToDoArchived;
  markupToDoList(isToDoArchived);
}

function onDeleteAllItems() {
  const confirmingDelItems = confirm('Are you want delete all items?');
  if (confirmingDelItems) {
    toDoList.splice(0, toDoList.length);
  }
  markupToDoList(isToDoArchived);
  if (toDoList.length === 0) {
    refs.deleteAllItemsBtn.setAttribute('disabled', '');
  }
}

export { markupToDoList, isToDoArchived, toDoList };
