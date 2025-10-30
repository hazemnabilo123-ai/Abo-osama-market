const searchInput = document.querySelector(".searching");
const products = document.querySelectorAll("#products div");

searchInput.addEventListener("keyup", function() {
  const input = this.value.toLowerCase();

  products.forEach(product => {
    const name = product.textContent.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });

});



// عند الضغط على كلمة المنتجات
document.querySelector(".dropbtn").addEventListener("click", function() {
  document.getElementById("menu").classList.toggle("show");
});

// إغلاق القائمة لو ضغطت في أي مكان براها
window.addEventListener("click", function(e) {
  if (!e.target.matches('.dropbtn')) {
    const dropdown = document.getElementById("menu");
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
});



