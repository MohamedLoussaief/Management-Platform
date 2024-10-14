import { format } from 'date-fns';
export const leaveDocument = (doc, firstName, lastName, departName, leaveType, startDate, endDate, returnDate, substituteName) => {
    doc.fontSize(14).text('LEAVE REQUEST', { align: 'center', underline: true }).moveDown(1);
    doc.fontSize(12).text('Employee Information', { underline: true }).moveDown(0.5);
    doc.fontSize(10)
        .text(`First Name: ${firstName}   Last Name: ${lastName}`, { align: 'left' })
        .text(`Department: ${departName}`, { align: 'left' })
        .moveDown(2);
    doc.fontSize(12).text('Nature of Requested Leave', { underline: true }).moveDown(0.5);
    doc.fontSize(10)
        .text(`${leaveType}`, { align: 'left' })
        .moveDown(1);
    doc.text(`Leave from: ${format(new Date(String(startDate)), 'yyyy/MM/dd')}   to  ${format(new Date(String(endDate)), 'yyyy/MM/dd')}`, { align: 'left' });
    doc.text(`Return Date: ${format(new Date(String(returnDate)), 'yyyy/MM/dd')}`, { align: 'left' });
    doc.text(`Replacement Name: ${substituteName}`, { align: 'left' })
        .moveDown(2);
    doc.fontSize(12).text('Signature', { underline: true }).moveDown(0.5);
    doc.fontSize(10).text('Genaral Director Signature: ', { align: 'left' }).moveDown(2);
    doc.end();
};
//# sourceMappingURL=leaveDocumentPdf.js.map