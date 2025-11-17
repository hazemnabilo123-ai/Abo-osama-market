      // === دمج مع كود البحث السابق (بسيط) ===
      const searchInput = document.querySelector('.searching');
      const products = document.querySelectorAll('#products .item');

      searchInput.addEventListener('input', function(){
        const input = this.value.trim().toLowerCase();
        products.forEach(product=>{
          const name = product.dataset.name?.toLowerCase() || product.textContent.toLowerCase();
          product.style.display = name.includes(input) ? 'block' : 'none';
        });
      });

      // === سلة المشتريات ===
      const cartToggle = document.getElementById('cartToggle');
      const cartPanel = document.getElementById('cartPanel');
      const closeCart = document.getElementById('closeCart');
      const cartCount = document.getElementById('cartCount');
      const cartItemsEl = document.getElementById('cartItems');
      const cartTotalEl = document.getElementById('cartTotal');
      const emptyNote = document.getElementById('emptyNote');

      let cart = [];

      function renderCart(){
        // مسح العناصر القديمة
        cartItemsEl.querySelectorAll('.cart-item').forEach(n=>n.remove());

        if(cart.length===0){
          emptyNote.style.display='block';
        } else {
          emptyNote.style.display='none';
        }

        let total = 0;
        cart.forEach((it, idx) =>{
          total += it.price*it.qty;
          const el = document.createElement('div');
          el.className='cart-item';
          el.innerHTML = `
            <img src="${it.img}" alt="${it.name}">
            <div class="meta">
              <p>${it.name}</p>
              <small>${it.price} جنيه × ${it.qty}</small>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;align-items:center">
              <button data-idx="${idx}" class="increase">+</button>
              <button data-idx="${idx}" class="decrease">-</button>
            </div>
          `;
          cartItemsEl.appendChild(el);
        });

        cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
        cartTotalEl.textContent = total + ' جنيه';

        // أزرار الزيادة والنقصان
        cartItemsEl.querySelectorAll('.increase').forEach(btn=>{
          btn.addEventListener('click',()=>{
            const i = +btn.dataset.idx; cart[i].qty++; renderCart();
          });
        });
        cartItemsEl.querySelectorAll('.decrease').forEach(btn=>{
          btn.addEventListener('click',()=>{
            const i = +btn.dataset.idx; cart[i].qty--; if(cart[i].qty<=0) cart.splice(i,1); renderCart();
          });
        });
      }

      // فتح وغلق السلة
      cartToggle.addEventListener('click', ()=>{
        cartPanel.classList.toggle('open');
        const open = cartPanel.classList.contains('open');
        cartPanel.setAttribute('aria-hidden', !open);
      });
      closeCart.addEventListener('click',()=>cartPanel.classList.remove('open'));

      // إضافة منتج
      document.querySelectorAll('.add-to-cart').forEach(btn=>{
        btn.addEventListener('click', (e)=>{
          e.stopPropagation();
          const item = btn.closest('.item');
          const name = item.dataset.name || item.querySelector('p').textContent;
          const price = parseFloat(item.dataset.price) || 0;
          const img = item.querySelector('img')?.src || '';

          // لو المنتج موجود نزود الكمية
          const existing = cart.find(c=>c.name===name);
          if(existing){ existing.qty++; } else { cart.push({name,price,img,qty:1}); }
          renderCart();
          // وافتح السلة بشكل خفيف لاظهار التأثير
          cartPanel.classList.add('open');
        });
      });

      // لو ضغطت على الكارد كامل نفس الفعل
      document.querySelectorAll('#products .item').forEach(item=>{
        item.addEventListener('click', (e)=>{
          if(e.target.classList.contains('add-to-cart')) return; // تم التعامل
          const name = item.dataset.name || item.querySelector('p').textContent;
          const price = parseFloat(item.dataset.price) || 0;
          const img = item.querySelector('img')?.src || '';
          const existing = cart.find(c=>c.name===name);
          if(existing){ existing.qty++; } else { cart.push({name,price,img,qty:1}); }
          renderCart();
          cartPanel.classList.add('open');
        });
      });



      // تهيئة العرض
      renderCart();