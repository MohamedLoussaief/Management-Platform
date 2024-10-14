import { format } from 'date-fns';
export const generateWorkCertificate = (doc, employeeName, cin, func, registrationDate, certificateReason) => {
    const formattedDate = format(new Date(String(registrationDate)), 'yyyy/MM/dd');
    doc.fontSize(20).text('Work Certificate', { align: 'center', underline: true }).moveDown(2);
    doc.fontSize(12)
        .text(`I, the undersigned, Director Name, General Director of Company Name, hereby certify`, {
        align: 'justify',
    })
        .moveDown(0.5)
        .text(`${employeeName}, holder of ID card No. ${cin}, is a permanent employee as a ${func}, 
        from the date of registration ${formattedDate} until today.`)
        .moveDown(1)
        .text(`This certificate is issued for ${certificateReason}.`)
        .moveDown(3);
    doc.text('General Director', { align: 'right' }).text('Seal and Signature', { align: 'right' }).moveDown(1);
    doc.end();
};
//# sourceMappingURL=workCertificatePdf.js.map