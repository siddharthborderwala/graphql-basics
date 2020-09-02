function generateId() {
  const id = [];
  for (let i = 0; i < 24; i++) {
    id.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
    if ((i + 1) % 6 === 0 && i !== 23) id.push('-');
  }
  return id.join('');
}

export { generateId };
