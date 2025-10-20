const searchInput = document.querySelector(".searching");
const products = document.querySelectorAll("#products div");

searchInput.addEventListener("keyup", function() {
  const input = this.value.toLowerCase();

  products.forEach(product => {
    const name = product.textContent.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
});







