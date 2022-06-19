import refs from './refs';

export default function editItemViaModal({ id, name, category, content, created }) {
  const form = refs.form.elements;
  refs.form.dataset.id = id;
  form.title.value = 'Please edit your note from ' + created;
  form.name.value = name;
  form.category.value = category;
  form.content.value = content;
  form.submitBtn.textContent = 'Save change';
}
