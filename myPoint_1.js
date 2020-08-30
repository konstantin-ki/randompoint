/**
*   БЛОК ОБЬЯВЛЕНИЯ ГЛОБАЛЬНЫХ КОНСТАНТ
*/

const WEIGTH_SVG = 600; // ширина SVG контейнера
const HEIGTH_SVG = 250; // высота SVG контейнера

const WEIGTH_RANDOM_RECT = 4; // ширина "случайного" прямоугольника
const HEIGTH_RANDOM_RECT = 4; // высота "случайного" прямоугольника

const WEIGTH_RECT_GLOBAL = 397; //ширина глобального прямоугольника
const HEIGTH_RECT_GLOBAL = 197; //высота глобального прямоугольника
const COORD_X_RECT_GLOBAL = 10; //смешение по оси X в пикселах глобального прямоугольника
const COORD_Y_RECT_GLOBAL = 10; //смещение по оси Y в пикселах глобального прямоугольника
const COLOR_RECT_GLOBAL = '#ffffff'; //Цвет заливки глобального прямоугольника
const CLASS_RECT_GLOBAL = 'cl-rect-global'; //класс глобального прямоугольника

const CLASS_RECT_RANDOM = 'cl-rect-random'; //класс глобального прямоугольника


/**
*   БЛОК ОБЬЯВЛЕНИЯ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ
*/
let objDraw = undefined; // объект SVG, в нем будем рисовать
let objGlobalRect = undefined; //объект "глобального" прямоугольника

let globalRect_X = 0; // координата X верхнего левого угла "глобального" прямоугольника
let globalRect_Y = 0; // координата Y верхнего левого угла "глобального" прямоугольника

let timerID = undefined;


/**
*   БЛОК ОБЬЯВЛЕНИЯ ГЛОБАЛЬНЫХ ФУНКЦИЙ
*/


/*
* Функция создает SVG контейнер
*/
function createSVG(widthSVG, heightSVG) {

  objDraw = SVG().addTo('#id-div-svg').size(widthSVG, heightSVG);
}

/*
* Функция создает прямоугольник с заданными параметрами
*/
function drawRect(rectX, rectY, widthRect, heightRect, rectColorFill, classRect) {

  return objDraw.rect(widthRect, heightRect).fill(rectColorFill).move(rectX, rectY).addClass(classRect);
}

/*
* Функция возвращает координату Х объекта.
* <objRectSVG> - класс объекта
*/
function getCoord_X(objRectSVG) {

  globalRect_X = Math.trunc($('.'+ objRectSVG).offset().left);
    return globalRect_X;
}

/*
* Функция возвращает координату Х объекта.
* <objRectSVG> - класс объекта
*/
function getCoord_Y(objRectSVG) {

  globalRect_Y = Math.trunc($('.'+ objRectSVG).offset().top);
    return globalRect_Y;
}


/*************************************************************************************/
/*******************************************RUN SECTION*******************************/
/*************************************************************************************/
$(document).ready( ()=> {

  createSVG(WEIGTH_SVG,HEIGTH_SVG); //создаем SVG контейнер

    objGlobalRect = drawRect( COORD_X_RECT_GLOBAL
                            , COORD_Y_RECT_GLOBAL
                            , WEIGTH_RECT_GLOBAL
                            , HEIGTH_RECT_GLOBAL
                            , COLOR_RECT_GLOBAL
                            , CLASS_RECT_GLOBAL); // создаем "глобальный" прямоугольник
    objGlobalRect.attr({
                         'fill-opacity': 0
                        , 'stroke': '#f06'
                        , 'stroke-width': 3
      });

  timerID = setInterval( ()=>{               
        
        //Создаем первую переменную хранящую случайное число координаты x прямоуольника
  let randomCoordinatsX = Math.floor( (Math.random() * WEIGTH_RECT_GLOBAL) );
      
      if(randomCoordinatsX < COORD_X_RECT_GLOBAL +5)
      {
        randomCoordinatsX = COORD_X_RECT_GLOBAL + 5;
      }

      if(randomCoordinatsX > WEIGTH_RECT_GLOBAL + COORD_X_RECT_GLOBAL - 5)
      {
        randomCoordinatsX = Math.floor(WEIGTH_RECT_GLOBAL + COORD_X_RECT_GLOBAL - 5);
      }

        //Создаем вторую переменную хранящую случайное число координаты y прямоуольника
  let randomCoordinatsY = Math.floor( (Math.random() * HEIGTH_RECT_GLOBAL) + COORD_Y_RECT_GLOBAL + 5 );
      if(randomCoordinatsY > HEIGTH_RECT_GLOBAL + COORD_Y_RECT_GLOBAL - 10)
        {
          randomCoordinatsY = Math.floor(HEIGTH_RECT_GLOBAL + COORD_Y_RECT_GLOBAL - 10);
        }

        //Создаем первую переменную хранящую случайный цвет прямоуольника
    let randomColors1 = (Math.trunc(Math.random()*255)).toString(16);
        if(randomColors1.length < 2) {randomColors1 = "0"+randomColors1;}
        //Создаем вторую переменную хранящую случайный цвет прямоуольника
    let randomColors2 = (Math.trunc(Math.random()*255)).toString(16);
        if(randomColors2.length < 2) {randomColors2 = "0"+randomColors2;}
        //Создаем третью переменную хранящую случайный цвет прямоуольника
    let randomColors3 = (Math.trunc(Math.random()*255)).toString(16);
        if(randomColors3.length < 2) {randomColors3 = "0"+randomColors3;}

    let resultColor = "#" + randomColors1 + randomColors2 + randomColors3;

    try{
          
          console.log( getCoord_X(CLASS_RECT_GLOBAL) ); //отладка
            console.log( getCoord_Y(CLASS_RECT_GLOBAL) ); //отладка

          drawRect(randomCoordinatsX
                  , randomCoordinatsY
                  , WEIGTH_RANDOM_RECT
                  , HEIGTH_RANDOM_RECT
                  , resultColor
                  , CLASS_RECT_RANDOM);
    }
    catch {
      
      alert(  "randomCoordinatsX: " + randomCoordinatsX.toString() +'\n'
            + "randomCoordinatsY: " + randomCoordinatsY.toString() + '\n'
            + "resultColor: " + resultColor);
    }
  
                        

                        }, 50);

  $('.cl-bt-stop').click( ()=>{offDraw(timerID);}) ;  
}); 
