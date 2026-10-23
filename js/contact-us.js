document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cu-enquiry-form');
  const note = document.getElementById('cu-form-note');
  if (!form || !note) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    note.textContent = 'Your details are ready. Please call 99989 83434 to submit your enquiry directly; this static website form is not connected to an email service yet.';
    note.setAttribute('role', 'status');
  });
});
