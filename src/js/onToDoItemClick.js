import { markupToDoList, isToDoArchived, toDoList } from './index';
import toggleModal from './toggleModal';
import editItemViaModal from './editItemViaModal';
import { onEscClickToCloseModal } from './index';

export default function ontoDoItemClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const elementId = e.target.dataset.id;

  switch (e.target.dataset.operation) {
    case 'edit':
      editToDoItem(elementId);
      break;

    case 'archive':
      putItemToArchive(elementId);
      break;

    case 'delete':
      deleteToDoItem(elementId);
      break;

    default:
      return;
  }

  markupToDoList(isToDoArchived);
}

function editToDoItem(id) {
  editItemViaModal(toDoList.find(todo => todo.id === id));
  toggleModal();
}

function putItemToArchive(id) {
  const findToDoIndex = toDoList.findIndex(todo => todo.id === id);
  toDoList[findToDoIndex].isArchived = !toDoList[findToDoIndex].isArchived;
}

function deleteToDoItem(id) {
  const findToDoIndex = toDoList.findIndex(todo => todo.id === id);
  toDoList.splice(findToDoIndex, 1);
}
