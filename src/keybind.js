document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey && event.key === 'h') || (event.metaKey && event.key === 'h')) {
    event.preventDefault();
    window.location.href = '/src/pages/index.html';
  }
});
