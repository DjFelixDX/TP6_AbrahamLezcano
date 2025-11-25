(function(){
  const modal = document.getElementById('modal-user');
  const form = document.getElementById('user-form');
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const greeting = document.getElementById('greeting');
  const userFull = document.getElementById('user-fullname');
  const btnChange = document.getElementById('btn-change-user');
  const btnClear = document.getElementById('btn-clear');
  const modalCancel = document.getElementById('modal-cancel');

  function showModal(){
    modal.classList.add('show');
    modal.setAttribute('open','');
    nombreInput.focus();
  }

  function hideModal(){
    modal.classList.remove('show');
    modal.removeAttribute('open');
  }

  function setUser(nombre, apellido){
    const full = `${nombre.trim()} ${apellido.trim()}`.trim();
    if(!full) return;
    localStorage.setItem('pm_user', JSON.stringify({nombre, apellido}));
    userFull.textContent = full;
    greeting.textContent = `¡Bienvenido/a, ${nombre}!`;
    greeting.animate([{opacity:0, transform:'translateY(-8px)'},{opacity:1, transform:'none'}], {duration:400, easing:'ease-out'});
  }

  function loadUser(){
    const raw = localStorage.getItem('pm_user');
    if(!raw) return null;
    try{ return JSON.parse(raw); }catch(e){ return null; }
  }

  if(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      const n = nombreInput.value || '';
      const a = apellidoInput.value || '';
      if(!n.trim() || !a.trim()) return alert('Por favor ingresa nombre y apellido.');
      setUser(n,a);
      hideModal();
    });
  }

  if(btnChange){
    btnChange.addEventListener('click', function(){
      const current = loadUser();
      if(current){
        nombreInput.value = current.nombre || '';
        apellidoInput.value = current.apellido || '';
      } else {
        nombreInput.value = '';
        apellidoInput.value = '';
      }
      showModal();
    });
  }

  if(modalCancel){
    modalCancel.addEventListener('click', function(){ hideModal(); });
  }

  if(btnClear){
    btnClear.addEventListener('click', function(){
      localStorage.removeItem('pm_user');
      userFull.textContent = "-- aún no registrado --";
      greeting.textContent = "¡Bienvenido/a!";
    })
  }

  document.addEventListener('DOMContentLoaded', function(){
    const user = loadUser();
    if(user && user.nombre){
      setUser(user.nombre, user.apellido || '');
    } else {
      greeting.textContent = "¡Hola! Bienvenido/a al Proyecto Multimedia";
      setTimeout(showModal, 700);
    }

    document.querySelectorAll('.dropdown-toggle').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const parent = e.currentTarget.parentElement;
        parent.classList.toggle('open');
        const menu = parent.querySelector('.dropdown-menu');
        if(menu) menu.style.display = parent.classList.contains('open') ? 'block' : 'none';
      })
    });
  });
})();