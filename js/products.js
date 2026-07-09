// Minimal product renderer
(async function(){
  const res = await fetch('data/products.json');
  const products = await res.json();

  function createCard(p){
    const el = document.createElement('article');
    el.className = 'product-card';
    el.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-meta">
          <span class="product-price">PHP ${p.price}</span>
          <button class="btn btn-add" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    `;
    return el;
  }

  const grid = document.getElementById('products-grid');
  products.forEach(p => grid.appendChild(createCard(p)));

  // delegate add to cart
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.btn-add');
    if(!btn) return;
    const id = btn.dataset.id;
    window.Cart.add(id, 1);
  });

  // simple search
  const search = document.getElementById('search-input');
  if(search){
    search.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      grid.innerHTML = '';
      products.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
        .forEach(p => grid.appendChild(createCard(p)));
    });
  }
})();
