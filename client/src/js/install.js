const installBtn = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  installBtn.textContent = 'Install!';
});

installBtn.addEventListener('click', async () => {
  installBtn.disabled = true;
  installBtn.textContent = 'Installed!';
});

window.addEventListener('appinstalled', event => console.log('🎉', 'App installed successfully!', event));