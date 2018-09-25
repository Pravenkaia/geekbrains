var chessPiecesWhite, pawnWhite, chessPiecesBlack, pawnBlack; //шахматные фигуры, пешка
var letters = ['A','B','C','D','E','F','G','H']; 
chessPiecesWhite = [
    
    '&#9814;',    //  ладья  rook
    '&#9816;',    //  конь   knigte
    '&#9815;',    //  слон   bishop
    '&#9813;',    //  королева  queen
    '&#9812;',    //  король    king
    '&#9815;',    //  слон
    '&#9816;',    //  конь
    '&#9814;',    //  ладья
    
    ];
//пешки
    pawnWhite = '&#9817;';

    chessPiecesBlack = [
    '&#9820;',    //  ладья
    '&#9822;',    //  конь
    '&#9821;',    //  слон
    '&#9819;',    //  королева
    '&#9818;',    //  король
    '&#9821;',    //  слон
    '&#9822;',    //  конь
    '&#9820;',    //  ладья
    ];
  //пешки
    pawnBlack = '&#9823;';




// удаление таблицы
function toReset(idOfTeg) {
    
    var toDelParent = document.getElementById(idOfTeg); // родительский
    var toDel = document.getElementById('tab');  // ищем созданную таблицу
    
    if (toDelParent && toDelParent)
        toDelParent.removeChild(toDel); // удаляем созданную таблицу
    
}


//создать шахматную доску
function createChessBoard(idOfTeg) {
    
    //  удаление таблицы доски, если уже есть
    if (divParent = document.getElementById('tab')) toReset(idOfTeg);

    var index_bg, table, tr, td, tdId, bg;
    //  фон клеток
    

    var tableMaking = '';
    
    
    //строки и ячейки таблицы
    for (var i = 0; i < 10; i++) {
        
        //строки
        tableMaking += '<tr id="tr' + i + '">';
        
        for (var j = 0; j < 10; j++) {
            
            //ячейки
           tableMaking +=  '<td id="td';
            
            //  id ячейки 
           if (i > 0 && i < 9 ) { //не крайние строки: НЕ первая и не последняя 
                if (j > 0 && j < 9) // ячейки НЕ крайние
                    tableMaking +=  letters[j-1] + i;  // e2 e4 координаты. задаем id в координатах шахмат
                else   // крайние ячейки
                    tableMaking +=  '' + i + j;  //строк td с числовыми координатами
            }
            else { //крайние строки
                tableMaking +=  '' + i + j;  //строк td с числовыми координатами
            }
            
            tableMaking += '"></td>';
            
        }
        
        tableMaking += '</tr>\n';

    }
    
    table = document.createElement('table');
    table.className = 'tab';
    table.id = 'tab';
    table.innerHTML = tableMaking;
    
    // создаем таблицу
    divParent = document.getElementById(idOfTeg); // родительский
    divParent.appendChild(table);  //добавляем в родителя
    //console.log(divParent);
    
   
    // задать классы ячейкам
    //  стили ячеек,  массив названий классов

    bg = [
        'bg_dark',
        'bg_bright'
    ];
    
    // красим клетки
    for (i = 1; i < 9; i++ ) {
 
        index_bg = i%2; 
        
        for (j = 1 ; j < 9; j++) {  
            tdId = 'td' + letters[j-1] + i;
 
            td = document.getElementById(tdId);
            //console.log(td);
            td.className = bg[index_bg++];
            
            if (index_bg > 1) 
                index_bg = 0;
        }
    }
 

}



//подписать поля доски
function toSetNumbers () {
    var td, tdFirst, tdLast, tr0td, tr9td;
        
    //стили ячейкам
    for (var i = 1; i < 9; i++) {
        
        tdFirst = 'td' + i + '0';
        tdLast  = 'td' + i + '9';
        tr0td   = 'td0' + i;
        tr9td   = 'td9' + i;
        
        td = document.getElementById(tdFirst);
        td.className = 'firstTd';
        td.innerHTML = 9 - i;
        
        td = document.getElementById(tdLast);
        td.className = 'lastTd';
        td.innerHTML = 9 - i;
        
        td = document.getElementById(tr0td);
        td.innerHTML = letters[i-1];
        
        td = document.getElementById(tr9td);
        td.innerHTML = letters[i-1];
        
    }
    
}



function toSetPices() {
    
    var td, tdF;
    
    for (var i = 1; i < 9; i++) {
            
        tdF = 'td' + letters[i-1] + 1;
        td = document.getElementById(tdF);
        td.innerHTML = chessPiecesBlack[i-1];
        
        tdF = 'td' + letters[i-1] + 2;
        td = document.getElementById(tdF);
        td.innerHTML = pawnBlack;
        
        tdF = 'td' + letters[i-1] + 8;
        td = document.getElementById(tdF);
        td.innerHTML = chessPiecesWhite[i-1];
        
        tdF = 'td' + letters[i-1] + 7;
        td = document.getElementById(tdF);
        td.innerHTML = pawnWhite;
        
    }
    
    console.log(document.getElementById('tab'));
}
