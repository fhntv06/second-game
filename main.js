const main = document.querySelector("main");
const mainLeft = main.offsetLeft;

const car = document.querySelector(".car");
let carRight = 0;
let carLeft = 0;

let speedCar = 0.5;
let speedOld = 0.5; 
let Ks = 6;
let max_speedCar = 5;
let carPosition = 0;
let carDirection = "";


let positionGrnd = 0;
let speedGrnd = 0.05;
let max_speedGrnd = 5;

const ground = document.querySelector(".ground");

// const garage = document.querySelector(".garage");

let check = false;

const btn = document.querySelector(".btn-close");
const modalFinal = document.querySelector(".modal__final");


// данные к первому заданию
let task_1_meters = 1500;
const task1Meters = document.querySelector(".task-1-meters");
const taskSpeedCar = document.querySelector(".speed-car");


// встречный поток машин
let position0 = main.offsetWidth;

// вызов функции для проверки ширины экрана
setInterval(
    ()=>{
        position0 = main.offsetWidth;
    }, 500);

let positionCar = 0;
let max_car = 5;
let dcar = 0;

let carsArr = [];
let carOncomingTrafficArr = [];

let carSkin = ["auto", "auto_1", "auto_2", "auto_3", "auto_4"];
let speedCarOncoming = 0;


// стрелки
const itemMoveLeft = document.querySelector(".item__move-left");
const itemMoveRight = document.querySelector(".item__move-right");

document.addEventListener("DOMContentLoaded", () => {
    car.style.background = "url(/second-game/file/img/car.png)";
    
    main.style.height = `${window.outerHeight }px`;

    
    carPosition = localStorage.getItem(carPosition);
    carDirection = localStorage.getItem(carDirection);
    
    if( carPosition != undefined && carDirection != undefined ){

        carPosition = localStorage.carPosition;
        carDirection = localStorage.carDirection;

    }
    
    car.style.left = `${carPosition}px`;

    switch( carDirection ){
        case "right":
            car.style.transform = "rotateY(180deg)";
        break;

        case "left":
            car.style.transform = "rotateY(360deg)";
        break;
    }
});

// проверка выполнения задания 
function checkTaskFirst(){

    // проверка на проезд 700 метров
    let carWay = carPosition + (positionGrnd * -1);

    if( carWay < 0 ){
        carWay = 0;
    }

    task1Meters.innerHTML = Math.round(carWay);
    
    if( carWay >= task_1_meters && !check){
        document.querySelector(".content__item-check").style.opacity = "1";

        modalFinal.classList.add("active");
    
        check = true;
    }

}

// вывод скорости машины
function checkSpeedCar(){

    // дублирование кода увеличение скорости для того
    // чтобы обойти speedCar = 0, ограничения в 75% при moveRight 
    
    speedOld += speedOld;
        
    if( speedOld >= max_speedCar ){
        
        speedOld = max_speedCar;

    }

    speedOld = Math.round(speedOld);
    speedOld = speedOld*Ks;

    taskSpeedCar.innerHTML = speedOld;

}

// движение вправо
function moveRight(event) {

    carRight = car.offsetLeft + car.offsetWidth;

    if( event.code == 'KeyD' || event.type == "mouseover"){

        car.style.transform = "rotateY(180deg)";

        car.style.backgroundImage = "url(/second-game/file/gif/auto.gif)";

        car.style.left = `${carPosition}px`;
        
        carPosition += speedCar;
        speedCar += speedCar;
        
        if( speedCar >= max_speedCar ){
            
            speedCar = max_speedCar;

        }

        // движение земли при прохождении 75% вправо 
        if( carRight >= main.offsetWidth * 0.75 ){

            car.style.backgroundImage = "url(/second-game/file/gif/auto.gif)";
            speedCar = 0;

            ground.style.backgroundPosition = `${positionGrnd}px`;
            speedGrnd += speedGrnd;

            if( speedGrnd >= max_speedGrnd  ){
                speedGrnd = max_speedGrnd;
            }

            positionGrnd -= speedGrnd;


        } 

        // задание №1
        checkTaskFirst();

        // вывод скорости
        checkSpeedCar();

    }
    
}

// движение влево
function moveLeft(event) {
    carLeft = car.offsetLeft;

    if( event.code == 'KeyA' && carLeft >= 0 ){


        car.style.transform = "rotateY(360deg)";
        car.style.backgroundImage = "url(/second-game/file/gif/auto.gif)";


        car.style.left = `${carPosition}px`;
        
        carPosition -= speedCar;
        speedCar += speedCar;

        if( speedCar >= max_speedCar ){
            
            speedCar = max_speedCar;

        }

        // движение земли при прохождении 75% вправо 
        if( carRight <= main.offsetWidth * 0.25 ){

            car.style.backgroundImage = "url(/second-game/file/gif/auto.gif)";
            speedCar = 0;

            ground.style.backgroundPosition = `${positionGrnd}px`;
            speedGrnd += speedGrnd;

            if( speedGrnd >= max_speedGrnd  ){
                speedGrnd = max_speedGrnd;
            }

        } 

    }
    
    // задание №1
    checkTaskFirst();

    // вывод скорости
    checkSpeedCar(speedCar);

}

// остановка
function stop(event){
    if( event.code == 'KeyD' || event.code == 'KeyA' ){
        car.style.backgroundImage = "url(/second-game/file/img/car.png)";
        taskSpeedCar.innerHTML = 0;

        car.style.left = `${carPosition}px`;
        speedCar = 0.1;

        localStorage.clear();
        localStorage.setItem('carPosition', carPosition );

    }

    if( event.code == 'KeyD' ){

        localStorage.setItem('carDirection', "right" );

    }else if( event.code == 'KeyA' ){

        localStorage.setItem('carDirection', "left" );

    }
}

// создание машин
function oncomingTrafficCreate(){

    if(  max_car >= dcar ){

        const carOncomingTraffic = document.createElement("div");
        carOncomingTraffic.className = "car-oncomingTraffic";
        ground.append(carOncomingTraffic);
        
        carOncomingTrafficArr = document.querySelectorAll(".car-oncomingTraffic");

        // добавление рандомного скина
        let carSkinIndex = Math.floor(Math.random( ) * ((carSkin.length - 1) - 0)) + 0;
        // добавление рандомной скорости
        speedCarOncoming = Math.floor(Math.random( ) * (2.5 - 0.5) + 0.5);

        for( let i = 0; i < carOncomingTrafficArr.length; i++ ){

            if( carOncomingTrafficArr[i].style.left < main.offsetWidth ){

                carOncomingTrafficArr[i].style.left = main.offsetWidth + carOncomingTraffic.offsetWidth+"px";

                if( !carOncomingTrafficArr[i].style.backgroundImage ){
                    carOncomingTrafficArr[i].style.backgroundImage = `url(/second-game/file/gif/${carSkin[carSkinIndex]}.gif)`; 
                }
        
            }
        }

        dcar++;
        positionCar = carOncomingTraffic.offsetLeft;

        // создание объекта со свойствами машин
        let carProperty = {
            "index": dcar,
            "positionCar": positionCar,
            "class": carOncomingTraffic.className,
            "width": carOncomingTraffic.offsetWidth,
            "carSkinIndex": carSkinIndex,
            "speedCarOncoming":speedCarOncoming
        };

        carsArr.push(carProperty);


    }

}

// движение машин
function oncomingTrafficMove(){

    if( carsArr != "" ){

        for( let i = 0; i < carsArr.length; i++){

            // если авто заезжает за левую границу экрана удаляем его и создаем новый
            if( carsArr[i].positionCar < (mainLeft - carOncomingTrafficArr[i].offsetWidth) ){

                // возвращенеи на начало
                carsArr[i].positionCar = position0;
                carOncomingTrafficArr[i].style.left = carsArr[i].positionCar;

                // меняем скин машины
                let carSkinIndex = Math.floor(Math.random( ) * ((carSkin.length - 1) - 0)) + 0;
                speedCarOncoming = Math.floor(Math.random( ) * (2.5 - 0.5) + 0.5);

                carOncomingTrafficArr[i].style.backgroundImage = `url(/second-game/file/gif/${carSkin[carSkinIndex]}.gif)`; 

            
                // удаление и вызов функции создания
                // carOncomingTrafficArr[i].remove("");

            }else{

                carOncomingTrafficArr[i].style.left = `${carsArr[i].positionCar}px`;

            }

            carsArr[i].positionCar -= carsArr[i].speedCarOncoming;

        }
    }

}

// интервал создания машин от 0.5сек до 10сек 
setInterval(oncomingTrafficCreate, Math.floor(Math.random( ) * (15000 - 2500 + 1)) + 2500);

setInterval(oncomingTrafficMove, 10);

// на нажатие клавиши
document.addEventListener('keydown', moveRight);
document.addEventListener('keydown', moveLeft);



// клик на стрелки / контроллер для мобилки
itemMoveRight.addEventListener('click', moveRight);
itemMoveLeft.addEventListener('click', moveLeft);

document.addEventListener('keyup', stop); 

btn.addEventListener("click", ()=>{
    modalFinal.classList.remove("active");
});

