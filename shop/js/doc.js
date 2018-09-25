//вывод товаров на страницу
function createCatalog(idOfTeg)  {
    var i, product_blocks = '', blocks;
    
    if (divParent = document.getElementById('catalog')) toReset(idOfTeg,'catalog'); // удаляем элемент, если существует 
    
    
    //формируем текст каталога из массива объектов товара
    
    for (i = 0; i < product.length; i++) {
        
      product_blocks += '<div id="divPr' + i + '"  class="product">\n\n';
        
        product_blocks += '<div><img src="' + product[i].imgs + '"></div>';
        product_blocks += '<div class="prodName">' + product[i].name + '</div>';
        product_blocks += '<div class="prodName">' + product[i].quantity + ' шт.</div>';
        product_blocks += '<div class="price">' + product[i].price + 'р.</div>';
        if (product[i].discont > 0) 
            product_blocks += '<div class="discont">' + product[i].discont + '%</div>\n';
        product_blocks += '<div><button id="but' + i +'" onclick="push_in_Bascet(' + i + ', 1);">Добавить в корзину</button></div>\n';
        
      product_blocks += '</div>';  

    }
        
   //console.log(product_blocks);
    
    // создаем элемент  (с классом и id). Вставляем содержимое в документ
    
    toMakeElem ('div', 'catalog', 'catalog', idOfTeg, product_blocks);
}



// функция. корзина товаров на странице

function showCart (idOfTeg) {  // получаем idOfTeg -- родителский id элемента
    
    if (divParent = document.getElementById('basket')) toReset(idOfTeg,'basket'); // удаляем, если существует
    
    var show_cart = '';
    
     //обращаемя к функции расчета корзины
    show_cart = countBasketPrice(goodsInBascet); 
    
    // создаем элемент  (с классом и id). Вставляем содержимое в документ
    
    toMakeElem ('div', 'basket', 'basket', idOfTeg, show_cart);
    
    
}



function toReset(papa,kid) {
    
    //удаление корзины, если уже есть
    
    var toDelParent = document.getElementById(papa); // ищем родительский
    var toDel = document.getElementById(kid);  // ищем дочерний (созданный)
    
    if (toDelParent && toDelParent)
        toDelParent.removeChild(toDel); // удаляем дочерний (созданный)
    
}


function toMakeElem (
                    elem,       // тег (div и т.д.)
                    id_elem,    // id будущего елемента
                    class_elem, // class будущего елемента
                    papa,       // id родителя
                    text        // содержимое тега
                    ) {
    
    blocks = document.createElement(elem);
    blocks.className = class_elem;
    blocks.id = id_elem;
    blocks.innerHTML = text;
    
        
    // создаем корзину в документе 
    divParent = document.getElementById(papa); // ищем родительский
    divParent.appendChild(blocks);  //добавляем в родителя
}
