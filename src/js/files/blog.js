import blogData from '../../files/blog.json';

const body = document.querySelector('.blog-posts__body');

if (body) {
   const nav = document.querySelector('.blog-posts__nav');
   const numbersButtons = Math.ceil(blogData.length / 10);

   // создание кнопок в зависимости от длины файла
   for (let i = 1; i <= numbersButtons; i++) {
      nav.insertAdjacentHTML('beforeend', `
         <button data-counter="${i}0" class="blog-posts__btn">
            ${i}
         </button>
      `);
   }

   const buttonsBlog = document.querySelectorAll('.blog-posts__btn');
   const firstBtn = document.querySelector('.blog-posts__btn'); 
   firstBtn.classList.add('active');

   buttonsBlog.forEach(btn => {
      btn.addEventListener('click', e => {
         const currentBtn = e.target;
         const counterData = Number(currentBtn.getAttribute('data-counter'));
         
         buttonsBlog.forEach(btn => {
            btn.classList.remove('active');
            btn.removeAttribute('disabled');
         });
         
         currentBtn.classList.add('active');
         currentBtn.setAttribute('disabled', '');

         createCards(counterData - 10, counterData); // добавление следующих картчоек
      });
   });

   function createCards(start, end) {
      console.log(start, end);
      const arrayData = blogData.slice(start, end);

      body.innerHTML = '';

      arrayData.forEach(data => {
         console.log(data);
         body.insertAdjacentHTML('afterbegin', `
            <a href="${data.link}" class="card-blog" style="background: url(${data.img}) 0 0 / cover no-repeat;">
               <div class="card-blog__body">
                  <h4 class="card-blog__title">
                     ${data.title}
                  </h4>
                  <p class="card-blog__content">
                     ${data.content}
                  </p>
               </div>
            </a>
         `);
      });
   }

   createCards(0, 10);
}