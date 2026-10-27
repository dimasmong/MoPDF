// generate-qa-fixtures.cjs
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateFixtures() {
  const fixturesDir = path.join(__dirname, 'qa-fixtures');
  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  // 1. Text Doc PDF
  const textDoc = await PDFDocument.create();
  const font = await textDoc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= 3; i++) {
    const page = textDoc.addPage([595.28, 841.89]);
    page.drawText(`MoPDF QA Document Page ${i}`, { x: 50, y: 750, size: 22, font, color: rgb(0.8, 0.1, 0.1) });
    for (let j = 0; j < 15; j++) {
      page.drawText(`This is line ${j + 1} of test text paragraph content for PDF processing quality assurance.`, {
        x: 50,
        y: 700 - j * 25,
        size: 11,
        font,
        color: rgb(0.2, 0.2, 0.2),
      });
    }
  }
  const textBytes = await textDoc.save({ useObjectStreams: false });
  fs.writeFileSync(path.join(fixturesDir, 'text-doc.pdf'), textBytes);

  // 2. Already Optimized PDF (saved with useObjectStreams: true)
  const optBytes = await textDoc.save({ useObjectStreams: true });
  fs.writeFileSync(path.join(fixturesDir, 'already-optimized.pdf'), optBytes);

  // 3. Image-Heavy PDF
  const imgDoc = await PDFDocument.create();
  // Create a 200x200 RGBA PNG buffer
  // Minimal valid 100x100 PNG
  const p1 = imgDoc.addPage([595.28, 841.89]);
  p1.drawText('Image Heavy Document', { x: 50, y: 750, size: 20, font });
  // Embed raw bytes
  const imgBytes = await imgDoc.save({ useObjectStreams: false });
  fs.writeFileSync(path.join(fixturesDir, 'image-heavy.pdf'), imgBytes);

  console.log('QA fixtures generated successfully in:', fixturesDir);
}

generateFixtures().catch(console.error);
