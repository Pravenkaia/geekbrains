//функция построения объекта товара

        make_product = function(
            product_name,
            price,
            discont,
            product_colour,
            product_size,
            product_quantity,
            product_brend,
            imgs
            ) {
             this.name      = product_name;
            this.price     = price;
            this.size      = product_size;
            this.discont   = discont;
            this.colour    = product_colour;
            this.quantity  = product_quantity;
            this.brend     = product_brend;
            this.imgs      = imgs;  
            
            this.addQuantity=function(n)  {
                this.quantity += n;
            }
            
            this.delQuantity=function(n)  {
                this.quantity -= n;
            }
        }
        
        var i = 0;
        var product = new Array;

        product[i++] = new  make_product ('НеМедведь', 1000, 0, 'Белый', '30','5','Wow','/img/bear.jpg');
        product[i++] = new  make_product ('Собака', 2000, 20, 'Коричневый', '20','3','Beemy','/img/dog.jpg');
        product[i++] = new  make_product ('Заяц', 1000, 0, 'Светло-розовый', '30','5','Wow','/img/haer.jpg');
        product[i++] = new  make_product ('Бисквитный монстр', 2000, 20, 'коричневый', '20','3','Beemy','/img/sesame.jpg');

        //console.log(product[3]);
        
        
       


// добавление товаро в корзину с проверкой на превышение лимита кол-ва товаров
        
    var goodsInBascet =  new Array();
        
    function push_in_Bascet(goodsID, n) {
         
         if (n > 0 && goodsID >= 0) true; //введены верные данные
         else return console.log('Ошибка добавления товара в корзину');
        
         if (goodsInBascet.length == 0) {  // корзина пуста добавляем товар в массив корзины
         
               goodsInBascet.push([goodsID, n]);  
         }
         
         else {  // контроль превышения доступного кол-ва товаров
             
             // есть товары в корзине
                var is_in_bascet = 0;
             
             for ( var i = 0; i < goodsInBascet.length; i++) {
                 
                 //сравниваем id товара корзине с id массива товаров
                 if (goodsInBascet[i][0] === goodsID) {  

                     if ( product[goodsID].quantity  >= goodsInBascet[i][1] + n ) {
                         // кол-во доступных товаров достаточно
                        is_in_bascet = 1; 
                        goodsInBascet[i][1] += n;  // меняем кол-во у этого товара
                        break;
                         
                     }
                     else { 
                         // кол-во достувных товаров будет превышено
                        // не добавляем в массив, выводим предупреждение
                        return alert('Больше нельзя добавить!');
                     }
                 }
                 
             }
            if (is_in_bascet == 0) //такого товара нет в корзине, добавляем товар  в массив корзины
                    goodsInBascet.push([goodsID, n]); 
          }
          

        showCart ('cart');  // выводим корзину
    
        //console.log(goodsInBascet);
   }     
        
// подсчет корзины
 
        function countBasketPrice(arrayOfGoods) {
            var sum = 0, goodsN = 0, id, price, discont, text_to_cart = '';

            if(arrayOfGoods.length > 0) { // есть товары в корзине
                
                for (var i = 0; i < arrayOfGoods.length; i++) {

                    // вынимаем из массива значения (для читамости)
                    
                    id      = arrayOfGoods[i][0]; // номер в массиве объектов товаров
                    ammount = arrayOfGoods[i][1]; // кол-во товара

                    price   = product[id].price;  //  цена в   объекте товара
                    discont = product[id].discont;//  скидка в  объекте товара
                    
                    
                    sum += price * (1 - discont/100) * ammount;  // стоимость 
                    
                    goodsN +=  arrayOfGoods[i][1]; //кол-во товаров

                    
                } // конец for
                
                //формируем содержимое корзины
                
                text_to_cart += '<div>Количество товаров: ' + goodsN;
                text_to_cart += '. Стоимость корзины: ' + sum + '</div>';
                text_to_cart += '<div><button id="cartYes"  onclick="change_quantity(1);">Подтвердить <br> покупку</button>   </div>'
                text_to_cart += '<div><button id="cartNo"  onclick="change_quantity(2);">Очистить <br> корзину</button></div>'
                
                //console.log(goodsInBascet) ;
               
                return  text_to_cart; 
                
            } // конец // есть товары в корзине
            else return '<div>Корзина пуста</div>';
        }


// покупка, изменение кол-ва товаров в каталоге

        function change_quantity (yes) {
            if (+yes == 1) {  // соглсие на обработку покупки
                for (var i = 0; i < goodsInBascet.length; i++) {

                    if (product[goodsInBascet[i][0]].quantity) {
                        
                        // находим товар корзины в каталоге и меняем его кол-во
                        product[goodsInBascet[i][0]].quantity -= goodsInBascet[i][1];

                    }
                }
                
                createCatalog('main');
                goodsInBascet = [];
                showCart ('cart');
              return alert('Покупка совершена!'); 
                
            }
            else { // очистка корзины
                goodsInBascet = [];
                showCart ('cart');
                return alert('Отказ от покупки!');
            }
       }
  