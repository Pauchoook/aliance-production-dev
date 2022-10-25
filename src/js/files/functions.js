export function mediaAdaptive() {
   function DynamicAdapt(type) {
       this.type = type;
   }
   
   DynamicAdapt.prototype.init = function () {
       const _this = this;
       // массив объектов
       this.оbjects = [];
       this.daClassname = "_dynamic_adapt_";
       // массив DOM-элементов
       this.nodes = document.querySelectorAll("[data-da]");
   
       // наполнение оbjects объктами
       for (let i = 0; i < this.nodes.length; i++) {
           const node = this.nodes[i];
           const data = node.dataset.da.trim();
           const dataArray = data.split(",");
           const оbject = {};
           оbject.element = node;
           оbject.parent = node.parentNode;
           оbject.destination = document.querySelector(dataArray[0].trim());
           оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
           оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
           оbject.index = this.indexInParent(оbject.parent, оbject.element);
           this.оbjects.push(оbject);
       }
   
       this.arraySort(this.оbjects);
   
       // массив уникальных медиа-запросов
       this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
           return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
       }, this);
       this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
           return Array.prototype.indexOf.call(self, item) === index;
       });
   
       // навешивание слушателя на медиа-запрос
       // и вызов обработчика при первом запуске
       for (let i = 0; i < this.mediaQueries.length; i++) {
           const media = this.mediaQueries[i];
           const mediaSplit = String.prototype.split.call(media, ',');
           const matchMedia = window.matchMedia(mediaSplit[0]);
           const mediaBreakpoint = mediaSplit[1];
   
           // массив объектов с подходящим брейкпоинтом
           const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
               return item.breakpoint === mediaBreakpoint;
           });
           matchMedia.addListener(function () {
               _this.mediaHandler(matchMedia, оbjectsFilter);
           });
           this.mediaHandler(matchMedia, оbjectsFilter);
       }
   };
   
   DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
       if (matchMedia.matches) {
           for (let i = 0; i < оbjects.length; i++) {
               const оbject = оbjects[i];
               оbject.index = this.indexInParent(оbject.parent, оbject.element);
               this.moveTo(оbject.place, оbject.element, оbject.destination);
           }
       } else {
           for (let i = 0; i < оbjects.length; i++) {
               const оbject = оbjects[i];
               if (оbject.element.classList.contains(this.daClassname)) {
                   this.moveBack(оbject.parent, оbject.element, оbject.index);
               }
           }
       }
   };
   
   // Функция перемещения
   DynamicAdapt.prototype.moveTo = function (place, element, destination) {
       element.classList.add(this.daClassname);
       if (place === 'last' || place >= destination.children.length) {
           destination.insertAdjacentElement('beforeend', element);
           return;
       }
       if (place === 'first') {
           destination.insertAdjacentElement('afterbegin', element);
           return;
       }
       destination.children[place].insertAdjacentElement('beforebegin', element);
   }
   
   // Функция возврата
   DynamicAdapt.prototype.moveBack = function (parent, element, index) {
       element.classList.remove(this.daClassname);
       if (parent.children[index] !== undefined) {
           parent.children[index].insertAdjacentElement('beforebegin', element);
       } else {
           parent.insertAdjacentElement('beforeend', element);
       }
   }
   
   // Функция получения индекса внутри родителя
   DynamicAdapt.prototype.indexInParent = function (parent, element) {
       const array = Array.prototype.slice.call(parent.children);
       return Array.prototype.indexOf.call(array, element);
   };
   
   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   DynamicAdapt.prototype.arraySort = function (arr) {
       if (this.type === "min") {
           Array.prototype.sort.call(arr, function (a, b) {
               if (a.breakpoint === b.breakpoint) {
                   if (a.place === b.place) {
                       return 0;
                   }
   
                   if (a.place === "first" || b.place === "last") {
                       return -1;
                   }
   
                   if (a.place === "last" || b.place === "first") {
                       return 1;
                   }
   
                   return a.place - b.place;
               }
   
               return a.breakpoint - b.breakpoint;
           });
       } else {
           Array.prototype.sort.call(arr, function (a, b) {
               if (a.breakpoint === b.breakpoint) {
                   if (a.place === b.place) {
                       return 0;
                   }
   
                   if (a.place === "first" || b.place === "last") {
                       return 1;
                   }
   
                   if (a.place === "last" || b.place === "first") {
                       return -1;
                   }
   
                   return b.place - a.place;
               }
   
               return b.breakpoint - a.breakpoint;
           });
           return;
       }
   };
   
   const da = new DynamicAdapt("max");
   da.init();
}

export function tooltipFunc() {
   const tooltips = document.querySelectorAll('.tooltip');
   if (tooltips.length > 0) {
      tooltips.forEach(tooltip => {
         const tooltipItem = tooltip.querySelector('.tooltip__item');
         tooltip.addEventListener('mouseover', () => {
            tooltipItem.classList.add('open');
         });
         tooltip.addEventListener('mouseout', () => {
            tooltipItem.classList.remove('open');
         });
      });
   }
}

export function burger() {
   const menuBurger = document.querySelector('.burger__menu');
   if (menuBurger) {
      const header = document.querySelector('.header');
      const logo = document.querySelector('.header__logo-img');
      const btnBurger = document.querySelector('.burger__btn');

      btnBurger.addEventListener('click', () => {
         btnBurger.classList.toggle('active');
         menuBurger.classList.toggle('open');

         if (menuBurger.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            if(header.classList.contains('no-bg')) {
               header.style.backgroundColor = '#fff';
               logo.src = 'img/logos/logo2.svg';
            }
         } else {
            document.body.style.overflow = 'visible';
            if(header.classList.contains('no-bg')) {
               header.style.background = 'none';
               logo.src = 'img/logos/logo.svg';
            }
         }
      });
   }
}

export function moreText() {
   const text = document.querySelectorAll('.more-text');
   if (text.length > 0) {
      text.forEach(t => {
         const lengthText = t.getAttribute('data-length');
         
         if (t.innerText.length > lengthText) {
            const textReplace = t.innerText.slice(lengthText, -1) + t.innerText.slice(-1);
            
            t.innerText = t.innerText.replace(textReplace,'...');
         }
      });
   }
}

export function maskNumber() {
   const maskNumbers = document.querySelectorAll('[data-phone-pattern]');
   if (maskNumbers.length > 0) {
      maskNumbers.forEach(input => {
         for (let ev of ['input', 'focus']) {
            input.addEventListener(ev, eventCalllback);
         }
      })

      function eventCalllback(e) {
         // нихера непонятно
         let el = e.target,
         pattern = el.dataset.phonePattern,
         matrix_def = "+_(___)__-__-___",
         matrix = pattern ? pattern : matrix_def,
         i = 0,
         def = matrix.replace(/\D/g, ""),
         val = e.target.value.replace(/\D/g, "");
      
         if (def.length >= val.length) val = def;
         e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
         });
      }
   }
}

export function validationForm() {
   const formsValidation = document.querySelectorAll('.form');
   if (formsValidation.length > 0) {
      formsValidation.forEach(form => {
         form.addEventListener('submit', e => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input');
            let valid = 0;

            inputs.forEach(input => {
               if (input.value === '') {
                  input.classList.add('_error');
               } else {
                  input.classList.remove('_error');
                  valid++;
               }
            });

            if (valid == inputs.length) form.classList.add('valid'); // форма готова к отправке, когда все инпуты заполнены
         });
      });
   }
}

export function spollers() {
   const spollers = document.querySelectorAll('.spoller');
   if (spollers.length > 0) {
      const buttonsSpollers = document.querySelectorAll('.btn-spoller');

      buttonsSpollers.forEach(btn => {

         btn.addEventListener('click', e => {
            const currBtn = e.target;
            const currSpoller = currBtn.closest('.spoller');

            spollers.forEach(spoller => {
               if (spoller !== currSpoller) spoller.classList.remove('open');
            });
            currSpoller.classList.toggle('open')

            buttonsSpollers.forEach(btn => {
               if (btn !== currBtn) btn.classList.remove('active');
            });
            btn.classList.add('active');
         });
      });
   }
}

export function popup() {
   const popups = document.querySelectorAll('.popup');
   if (popups.length > 0) {
      const buttonsPopup = document.querySelectorAll('.btn-popup');

      buttonsPopup.forEach(btn => {
         const id = btn.dataset.btnPopup;
         const popup = document.querySelector(`[data-popup=${id}]`);
         const popupWindow = popup.querySelector('.popup__window');
         const popupClose = popup.querySelector('.popup__close')
         const heightPopupWindow = popupWindow.clientHeight + 40;
         
         btn.addEventListener('click', () => {
            document.body.style.overflow = 'hidden';
            popup.classList.add('open');
            resizePopup();
         });

         popupClose.addEventListener('click', closePopup);

         document.addEventListener('click', e => {
            if (e.target.hasAttribute('data-overlay-popup')) {
               closePopup();
            }
         });

         document.addEventListener('DOMContentLoaded', resizePopup);
         window.addEventListener('resize', resizePopup);

         function closePopup() {
            document.body.style.overflow = 'visible';
            popup.classList.add('hide');
            setTimeout(() => {
               popup.classList.remove('hide');
               popup.classList.remove('open');
            }, 500);
         }

         function resizePopup() {
            if (heightPopupWindow >= window.innerHeight) {
               const height = window.innerHeight - 40;

               popupWindow.style.height = `${height}px`
               popupWindow.classList.add('scroll');
            }
         }
      });
   }
}

export function href() {
   const btnsHref = document.querySelectorAll('[data-href]');
   if (btnsHref.length > 0) {
      btnsHref.forEach(btn => {
         btn.addEventListener('click', () => {
            const href = btn.getAttribute('data-href');

            setTimeout(() => btn.setAttribute('href', href), 0)
         });
      });
   }
}

export function mainModal() {
   const mainPopup = document.querySelector('.main-popup');
   if (mainPopup) {
      const popupClose = mainPopup.querySelector('.main-popup__btn');
      const popupWindow = mainPopup.querySelector('.popup__window');
      const heightPopupWindow = popupWindow.clientHeight + 40;

      document.addEventListener('DOMContentLoaded', () => {
         setTimeout(() => {
            mainPopup.classList.add('open');
            document.body.style.overflow = 'hidden';
         }, 1500)
      });

      popupClose.addEventListener('click', closePopup);
      document.addEventListener('click', e => {
         if (e.target.hasAttribute('data-overlay-popup')) {
            closePopup();
         }
      });

      document.addEventListener('DOMContentLoaded', resizePopup);
      window.addEventListener('resize', resizePopup);

      function closePopup() {
         document.body.style.overflow = 'visible';
         mainPopup.classList.add('hide');
         setTimeout(() => {
            mainPopup.remove();
         }, 500);
      }

      function resizePopup() {
         if (heightPopupWindow >= window.innerHeight) {
            const height = window.innerHeight - 40;

            popupWindow.style.height = `${height}px`
            popupWindow.classList.add('scroll');
         }
      }
   }
}

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}