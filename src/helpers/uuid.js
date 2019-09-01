import uuidv1 from 'uuid/v4';

export function generateId() {
  const id = uuidv1();
  return id;
}
