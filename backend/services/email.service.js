const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendRegistrationEmails = async (formData) => {
  const { ownerInfo, petInfo, stayInfo } = formData;

  const ownerEmail = ownerInfo?.email;
  const ownerName = `${ownerInfo?.firstName || ''} ${ownerInfo?.lastName || ''}`.trim();

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: ownerEmail,
    subject: 'PawPal - Потврда за регистрација',
    html: `
      <h2>Успешна регистрација</h2>
      <p>Здраво ${ownerName},</p>
      <p>Ви благодариме. Вашата регистрација е успешно примена.</p>

      <h3>Детали за регистрацијата</h3>
      <ul>
        <li><strong>Милениче:</strong> ${petInfo?.name || '-'}</li>
        <li><strong>Раса:</strong> ${petInfo?.breed || '-'}</li>
        <li><strong>Пристигнување:</strong> ${stayInfo?.checkInDateTime || '-'}</li>
        <li><strong>Заминување:</strong> ${stayInfo?.checkOutDateTime || '-'}</li>
        <li><strong>Распоред на хранење:</strong> ${stayInfo?.feedingSchedule || '-'}</li>
        <li><strong>Марка на храна:</strong> ${stayInfo?.foodBrand || '-'}</li>
      </ul>

      <p>Ќе ве контактираме доколку ни требаат дополнителни информации.</p>
      <p>Со почит,<br>PawPal</p>
    `,
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Нова регистрација - ${petInfo?.name || 'Милениче'}`,
    html: `
      <h2>Нова регистрација од формулар</h2>

      <h3>Сопственик</h3>
      <ul>
        <li><strong>Име:</strong> ${ownerName || '-'}</li>
        <li><strong>Email:</strong> ${ownerInfo?.email || '-'}</li>
        <li><strong>Телефон:</strong> ${ownerInfo?.phone || '-'}</li>
        <li><strong>Итен контакт:</strong> ${ownerInfo?.emergencyContact || '-'}</li>
      </ul>

      <h3>Милениче</h3>
      <ul>
        <li><strong>Име:</strong> ${petInfo?.name || '-'}</li>
        <li><strong>Раса:</strong> ${petInfo?.breed || '-'}</li>
        <li><strong>Датум на раѓање:</strong> ${petInfo?.dateOfBirth || '-'}</li>
        <li><strong>Тежина:</strong> ${petInfo?.weight ?? '-'}</li>
        <li><strong>Пол:</strong> ${petInfo?.gender || '-'}</li>
        <li><strong>Стерилизирано:</strong> ${petInfo?.neutered === null ? '-' : petInfo.neutered ? 'Да' : 'Не'}</li>
        <li><strong>Чипирано:</strong> ${petInfo?.microchipped === null ? '-' : petInfo.microchipped ? 'Да' : 'Не'}</li>
        <li><strong>Алергии:</strong> ${petInfo?.allergies || '-'}</li>
        <li><strong>Медицински состојби:</strong> ${petInfo?.medicalConditions || '-'}</li>
      </ul>

      <h3>Престој</h3>
      <ul>
        <li><strong>Пристигнување:</strong> ${stayInfo?.checkInDateTime || '-'}</li>
        <li><strong>Заминување:</strong> ${stayInfo?.checkOutDateTime || '-'}</li>
        <li><strong>Хранење:</strong> ${stayInfo?.feedingSchedule || '-'}</li>
        <li><strong>Марка на храна:</strong> ${stayInfo?.foodBrand || '-'}</li>
        <li><strong>Забелешки:</strong> ${stayInfo?.additionalNotes || '-'}</li>
      </ul>
    `,
  };

  await transporter.sendMail(userMailOptions);
  await transporter.sendMail(adminMailOptions);
};

module.exports = {
  sendRegistrationEmails,
};