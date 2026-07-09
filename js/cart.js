// Lightweight cart stored in localStorage
window.Cart = (function(){
  const KEY = 't4s_cart_v1';
  let items = JSON.parse(localStorage.getItem(KEY) || '[]');

  function save(){
    localStorage.setItem(KEY, JSON.stringify(items));
    renderCount();
  }
  function renderCount(){
    const el = document.getElementById('cart-count');
    const sum = items.reduce((s,i)=>s + i.qty,0);
    if(el) el.textContent = sum;
  }
  function add(id, qty=1){
    const existing = items.find(i=>i.id===id);
    if(existing) existing.qty += qty;
    else items.push({id, qty});
    save();
    showToast('Added to cart');
  }
  function update(id, qty){
    items = items.map(i=> i.id===id? {...i, qty}: i).filter(i=>i.qty>0);
    save();
  }
  function remove(id){
    items = items.filter(i=>i.id!==id);
    save();
  }
  function clear(){
    items = [];
    save();
  }
  function get(){
    return items.slice();
  }
  function showToast(msg){
    const el = document.getElementById('site-toast');
    if(!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    setTimeout(()=> el.classList.remove('visible'),1500);
  }
  // expose
  renderCount();
  return {add, update, remove, clear, get};
})();
