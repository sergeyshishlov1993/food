window.addEventListener('DOMContentLoaded', () => {
    'use strict'
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),//получаем все кнопки с странички в виде псевдомасива для вызова табов//
          tabsContent = document.querySelectorAll('.tabcontent'),//получаем сами слайды(табы)//
          tabsParent = document.querySelector('.tabheader__items');//получаем родительский блок на который будем добавлять делегирование обработчик событий//
    
    function hideTabContent () {//прописываем функцию которая будет скрывать табы//
        tabsContent.forEach(item => {//перебираем с помощью метода //
            // item.style.display = 'none'; //задаем каждому элементу масива css свойства display none//
            item.classList.add('hide');//добавляем класс для скрывание блоков который мы ранее создали в css//
            item.classList.remove('show', 'fade');//добавляем класс для показов блоков и класс анимации которые мы ранее создили в css//
        });

        tabs.forEach(tab => {//дополняем функцию удаляя класс активности с каждого элемента //
            tab.classList.remove('tabheader__item_active')
        });
    }
    
    function showTabContent (i = 0) {//просисываем функцию для показывание контента//
        // tabsContent[i].style.display = 'block';//задаем элементам массива css свойства display block и прописываем индекс массива что бы показывать определеный элемент i//
        tabsContent[i].classList.add('show', 'fade');//завдаем эдементам массива css class промсаный в css//
        tabsContent[i].classList.remove('hide',);//удаляем класс у элемента массива //
        tabs[i].classList.add('tabheader__item_active'); //назначаем на элемент массива под индексом i класс активности, для вывода на страничку только одного элемента таба//
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => { //добавляем обработчик события клик на родиьедьский блок для того что бы все наследники получили фукнкию клик//
      const target = event.target;//создаем переменую для отслеживание события клика//

      if(target && target.classList.contains('tabheader__item')) { //просисываем условия при нажатии на кнопку потомка есть ли у него вложеный класс//
        tabs.forEach((item, i) => { // перебираем массив //
            if(target == item) {//задаем условие что если нажатая кнопка соответствует элементу в массиве, вызывать функции ниже//
                hideTabContent();//вызов функции для скрытия табов и удаление класса акстивноти с элемента//
                showTabContent(i);//вызов функции для показа нужного таба и добавление класса активности у него в аргументе передаем номер индекса масива под которым записан таб//
            }
        });
      }
    });

    //Timer
    const deadline = '2023-02-24'; //указываем дату начала акции которая указана на сайте//

    function getTimeRemainihg(endtime) {//создаем функцию которая будет высчитывать разницу от текущего времени пользователя время начала акции, результат получвем в милисекундах//

        let days, hours, minutes, seconds;//обьявляем переменые которые нужны для счетчика через let что бы потом в них ихменинть значение//

        const t = Date.parse(endtime) - Date.parse(new Date());//создаем локальную техническую переменую которая будет отнимать время от даты пользователя и даты окончание акции и показывть в счетчске//

        if(t <= 0) { //прописываем условия что если оставшее время до конца акции меньше или равно 0 в переменые передавать значение 0 что бы на счетчике на сайте были указаные не отрицательные значение, а 0//
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0; 
        } else {//если указаная дата не прошла проводить ниже указаные рассчеты и выдавать значние на сайт//
            days = Math.floor(t / (1000 * 60 * 60 * 24)),//создаем переменую с методат который округляет значение, получаем от вычитание дат результат в милисекундах делем на (получаем количество милисекунд в одних сутках)//
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),//полчаем переменую t на результат выражения 1000 мл секунд * 60 сек * 60 минут % 24 через остаток от деление получим количество часов //
            minutes = Math.floor((t / 1000 / 60) % 60), //переменую t делем на 1000 мл сек / 60 сек и остаток от деление 60 получаеи количество минут//
            seconds = Math.floor((t / 1000) % 60); // переменую t делем на 1000 и получаем остаток от деление 60 получаем колтчество секунд //
        }

        return {//возврашаем обьект//
            'total': t,//ключу обьекта присваеывем количества оставшевогося времени которое мы получаем в резултате отнимание даты окончание акции от текушей в милисекундах//
            'days' : days,//передаем значение полученых дней//
            'hours' : hours,//полученых часов//
            'minutes' : minutes,//минут//
            'seconds' : seconds,//секундн//
                };
    };

    function getZero(num) {//вспомогательная функция котороя проверяет, если число меньше 10 то добавлять 0, если 10 то ничего не делать в качестве аргуента передаем значение обьекта которые будем записывать на страницу html//
        if(num >= 0 && num < 10 ){
            return `0${num}`;
        } else {
            return num;
        }
    };

    function setClok(selector, endtime) {//функция где мы получаем html эдементы со страницы html//
        const timer = document.querySelector(selector),//блок обвертка//
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);//функция внурение которая выводит значение с задержкой в первый аргумент мы передаем функцмю которая изменяет элементы на странице html, а вторым аргументом количество милисекунд//

              updateClock();

              function updateClock() {//функция которая будет выводить значение счетчика на страницу html//
                const t = getTimeRemainihg(endtime);//техническая переменая в которую мы передаем результат выполнение функции getTimeRemainihg //

                days.innerHTML = getZero(t.days);//с помошье inerHTML меняем динамически значение на странице// 
                hours.innerHTML = getZero(t.hours);//передаем в качестве аргумента функции значение обекта к которому нужно добавить 0//
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0) {//прописываем условие когда счетчику остановится //
                    clearInterval(timeInterval);//встроеная функция которая останавливает работу счетчика//
            };
        };

    };
    setClok('.timer', deadline);//вызов функции где переданы аргументы селектор класса и переменая с концом акции //


    //modal-window//
    const modalWindowActiwe = document.querySelectorAll('#modal'),
          modalWindowClose = document.querySelector('#modal-close'),
          modalWindow = document.querySelector('.modal');
          console.log(modalWindowActiwe)

          const openModal = function () {
            modalWindow.classList.add('show');
            document.body.style.overflow = 'hidden';//изменение инлайн стилей для того что бы заблокировать скрол страницы
            clearInterval(modalTemerId);//если мы сами вызываем модальное окно на странице, не показывать его автоматически //
          };

      const closeModal = function() {
            modalWindow.classList.remove('show');
            document.body.style.overflow = '';//отмена блокировки скрола вместо свойства 'hidden', оставляем пустую строку
          };

      modalWindowActiwe.forEach(item => {
          item.addEventListener('click', openModal);
          });

          modalWindow.addEventListener('click', (e) => {//часть где если кликнуть в область вне модального окна оно закроеться 
              if(e.target === modalWindow ||  e.target.classList.contains("modal__close")) {//делегирую событие, на созданый через js элемент верстки будет навешиваться тоже событие
                  closeModal()
              };
          });

      document.addEventListener('keydown', (e) => {//добавляем обработчик событий на документы и отслежтваем нажатие клавиатуры, когда мы нажимаем на esc закрывать модальное окно //
              if(e.code === 'Escape') {
                  closeModal();
              };

          });

      const modalTemerId = setTimeout(openModal, 300000);//выводить модальное окно через 5с автомотически//

      const showModalByScroll = function() {//создаем функцию куда помешаем условие и убираем обработчик событие когда пролтстаем конца страницы событие отработает один раз и больше не будет тревожить пользователя//
          if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {//прописываем условие когда мы берем боковую прокрутку и добавляем к ней область видимости клиента на сайте и сравниваем с полной прокруткой сайта, когда они совпали выполнить функцию// 
              openModal();
              window.removeEventListener('scroll',showModalByScroll);
          };
      };

      window.addEventListener('scroll',showModalByScroll); //добавляем событие со ссылкой на функцию//


//используем классы для карточек меню//

    class MenuCard  {//создаем класс прототип
        constructor(src, alt, title, descr, prise, parentSelector, ...clases) {//создаем конструктор куда передаем аргументы которые нужно подгружать динамически, ...clasese это спред оператор который берут отделиные элементы и помещаеи их в массив, моджет принимать неограниченое количество и динамически
            this.src = src;//вводим ключевое слово и передвем значение агрумента
            this.alt = alt;
            this.title = title;
            this.descr =descr;
            this.prise = prise;
            this.clases = clases; //передаем аргумент массив который может в себя принмать неограниченое количество агрументов 
            this.parent = document.querySelector(parentSelector);//получаем динамически элемент дом дерева
            this.transfer = 39;//указываем курс валюты
            this.changeToUAH();//вызываем метод который конвертирует валюту, что бы получить уже измененый результат 
        }

        changeToUAH() {//создаем метод который конвертируем валюту и передаем его в конструктор 
            this.prise = this.prise * this.transfer;
        }

        render() {//создаем метод который будет динамически подставлять заданые аргументы в html страницу
            const element = document.createElement('div'); // создаем переменую в которую помешаем создание html эдемента на странице, далее мы с помощью inerHTML передаем верстку которую нужно динамически сформировать и подставть нужные аргументы 
            if(this.clases.length === 0) {//прописываем услове что если длина масива который создал спред оператор равно 0 то добавлять элементу класс css 'menu__item'
                this.element = 'menu__item';
                element.classList.add(this.element)
            } else {//если класс 'menu__item' прописан ты использовать перебирающую конструкцию 
                this.clases.forEach(className => element.classList.add(className)); //через перебор присваеваем в переменую element css класс "menu__item" каждома элементу карточки со страницы html
            };
                element.innerHTML = `
                        <img src= ${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.prise}</span> грн/день</div>
                        </div>`;

            this.parent.append(element);//помешаем верстку в конец html документа   
        }
    }   
    
    new MenuCard(
        "img/tabs/post.jpg",//подставляем аргументы которые указали в constructor
        "post",
        'Меню "Фитнес"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        ".menu .container",//аргумент куда нужно положить блок верстки
        "menu__item",

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container",
        "menu__item"

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        ".menu .container",
        "menu__item",

    ).render();

    // Forms

    const forms = document.querySelectorAll('form');//получаем дом элемент форму с инпутами//
    const message = {//создаем обьект с ответами//
        loading: 'img/form/spinner.svg',//в свойства обьекта записываем путь к картинки которая будет показываться в качестве загрузки //
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {//для каждой формы на странице запускаем функцию//
        postData(item);
    });

    function postData(form) {//создвем функцию для выгрузки данных на сервер 
        form.addEventListener('submit', (e) => {//добавляем обработчик событий (отправка) //
            e.preventDefault();//отменяем стандартное поведение браузера перезагрузку страницы при отправки формы

            let statusMessage = document.createElement('img');//создаем динамически элемент(img) на страничке html 
            statusMessage.src = message.loading;//добавляем к переменой src и прописываем путь к изображению
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;//применяем инлайн стили css свойство cssText позволяем сразу к одноиу элементу применить список свойст 
            form.insertAdjacentElement('afterend', statusMessage);
        
            const request = new XMLHttpRequest();//создаем констркуктор для отпраки на сервер 
            request.open('POST', 'server.php');//настраиваем запросы и путь  к серверу //
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');//указываем заголовок который данных которые будет приходить на сервер если это не JSON файл то заголовок не нужен 
            const formData = new FormData(form);//создаем FormData что бы удобно записать в обьект значение инпутов //
            console.log(formData)
            const object = {};//создаем перемуную пустой обьект //
            formData.forEach(function(value, key){//перебираем FormData 
                object[key] = value;//записываем значение в обьект который создали раньше//
            });
            const json = JSON.stringify(object);//преобразовуем обькт в JSON обьект 

            request.send(json);//отправляем на сервер json переменую куда запиман JSON обьект 

            request.addEventListener('load', () => {//навешиваем обработчик события загрузка на запрос от сервера//
                if (request.status === 200) {//прописываем условия что если ответ успешный 
                    console.log(request.response);
                    showThanksModal(message.success);//вызываем функцию с показом модального окна которую мы формировали динамически, в качестве аргумента передаем свойство обьекта куда мы ранее записали строки - сообщение
                    statusMessage.remove();//удаляем переменую где прописана загрузка(spinner.svg)
                    form.reset();//очишаем форму до пустых инпутов//
                } else {
                    showThanksModal(message.failure);//если сервер не дает ответ вызываем функцию и выводим другое сообщение которое записали в обьект //
                };
            });
        });
    };

    function showThanksModal(message) {
        const prevModalDilog = document.querySelector('.modal__dialog');//получаем дом элемент подложку модального окна
        prevModalDilog.classList.add('hide');//скрываем дом элеиент что бы пользователь мог потом повторно открывать модальное окно и видить контент
        openModal();//когда будет вызываться функция showThanksModal будет так же вызыватся функция openModal 

        const thanksModal = document.createElement('div');//создаем html элемент для наполнение изиененого модального окна с благодарностью
        thanksModal.classList.add('modal__dialog');//добавляем класс созданому элементу div мы заменяем таким образом html элемент
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" id="modal-close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;//с помошью innerHTML формируем динамически верстку куда через интерполяцию помешаем одно из сообщение которое мы добавили в обьет выше, в интерполяцию мы передаем аргумент функции в которую помешаем обект который создали выше

        document.querySelector('.modal').append(thanksModal);//получаем дом элеиент модальное окно, получаем его без переменой потому что больше мы его не используем и добавляем в него блок верскт который мы создали динамически 
        setTimeout(() => {//создаём функцию отложеного вызова(асинхроную)
            thanksModal.remove();//удалять блок который мы создали динамически через 4 секунды
            prevModalDilog.classList.add('show');//после того как отработает функция и удалиться динамический блок верстки добавляю класс элементу который скрывал ранеее что бы вернуть модальное окно к преведущему значению
            prevModalDilog.classList.remove('hide');//у модального окна удаляю класс hide который я проаисывал ранеее для того что бы скрыть контент верстки 
           closeModal()//закрываю модальное окно после отработки функции и ввыведение сообщение верстки которое я создал динамически 
        }, 2000);//второй аргумент функции setTimeout это количество милисекунд
    };

});











