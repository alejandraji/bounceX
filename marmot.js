const sharedVariables = {
  body: document.getElementsByTagName("body")[0],
  overlay: "",
  isAppended: false
};

const buildOverlay = () => {
  if (sharedVariables.isAppended) {
    return;
  }

  // Create our overlay elements on the fly
  const backDropElement = document.createElement("div"),
    overlayElement = document.createElement("div"),
    wrapper = document.createElement("div"),
    overlayHeader = document.createElement("header"),
    closeButtonElement = document.createElement("div"),
    overlayBody = document.createElement("div"),
    overlayFooter = document.createElement("footer"),
    numberOfItemsElement = document.createElement("p"),
    cartIconButton = document.createElement("button"),
    cartLink = document.createElement("a"),
    cartTotalElement = document.createElement("p");

  // Assign existing elements to variables to be used for display and appending
  const numberOfItems =
      "Total Items: " +
      document.querySelector(".minicart-quantity").firstChild.textContent,
    cartTotal =
      "Total: " +
      document.querySelector(".mini-cart-totals .order-value").innerHTML,
    main = document.getElementById("main");

  // Set attributes
  backDropElement.setAttribute("class", "backdrop");
  overlayElement.setAttribute("class", "overlay");
  overlayElement.style.display = "flex";
  overlayElement.style.justifyContent = "center";
  wrapper.setAttribute("class", "wrapper");
  cartLink.setAttribute("href", "https://www.marmot.com/cart");
  overlayHeader.setAttribute("class", "overlay-header");
  closeButtonElement.setAttribute("class", "close");
  overlayBody.setAttribute("class", "overlay-body items");
  overlayFooter.setAttribute("class", "overlay-footer");

  // Add styles
  // Backdrop
  backDropElement.style.zIndex = "10000";
  backDropElement.style.backgroundColor = "#000";
  backDropElement.style.opacity = "0.65";
  backDropElement.style.position = "fixed";
  backDropElement.style.width = "100% ";
  backDropElement.style.height = "100%";
  backDropElement.style.top = "0";
  backDropElement.style.bottom = "0";
  backDropElement.style.webkitTransition = "all 50ms ease -in";
  backDropElement.style.transition = "all 50ms ease -in";

  // Wrapper
  wrapper.style.zIndex = "10010";
  wrapper.style.position = "absolute";
  wrapper.style.width = "70%";
  wrapper.style.background = "#FFF";
  wrapper.style.height = "auto";
  wrapper.style.borderWidth = "2px";
  wrapper.style.borderColor = "#cfe2f";
  wrapper.style.borderStyle = "solid";
  wrapper.style.lineHegith = "18px";
  wrapper.style.padding = "40px";
  wrapper.style.lineHeight = "20px";

  closeButtonElement.style.fontSize = "18px";

  overlayFooter.style.display = "flex";
  overlayFooter.style.flexDirection = "column";
  overlayFooter.style.marginTop = "20px";
  cartTotalElement.style.fontfamily = "ars_maquette_probold, sans-serif";
  numberOfItemsElement.style.fontfamily = "ars_maquette_probold, sans-serif";
  cartTotalElement.style.fontWeight = "bold";

  cartIconButton.style.alignSelf = "center";
  cartIconButton.style.color = "#fff";
  cartIconButton.style.background = "#cc0001";
  cartIconButton.style.borderWidth = "1px";
  cartIconButton.style.borderColor = "#cc0001";
  cartIconButton.style.borderStyle = "solid";
  cartIconButton.style.fontfamily = "ars_maquette_probold, sans-serif";
  cartIconButton.style.width = "50%";
  cartIconButton.style.height = "40px";
  cartIconButton.style.marginTop = "20px";

  cartLink.innerHTML = "Go to Cart";
  closeButtonElement.innerHTML = "x";
  numberOfItemsElement.innerHTML = numberOfItems;
  cartTotalElement.innerHTML = cartTotal;

  // Append elements of the overlay
  wrapper.appendChild(overlayHeader);
  wrapper.appendChild(overlayBody);
  wrapper.appendChild(overlayFooter);

  // Append elements within the overlay
  overlayHeader.appendChild(closeButtonElement);
  overlayFooter.appendChild(numberOfItemsElement);
  overlayFooter.appendChild(cartTotalElement);
  cartIconButton.appendChild(cartLink);
  overlayFooter.appendChild(cartIconButton);

  // Append overlay to the main element
  sharedVariables.body.appendChild(backDropElement);
  overlayElement.appendChild(wrapper);
  main.appendChild(overlayElement);

  // Here we'll check if the overlay has been added to the DOM.
  // And set our flag to true so the DOM doesn't continue to create and append elements.
  overlay = document.querySelectorAll(".overlay");

  if (overlay.length === 1) {
    sharedVariables.isAppended = true;
  }

  // Call our displayCartItems to add and display any cart items to the overlay.
  displayCartItems();

  // This is our close functionality
  const closeButton = document.querySelector(".close");

  if (closeButton.length !== -1) {
    sharedVariables.body.addEventListener("click", closeOverlay, false);
  }
};

/**
 * Close Button Functionality
 *
 * This function handles our close button functionality.
 */

const closeOverlay = e => {
  overlay = document.querySelector(".overlay");
  backdrop = document.querySelector(".backdrop");

  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("backdrop")
  ) {
    overlay.parentNode.removeChild(overlay);
    backdrop.parentNode.removeChild(backdrop);

    sharedVariables.isAppended = false;
  }
};

/**
 * These next two functions handle our items that a user has added to her shopping cart.
 *
 */

const displayCartItems = () => {
  const products = document.querySelector(".mini-cart-products").children;

  //convert HTML Collection to an array so we can loop through it
  const arr = [].slice.call(products);

  arr.forEach(elem => {
    const thumbsSrc = elem.querySelector(".mini-cart-image a img").src,
      itemNames = elem.querySelector(".mini-cart-name a").innerHTML,
      itemQuantity = elem.querySelector(".mini-cart-pricing .quantity .value")
        .innerHTML,
      itemPrice = elem.querySelector(".mini-cart-pricing .price").innerHTML;

    addItems(thumbsSrc, itemNames, itemQuantity, itemPrice);
  });
};

/**
 * Add Items
 *
 
 *
 * @param {src} item thumbnail source
 * @param {name} the item name
 * @param {quantity} the number of each item the user has added
 * @param {price} the price of each item
 *
 */

const addItems = (src, name, quantity, price) => {
  // create elements on the fly

  const itemElement = document.createElement("div"),
    imageElement = document.createElement("img"),
    textElement = document.createElement("p"),
    quantityElement = document.createElement("p"),
    priceElement = document.createElement("p"),
    // assign existing elements to variables
    items = document.querySelector(".items");

  // set styling or attributes
  itemElement.setAttribute("class", "item");

  imageElement.src = src;
  textElement.innerHTML = name;
  quantityElement.innerHTML = "QTY: " + quantity;
  priceElement.innerHTML = price;

  //Append elements
  itemElement.appendChild(imageElement);
  itemElement.appendChild(textElement);
  itemElement.appendChild(quantityElement);
  itemElement.appendChild(priceElement);

  items.appendChild(itemElement);
};

/**
 * Get User's Scroll Position
 *
 * This function will get a user's scroll position and then launch our overlay.
 *
 */

const getScrollPosition = () => {
  const cart = document.querySelectorAll(".minicart-empty");

  if (cart.length === 2) {
    return;
  } else {
    const position = scrollPosition(sharedVariables.body);
    const roundedPosition = Math.round(position);
    const backdrop = document.querySelector(".backdrop");

    if (roundedPosition > 90) {
      buildOverlay();
    }
  }
};

/**
 * Calculate scroll position
 *
 * @returns {number}
 *
 */

const scrollPosition = b => {
  const parent = b.parentNode,
    position =
      ((b.scrollTop || parent.scrollTop) /
        (parent.scrollHeight - parent.clientHeight)) *
      100;

  return position;
};

// Trigger
window.addEventListener("scroll", getScrollPosition, false);

// no error it closes

//immediately blue hover
//clikable
//no showing weird order events
/// bare minimum, scroll doesnt
// manual native syle empty space horizintal space
//no returns fire
