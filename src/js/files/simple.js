export function consultation() {
   const sendConsultation = document.querySelector('#send-consultation');
   if (sendConsultation) {
      const form = document.querySelector('.consultation__form');
      const one = document.querySelector('.consultation__one'); // первый экран
      const two = document.querySelector('.consultation__two'); // второй экран

      form.addEventListener('submit', () => {
         if (form.classList.contains('valid')) {
            one.style.display = 'none';
            two.style.display = 'block';
         }
      });
   }
}