import refs from './refs';
import { onEscClickToCloseModal } from '.';

export default function toggleModal() {
  window.addEventListener('keydown', onEscClickToCloseModal);
  refs.modal.classList.toggle('is-hidden');
}
