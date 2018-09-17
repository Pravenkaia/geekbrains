// Глобальные переменные:                             
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 800; // Интервал между перемещениями змейки 200
var OBSTACLE_SPEED = 2500; // Интервал между препятствиями
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат
var obstacle_timer; // Таймер для препятствий
var score = 0; // Результат

function init() {
    prepareGameField(); // Генерация поля

    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле
    
	/*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px';
    // События кнопок Старт и Новая игра, Стоп
    document.getElementById('snake-start').addEventListener('click', startGame);
    document.getElementById('snake-renew').addEventListener('click', refreshGame);
    document.getElementById('snake-stop').addEventListener('click', finishTheGame);

// Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);

}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();//создали змейку

    snake_timer = setInterval(move, SNAKE_SPEED);//каждые SNAKE_SPEED мс запускаем функцию move
    
    setTimeout(createFood, 5000);
    
    obstacle_timer = setInterval(createObstacle,OBSTACLE_SPEED);  //запускаем препятствие
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');

    snake.push(snake_head);
    snake.push(snake_tail);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);
    
    
    /*
    FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
    */
    // Определяем новую точку
    if (direction == 'x-') {
        coord_x  = coord_x - 1;
        if (coord_x  < 0 ) //выход за границы поля
            coord_x = FIELD_SIZE_X - 1;
    }
    else if (direction == 'x+') {
        coord_x = coord_x + 1;
        if (coord_x >= FIELD_SIZE_X) //выход за границы поля
            coord_x = 0;
    }
    else if (direction == 'y+') {
        coord_y = coord_y - 1;
        if (coord_y < 0)  //выход за границы поля
            coord_y = FIELD_SIZE_Y - 1;
    }
    else if (direction == 'y-') {
        coord_y = coord_y + 1;
        if (coord_y >= FIELD_SIZE_Y)  //выход за границы поля
            coord_y = 0;
    }
    
    new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x))[0];
    
    // Проверки на запрещенные ячейки  banned
    // 1) new_unit не часть змейки и не препятствие
    //убрано  2) Змейка не ушла за границу поля  // && new_unit !== undefined
    //console.log(new_unit);
    
    if (!isBannedUnit(new_unit)) { 
        
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {  
            // Находим хвост
            var removed = snake.splice(0, 1)[0];
            var classes = removed.getAttribute('class').split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
        }
    }
    else {
        finishTheGame();
    }
}

/**
//запрещенные ячейки
 * Проверка на змейку и препятствие
 * @param unit
 * @returns {boolean}
 */
function isBannedUnit(unit) {
    var check = false;
    
    // проверка на змейку
    if (snake.includes(unit)) {
        check = true;
    }
    
    //проверка на препятствие
    
    var class_of_ceil = unit.getAttribute('class');
    if (class_of_ceil.includes('obstacle')) {
        check = true;
    }
    return check;
}


/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');

    // Если еда
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();

        score++;
        show_score(); //показать счет
    }
    return check;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;

    while (!foodCreated) { //пока еду не создали
        // рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');

        // проверка на змейку, препятствие и другую еду
        if (!food_cell_classes.includes('-unit')) {
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}




/**
 * Удаление временных препятствий
 */
//удаление уже существующего препятствия
function delObstacle() {
    //ищем первый элемент класса (и единственный)
    var del_obstacle_cell = document.getElementsByClassName('obstacle-unit')[0];
    //console.log(del_obstacle_cell);
    
    if (del_obstacle_cell) {
    var del_obstacle_cell_classes = del_obstacle_cell.getAttribute('class').split(' ');
        var del_classes = '';
            for (i = 0; i < del_obstacle_cell_classes.length; i++) {
                if (del_obstacle_cell_classes[i] == 'obstacle-unit') //не добавляем в строку класс препятствия
                    continue; //а вдруг еще будут
                del_classes += del_obstacle_cell_classes[i] + ' ';
            }
        del_obstacle_cell.setAttribute('class', del_classes);  //вставляем все классы кроме класса препятствия
            //console.log(del_obstacle_cell);
    }
}

/**
 * Создание временных препятствий
 */
function createObstacle() {
    
    delObstacle(); //удаление уже существующего препятствия
    
    // олова змейки
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');
    //'cell-' + (coord_y) + '-' + (coord_x)
    var snake_coords_head = snake_head_classes[1].split('-');//преобразовали строку в массив
    var coord_y_head = parseInt(snake_coords_head[1]);
    var coord_x_head = parseInt(snake_coords_head[2]);
  
    // Определяем новую точку препятствия
    
    obstacle_x = coord_x_head;
    obstacle_y = coord_y_head;
   /*
    if (direction == 'x-') {
        obstacle_x  = coord_x_head - 3;
    }
    else if (direction == 'x+') {
        obstacle_x = coord_x_head + 3;
    }
    else if (direction == 'y+') {
        obstacle_y = coord_y_head - 3;
    }
    else if (direction == 'y-') {
        obstacle_y = coord_y_head + 3;
    }
*/
    switch (direction) {
        case 'x-':  
            obstacle_x  = coord_x_head - 3;
            break;
        case 'x+':
            obstacle_x = coord_x_head + 3;
            break;
        case 'y+':
            obstacle_y = coord_y_head - 3;
            break;
        case 'y-':
            obstacle_y = coord_y_head + 3;
            break;
    }
        
    var obstacle_cell = document.getElementsByClassName('cell-' + obstacle_y + '-' + obstacle_x)[0];
    if (obstacle_cell) {
            var obstacle_cell_classes = obstacle_cell.getAttribute('class').split(' ');
        //console.log(obstacle_cell_classes);

        // проверка на змейку  и еду и препятствие
        if (
            !obstacle_cell_classes.includes('snake-unit') && !obstacle_cell_classes.includes('food-unit')  && !obstacle_cell_classes.includes('obstacle-unit')
        ) {
            var classes = '';
            for (var i = 0; i < obstacle_cell_classes.length; i++) {
                classes += obstacle_cell_classes[i] + ' ';
            }
            obstacle_cell.setAttribute('class', classes + 'obstacle-unit');
            //console.log(obstacle_cell);
            obstacleCreated = true;
        }

    }
    
}




/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
	switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

function stop() {
    document.getElementById('snake-stop').onclick = finishTheGame;
}


//Показать текущий счет
function show_score() {
    var div_score = document.getElementsByClassName('score');
    if (score) {
       div_score[0].innerHTML = "Ваш счет: "  + score;
    }
    
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(obstacle_timer);
    
    alert('Вы проиграли! Ваш результат: ' + score.toString());
    location.reload(); //чтобы не стартоать кучу змеек
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;