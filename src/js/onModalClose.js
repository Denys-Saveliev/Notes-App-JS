import toggleModal from './toggleModal';
import refs from './refs';

export default function onModalClose() {
  toggleModal();
  delete refs.form.dataset.id;
  refs.form.reset();
  refs.form.elements.submitBtn.textContent = 'Create note';
}
