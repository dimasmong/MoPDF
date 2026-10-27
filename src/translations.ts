export interface Translation {
  brandSubtitle: string;
  privacyBadge: string;
  nav: {
    tools: string;
    workspace: string;
    faq: string;
    samplePdf: string;
    lightMode: string;
    darkMode: string;
    languageLabel: string;
    githubLabel: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleAccent: string;
    subtle: string;
    ctaExplore: string;
    ctaSample: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  dashboard: {
    sectionTitle: string;
    sectionSubtitle: string;
    activeLabel: string;
    openTool: string;
    filterAll: string;
    categories: Record<string, string>;
  };
  tools: Record<
    string,
    {
      name: string;
      shortDesc: string;
      instruction: string;
    }
  >;
  workspace: {
    dropTitlePdf: string;
    dropTitleSinglePdf: string;
    dropTitleImg: string;
    dropSubPdf: string;
    dropSubImg: string;
    selectFilesBtn: string;
    addMoreFilesBtn: string;
    loadSampleBtn: string;
    loadTwoSamplesBtn: string;
    loadSampleImagesBtn: string;
    clearAllBtn: string;
    filesLoaded: string;
    pagesCount: string;
    pageLabel: string;
    totalPages: string;
    fileSize: string;
    processing: string;
    renderingPreviews: string;
    downloadResult: string;
    downloadZip: string;
    downloadJson: string;
    downloadTxt: string;
    readyToDownload: string;
    moveUp: string;
    moveDown: string;
    moveLeft: string;
    moveRight: string;
    removeFile: string;
    deletePage: string;
    duplicatePage: string;
    rotateCw: string;
    rotateCcw: string;
    rotate180: string;
    resetRotation: string;
    emptyWorkspaceTitle: string;
    emptyWorkspaceDesc: string;
    engineLoading: string;
    engineReady: string;
    encryptedError: string;
    corruptError: string;
    unsupportedFileError: string;
    emptyFileError: string;
  };
  toolControls: Record<string, string>;
  notifications: Record<string, string>;
  faq: {
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  footer: {
    tagline: string;
    localGuarantee: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<'en' | 'id', Translation> = {
  en: {
    brandSubtitle: 'Premium PDF Toolkit',
    privacyBadge: '100% Local & Private',
    nav: {
      tools: 'PDF Tools',
      workspace: 'Workspace',
      faq: 'FAQ',
      samplePdf: 'Generate Sample PDF',
      lightMode: 'Switch to Light Mode',
      darkMode: 'Switch to Dark Mode',
      languageLabel: 'Switch Language',
      githubLabel: 'View GitHub Repository'
    },
    hero: {
      badge: 'Free • Browser-First • Zero Server Uploads',
      titleStart: 'Every PDF tool.',
      titleAccent: 'One beautiful workspace.',
      subtle: 'Everything you need to edit, convert, and organize PDFs in one seamless experience. Completely free, private, and powered by your browser.',
      ctaExplore: 'Open PDF Workspace',
      ctaSample: 'Try with Instant Sample PDF',
      trust1: 'Processed locally on your device',
      trust2: 'No sign-up or watermarks',
      trust3: 'Works offline after load'
    },
    dashboard: {
      sectionTitle: 'Complete PDF Suite',
      sectionSubtitle: 'Select a tool below to start editing your documents directly in your browser.',
      activeLabel: 'Selected Tool',
      openTool: 'Launch Tool',
      filterAll: 'All Tools',
      categories: {
        all: 'All Tools',
        organize: 'Organize',
        optimize: 'Optimize',
        convert: 'Convert',
        'edit-sign': 'Edit & Sign',
        info: 'Information'
      }
    },
    tools: {
      // 1. Merge
      merge: {
        name: 'Merge PDF',
        shortDesc: 'Combine multiple PDF documents into a single unified file in your preferred order.',
        instruction: 'Upload 2 or more PDF files, drag or use arrows to reorder them, and merge into one document.'
      },
      // 2. Split
      split: {
        name: 'Split PDF',
        shortDesc: 'Extract specific pages or split a document by custom page ranges into separate files.',
        instruction: 'Enter page ranges (e.g. 1-3, 5, 8-10) or click thumbnails to extract pages as one PDF or a ZIP archive.'
      },
      // 3. Organize
      organize: {
        name: 'Organize PDF',
        shortDesc: 'Reorder, rotate, duplicate, or delete individual PDF pages with visual thumbnails.',
        instruction: 'Drag and drop page cards or use the move, rotate, duplicate, and delete controls to reorganize your PDF.'
      },
      // 4. Rotate
      rotate: {
        name: 'Rotate PDF',
        shortDesc: 'Rotate individual pages, selected pages, or the entire document by 90°, 180°, or 270°.',
        instruction: 'Rotate all pages at once or fine-tune individual pages with real-time visual previews.'
      },
      // 5. Compress
      compress: {
        name: 'Compress PDF',
        shortDesc: 'Reduce PDF file size via genuine browser-side structural object stream optimization.',
        instruction: 'Optimize your PDF locally. Choose optimization intensity and download the compacted file.'
      },
      // 6. Page Numbers
      'page-numbers': {
        name: 'Add Page Numbers',
        shortDesc: 'Insert customizable page numbering with precise formatting, position, font, and margins.',
        instruction: 'Select your preferred numbering style, position, margins, and target page ranges with live preview.'
      },
      // 7. Crop
      crop: {
        name: 'Crop PDF',
        shortDesc: 'Trim page margins or adjust the visible display box with numeric and preset controls.',
        instruction: 'Adjust the crop box margins to trim unwanted borders. Preserves vector graphics and text.'
      },
      // 8. Resize
      resize: {
        name: 'Resize PDF',
        shortDesc: 'Convert page geometry to standard paper sizes (A4, A3, Letter) with vector content scaling.',
        instruction: 'Select target paper dimensions and choose between proportional content scaling or canvas adjustment.'
      },
      // 9. Edit Metadata
      metadata: {
        name: 'Edit Metadata',
        shortDesc: 'Inspect and edit document title, author, subject, keywords, and producer properties.',
        instruction: 'Update or clear document metadata properties directly without re-encoding page content.'
      },
      // 10. Sign
      sign: {
        name: 'Sign PDF',
        shortDesc: 'Draw, type, or upload visual electronic signatures and place them onto document pages.',
        instruction: 'Create your visual signature, adjust size and position on the page, and embed it cleanly.'
      },
      // 11. Images to PDF
      img2pdf: {
        name: 'Images to PDF',
        shortDesc: 'Convert JPG, PNG, and WebP images into a clean, customizable PDF document.',
        instruction: 'Upload multiple images, arrange their sequence, and choose page size, orientation, and margins.'
      },
      // 12. PDF to Images
      pdf2img: {
        name: 'PDF to Images',
        shortDesc: 'Render PDF pages into high-resolution PNG or JPEG images individually or as a ZIP.',
        instruction: 'Choose your output image format (PNG or JPEG), resolution scale, and pages to export.'
      },
      // 13. Watermark
      watermark: {
        name: 'Add Watermark',
        shortDesc: 'Stamp customizable text watermarks with precise size, color, opacity, and rotation.',
        instruction: 'Configure your watermark text, typography, opacity, angle, and placement with live preview.'
      },
      // 14. Info
      info: {
        name: 'PDF Information',
        shortDesc: 'Inspect exact metadata, page dimensions, file size, producer details, and security status.',
        instruction: 'View authentic embedded document properties, creation dates, and per-page dimensions.'
      }
    },
    workspace: {
      dropTitlePdf: 'Drop PDF files here, or click to browse',
      dropTitleSinglePdf: 'Drop a PDF file here, or click to browse',
      dropTitleImg: 'Drop JPG, PNG, or WebP images here, or click to browse',
      dropSubPdf: 'Supports standard PDF documents • 100% processed in your browser',
      dropSubImg: 'Supports JPEG, PNG, and WebP images • Preserves aspect ratio',
      selectFilesBtn: 'Select Files',
      addMoreFilesBtn: 'Add More Files',
      loadSampleBtn: 'Load Sample PDF',
      loadTwoSamplesBtn: 'Load 2 Sample PDFs',
      loadSampleImagesBtn: 'Load 3 Sample Images',
      clearAllBtn: 'Reset Workspace',
      filesLoaded: 'Files Loaded',
      pagesCount: 'pages',
      pageLabel: 'Page',
      totalPages: 'Total Pages',
      fileSize: 'File Size',
      processing: 'Processing document locally...',
      renderingPreviews: 'Rendering high-clarity page thumbnails...',
      downloadResult: 'Download Result',
      downloadZip: 'Download ZIP Archive',
      downloadJson: 'Export JSON Report',
      downloadTxt: 'Export TXT Report',
      readyToDownload: 'Your processed file is ready!',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      moveLeft: 'Move Earlier',
      moveRight: 'Move Later',
      removeFile: 'Remove File',
      deletePage: 'Delete Page',
      duplicatePage: 'Duplicate Page',
      rotateCw: 'Rotate +90°',
      rotateCcw: 'Rotate -90°',
      rotate180: 'Rotate 180°',
      resetRotation: 'Reset Rotation',
      emptyWorkspaceTitle: 'No Documents Loaded Yet',
      emptyWorkspaceDesc: 'Upload your own file above or click the sample button to test this tool immediately.',
      engineLoading: 'Initializing local PDF engine...',
      engineReady: 'PDF Engine Ready',
      encryptedError: 'This PDF is password-protected or encrypted. For security and privacy compliance, MoPDF does not bypass passwords. Please unlock the document first.',
      corruptError: 'Unable to parse this file. The file appears to be corrupted or is not a valid specification.',
      unsupportedFileError: 'Unsupported file format. Please upload valid PDF or supported image files (JPEG, PNG, WebP).',
      emptyFileError: 'The uploaded file is empty (0 bytes) and cannot be processed.'
    },
    toolControls: {
      // Merge
      mergeBtn: 'Merge PDFs Now',
      mergeMinWarning: 'Please upload at least 2 PDF documents to perform a merge.',
      mergeSummary: 'Combining {files} documents ({pages} total pages)',

      // Split
      splitRangeLabel: 'Page Ranges to Extract',
      splitRangePlaceholder: 'e.g., 1-3, 5, 7-9',
      splitRangeHint: 'Use commas and hyphens (1-{max}). You can also click page thumbnails below to toggle selection.',
      splitModeLabel: 'Output Mode',
      splitModeMerge: 'Combine extracted ranges into one PDF',
      splitModeZip: 'Save each range as a separate PDF (ZIP archive)',
      splitSelectAll: 'Select All Pages',
      splitSelectOdd: 'Odd Pages',
      splitSelectEven: 'Even Pages',
      splitClearSelection: 'Clear Selection',
      splitBtn: 'Split & Extract PDF',
      splitRangeInvalid: 'Invalid page range syntax. Use numbers and ranges like 1-3, 5.',
      splitRangeOutBounds: 'Page number out of bounds. Document has {max} pages.',
      splitRangeEmpty: 'Please specify at least one valid page or range to extract.',

      // Organize
      organizeOrderHint: 'Drag thumbnails or use arrow buttons to reorder. Output matches this exact sequence.',
      organizeBtn: 'Export Organized PDF',
      organizeMinPageWarn: 'A PDF document must contain at least 1 page.',
      organizeResetBtn: 'Restore Original Pages',

      // Rotate
      rotateAllTitle: 'Batch Rotate Pages',
      rotateAll90: 'Rotate All 90° CW',
      rotateAll180: 'Rotate All 180°',
      rotateAll270: 'Rotate All 270° CW',
      rotateSelectedTitle: 'Apply to Selected Pages',
      rotateSaveBtn: 'Save Rotated PDF',

      // Compress [NEW]
      compressLevelLabel: 'Optimization Mode',
      compressModeLossless: 'Lossless Structural Optimization (Preserves 100% Quality)',
      compressModeMax: 'Enhanced Stream Compaction',
      compressOrigSizeLabel: 'Original File Size',
      compressNewSizeLabel: 'Optimized File Size',
      compressReductionLabel: 'Reduction Achieved',
      compressBtn: 'Compress & Optimize PDF',
      compressAlreadyOptimized: 'Your PDF document is already optimally compacted! The original file is preserved with 100% fidelity.',
      compressDisclaimer: 'Compression uses browser-side object stream restructuring and Flate compression. No pages are rasterized, preserving vector sharpness and selectable text.',

      // Page Numbers [NEW]
      pnFormatLabel: 'Numbering Format',
      pnFormatSimple: '1, 2, 3...',
      pnFormatPageN: 'Page 1, Page 2...',
      pnFormatNOfTotal: '1 of N, 2 of N...',
      pnFormatPageNOfTotal: 'Page 1 of N...',
      pnFormatDash: '- 1 -, - 2 -...',
      pnStartNumLabel: 'Starting Page Number',
      pnFontSizeLabel: 'Font Size',
      pnColorLabel: 'Text Color',
      pnPositionLabel: 'Placement & Alignment',
      pnPosBottomCenter: 'Bottom Center',
      pnPosBottomRight: 'Bottom Right',
      pnPosBottomLeft: 'Bottom Left',
      pnPosTopCenter: 'Top Center',
      pnPosTopRight: 'Top Right',
      pnPosTopLeft: 'Top Left',
      pnMarginLabel: 'Edge Margin (pt)',
      pnTargetLabel: 'Apply To Pages',
      pnTargetAll: 'All Pages',
      pnTargetCustom: 'Custom Page Range (e.g. 2-N to skip cover)',
      pnApplyBtn: 'Add Page Numbers & Export PDF',
      pnLivePreview: 'Live Numbering Preview (Page 1)',

      // Crop [NEW]
      cropMarginPresets: 'Margin Trim Presets',
      cropPresetNone: 'Custom Crop',
      cropPresetMargin10: 'Trim 10 pt Borders',
      cropPresetMargin20: 'Trim 20 pt Borders',
      cropPresetMargin40: 'Trim 40 pt Borders',
      cropTopLabel: 'Top Crop',
      cropBottomLabel: 'Bottom Crop',
      cropLeftLabel: 'Left Crop',
      cropRightLabel: 'Right Crop',
      cropTargetLabel: 'Apply Cropping To',
      cropTargetAll: 'All Pages',
      cropTargetCurrent: 'Current Page Only',
      cropTargetCustom: 'Custom Page Range',
      cropDisclaimer: 'Note: PDF page cropping adjusts the visible display boundaries (MediaBox & CropBox). Content outside the crop box is visually hidden but not permanently redacted.',
      cropApplyBtn: 'Apply Crop & Export PDF',
      cropLivePreview: 'Live Crop Box Preview (Page 1)',

      // Resize [NEW]
      resizeSizeLabel: 'Target Page Size',
      resizeA4: 'A4 (210 × 297 mm)',
      resizeA3: 'A3 (297 × 420 mm)',
      resizeA5: 'A5 (148 × 210 mm)',
      resizeLetter: 'US Letter (8.5 × 11 in)',
      resizeLegal: 'US Legal (8.5 × 14 in)',
      resizeCustom: 'Custom Dimensions',
      resizeCustomWidth: 'Width (pt)',
      resizeCustomHeight: 'Height (pt)',
      resizeOrientationLabel: 'Orientation',
      resizePortrait: 'Portrait',
      resizeLandscape: 'Landscape',
      resizeAuto: 'Auto (Match Source)',
      resizeModeLabel: 'Content Scaling Strategy',
      resizeModeScaleFit: 'Scale vector content proportionally to fit new dimensions',
      resizeModeCanvasOnly: 'Adjust page boundaries without resizing content (expand/trim canvas)',
      resizeTargetLabel: 'Pages to Resize',
      resizeTargetAll: 'All Pages',
      resizeTargetCustom: 'Custom Range',
      resizeApplyBtn: 'Resize Pages & Export PDF',

      // Metadata [NEW]
      metaDocProps: 'Edit Document Properties',
      metaTitleLabel: 'Document Title',
      metaAuthorLabel: 'Author',
      metaSubjectLabel: 'Subject',
      metaKeywordsLabel: 'Keywords (comma-separated)',
      metaCreatorLabel: 'Creator Application',
      metaProducerLabel: 'PDF Producer',
      metaClearAllBtn: 'Clear All Metadata Fields',
      metaResetBtn: 'Restore Original Values',
      metaApplyBtn: 'Save Metadata & Export PDF',
      metaDisclaimer: 'Note: Modifying document metadata updates standard PDF information dictionaries. It does not erase raw embedded document history or object streams.',

      // Sign [NEW]
      signMethodLabel: 'Signature Creation Method',
      signMethodDraw: 'Draw Signature',
      signMethodType: 'Type Signature',
      signMethodUpload: 'Upload Image',
      signDrawClear: 'Clear Canvas',
      signTypeNameLabel: 'Type Your Name',
      signTypeNamePlaceholder: 'e.g., Dimas Mong',
      signTypeFontLabel: 'Calligraphy Style',
      signFontElegant: 'Classic Script',
      signFontModern: 'Modern Calligraphy',
      signFontCursive: 'Expressive Cursive',
      signFontFormal: 'Formal Executive',
      signUploadLabel: 'Select Signature Image (PNG, JPG)',
      signPageTargetLabel: 'Place Signature On',
      signSizeLabel: 'Signature Width',
      signPositionLabel: 'Placement Position',
      signPosBottomRight: 'Bottom Right',
      signPosBottomLeft: 'Bottom Left',
      signPosCenter: 'Center Page',
      signPosTopRight: 'Top Right',
      signPosTopLeft: 'Top Left',
      signDisclaimer: 'Important: This tool stamps a visual electronic signature onto the document page. It does not constitute a certificate-backed cryptographic digital signature (PKI/X.509).',
      signApplyBtn: 'Stamp Signature & Export PDF',
      signLivePreview: 'Live Signature Placement Preview',

      // Images to PDF
      imgPageSize: 'Page Size',
      imgSizeA4: 'A4 (210 × 297 mm)',
      imgSizeLetter: 'US Letter (8.5 × 11 in)',
      imgSizeFit: 'Fit to Image Dimensions',
      imgOrientation: 'Orientation',
      imgPortrait: 'Portrait',
      imgLandscape: 'Landscape',
      imgAutoOrient: 'Auto (Match Image)',
      imgMargin: 'Page Margin',
      imgMarginNone: 'No Margin (Full Bleed)',
      imgMarginSmall: 'Small Margin (20 pt)',
      imgMarginLarge: 'Standard Margin (40 pt)',
      imgConvertBtn: 'Create PDF from Images',

      // PDF to Images
      pdf2imgFormat: 'Image Format',
      pdf2imgFormatPng: 'PNG (Lossless Quality)',
      pdf2imgFormatJpg: 'JPEG (Compact Size)',
      pdf2imgScale: 'Resolution Scale',
      pdf2imgScale1: '1x Standard (96 DPI)',
      pdf2imgScale2: '2x High Clarity (192 DPI)',
      pdf2imgScale3: '3x Ultra Print (288 DPI)',
      pdf2imgPages: 'Pages to Render',
      pdf2imgAllPages: 'All Pages',
      pdf2imgSelectedPages: 'Selected Pages Only',
      pdf2imgExportBtn: 'Render & Download Images',

      // Watermark
      wmTextLabel: 'Watermark Text',
      wmTextPlaceholder: 'CONFIDENTIAL',
      wmFontSize: 'Font Size',
      wmOpacity: 'Opacity',
      wmRotation: 'Rotation Angle',
      wmColor: 'Watermark Color',
      wmPosition: 'Position on Page',
      wmPosCenter: 'Center Stamp',
      wmPosTiled: 'Tiled Repeating Grid',
      wmPosTopLeft: 'Top Left',
      wmPosTopRight: 'Top Right',
      wmPosBottomLeft: 'Bottom Left',
      wmPosBottomRight: 'Bottom Right',
      wmPagesTarget: 'Apply To',
      wmTargetAll: 'All Pages',
      wmTargetCustom: 'Custom Page Range',
      wmLivePreview: 'Live Watermark Preview (Page 1)',
      wmApplyBtn: 'Embed Watermark & Export PDF',
      wmEmptyTextError: 'Please enter watermark text before exporting.',

      // Info
      infoDocProps: 'Document Metadata & Properties',
      infoPageDims: 'Page Dimensions Breakdown',
      infoFieldTitle: 'Title',
      infoFieldAuthor: 'Author',
      infoFieldSubject: 'Subject',
      infoFieldCreator: 'Creator Application',
      infoFieldProducer: 'PDF Producer',
      infoFieldKeywords: 'Keywords',
      infoFieldCreated: 'Creation Date',
      infoFieldModified: 'Last Modified',
      infoFieldFileName: 'File Name',
      infoFieldExactSize: 'Exact File Size',
      infoFieldEncrypted: 'Encryption Status',
      infoNotEncrypted: 'Unencrypted (Standard Open PDF)',
      infoNotSpecified: 'Not specified in document',
      infoPoints: 'Points (pt)',
      infoMillimeters: 'Millimeters (mm)',
      infoInches: 'Inches (in)',
      infoOrientationLabel: 'Orientation'
    },
    notifications: {
      sampleLoaded: 'Sample PDF generated and loaded into workspace.',
      sampleImagesLoaded: '3 sample graphic images generated and loaded.',
      mergeSuccess: 'Successfully merged {count} PDF files!',
      splitSuccess: 'Successfully extracted requested pages!',
      organizeSuccess: 'Successfully exported organized PDF ({count} pages)!',
      rotateSuccess: 'Successfully applied rotation and exported PDF!',
      compressSuccess: 'Successfully compressed PDF document!',
      pageNumbersSuccess: 'Successfully added page numbers to PDF!',
      cropSuccess: 'Successfully cropped PDF pages!',
      resizeSuccess: 'Successfully resized PDF document!',
      metadataSuccess: 'Successfully updated PDF metadata!',
      signSuccess: 'Successfully stamped visual signature onto PDF!',
      img2pdfSuccess: 'Successfully converted {count} images into a PDF!',
      pdf2imgSuccess: 'Successfully rendered {count} page images!',
      watermarkSuccess: 'Successfully embedded watermark into PDF!'
    },
    faq: {
      title: 'Frequently Asked Questions & Privacy Architecture',
      subtitle: 'Everything you need to know about how MoPDF protects your documents.',
      q1: 'Are my PDF files ever uploaded to any server?',
      a1: 'Never. MoPDF executes 100% locally inside your web browser using WebAssembly and HTML5 Canvas APIs (pdf-lib & PDF.js). Your documents never leave your computer or phone.',
      q2: 'Does MoPDF store my documents in localStorage or cookies?',
      a2: 'No. Document contents exist strictly in temporary volatile browser memory while you edit them and are immediately released when you reset or close the tab. Only your UI theme (Light/Dark) and language preference (EN/ID) are saved in localStorage.',
      q3: 'Where can I find the MoPDF source code?',
      a3: 'Open the MoPDF GitHub repository using the GitHub icon in the navigation bar or footer.',
      q4: 'What happens if I upload a password-protected PDF?',
      a4: 'MoPDF respects document security and never attempts to crack or bypass PDF encryption. If an encrypted file is detected, MoPDF safely alerts you without crashing.'
    },
    footer: {
      tagline: 'Modern, free, privacy-first PDF toolkit.',
      localGuarantee: '100% Browser-Side Execution • No Tracking • Open Source MIT License',
      copyright: 'Dimas Mong. Licensed under the MIT License.'
    }
  },
  id: {
    brandSubtitle: 'Toolkit PDF Premium',
    privacyBadge: '100% Lokal & Privat',
    nav: {
      tools: 'Alat PDF',
      workspace: 'Ruang Kerja',
      faq: 'Tanya Jawab',
      samplePdf: 'Buat Contoh PDF',
      lightMode: 'Beralih ke Mode Terang',
      darkMode: 'Beralih ke Mode Gelap',
      languageLabel: 'Ganti Bahasa',
      githubLabel: 'Lihat Repositori GitHub'
    },
    hero: {
      badge: 'Gratis • Berbasis Browser • Tanpa Unggah ke Server',
      titleStart: 'Semua alat PDF.',
      titleAccent: 'Satu ruang kerja yang indah.',
      subtle: 'Semua yang Anda butuhkan untuk mengedit, mengonversi, dan mengatur PDF dalam satu pengalaman yang praktis. Sepenuhnya gratis, privat, dan berjalan langsung di browser Anda.',
      ctaExplore: 'Buka Ruang Kerja PDF',
      ctaSample: 'Coba dengan Contoh PDF Instan',
      trust1: 'Diproses lokal di perangkat Anda',
      trust2: 'Tanpa registrasi atau tanda air paksa',
      trust3: 'Berjalan cepat & aman'
    },
    dashboard: {
      sectionTitle: 'Rangkaian Alat PDF Lengkap',
      sectionSubtitle: 'Pilih salah satu alat di bawah ini untuk mulai mengelola dokumen langsung di browser Anda.',
      activeLabel: 'Alat Terpilih',
      openTool: 'Buka Alat',
      filterAll: 'Semua Alat',
      categories: {
        all: 'Semua Alat',
        organize: 'Atur Dokumen',
        optimize: 'Optimasi',
        convert: 'Konversi',
        'edit-sign': 'Edit & Tanda Tangan',
        info: 'Informasi'
      }
    },
    tools: {
      // 1. Merge
      merge: {
        name: 'Gabung PDF',
        shortDesc: 'Gabungkan beberapa dokumen PDF menjadi satu file utuh sesuai urutan yang Anda inginkan.',
        instruction: 'Unggah 2 atau lebih file PDF, seret atau gunakan tombol panah untuk mengatur urutan, lalu gabungkan.'
      },
      // 2. Split
      split: {
        name: 'Pisah PDF',
        shortDesc: 'Ekstrak halaman tertentu atau pisahkan dokumen berdasarkan rentang halaman kustom.',
        instruction: 'Masukkan rentang halaman (misal 1-3, 5, 8-10) atau klik pratinjau halaman untuk mengekstrak sebagai PDF atau ZIP.'
      },
      // 3. Organize
      organize: {
        name: 'Atur Halaman PDF',
        shortDesc: 'Ubah urutan, putar, duplikat, atau hapus halaman PDF secara visual dengan pratinjau.',
        instruction: 'Seret dan lepas kartu halaman atau gunakan tombol geser, putar, duplikat, dan hapus untuk menyusun ulang PDF.'
      },
      // 4. Rotate
      rotate: {
        name: 'Putar PDF',
        shortDesc: 'Putar halaman individual, halaman terpilih, atau seluruh dokumen sebesar 90°, 180°, atau 270°.',
        instruction: 'Putar semua halaman sekaligus atau atur halaman tertentu dengan pratinjau visual langsung.'
      },
      // 5. Compress
      compress: {
        name: 'Kompres PDF',
        shortDesc: 'Perkecil ukuran file PDF secara lokal dengan optimalisasi struktur dan kompresi aliran objek.',
        instruction: 'Optimalkan ukuran PDF langsung di browser. Pilih metode kompresi lalu unduh file hasil optimasi.'
      },
      // 6. Page Numbers
      'page-numbers': {
        name: 'Nomor Halaman',
        shortDesc: 'Sematkan penomoran halaman dengan kustomisasi format, posisi, ukuran huruf, dan margin.',
        instruction: 'Tentukan gaya nomor, letak posisi, margin, dan rentang halaman dengan pratinjau visual langsung.'
      },
      // 7. Crop
      crop: {
        name: 'Pangkas PDF',
        shortDesc: 'Potong batas tepi halaman atau sesuaikan area tampilan dengan kontrol numerik dan preset.',
        instruction: 'Atur margin pemangkasan untuk memotong bagian pinggir yang tidak diinginkan. Teks vektor tetap terjaga.'
      },
      // 8. Resize
      resize: {
        name: 'Ubah Ukuran PDF',
        shortDesc: 'Ubah ukuran kertas ke standar (A4, A3, Letter) dengan penskalaan konten vektor proporsional.',
        instruction: 'Pilih dimensi kertas tujuan dan tentukan apakah konten diskalakan atau sekadar disesuaikan batas kanvasnya.'
      },
      // 9. Edit Metadata
      metadata: {
        name: 'Edit Metadata',
        shortDesc: 'Periksa dan modifikasi judul dokumen, pembuat, subjek, kata kunci, serta properti aplikasi.',
        instruction: 'Perbarui atau bersihkan rincian metadata dokumen PDF tanpa mengubah format konten aslinya.'
      },
      // 10. Sign
      sign: {
        name: 'Tanda Tangan PDF',
        shortDesc: 'Gambar, ketik kaligrafi, atau unggah tanda tangan elektronik visual ke halaman PDF.',
        instruction: 'Buat tanda tangan Anda, sesuaikan ukuran serta posisinya di halaman, lalu sematkan ke dokumen.'
      },
      // 11. Images to PDF
      img2pdf: {
        name: 'Gambar ke PDF',
        shortDesc: 'Konversi gambar JPG, PNG, dan WebP menjadi dokumen PDF rapi yang dapat disesuaikan.',
        instruction: 'Unggah beberapa gambar, atur urutannya, serta pilih ukuran halaman, orientasi, dan margin.'
      },
      // 12. PDF to Images
      pdf2img: {
        name: 'PDF ke Gambar',
        shortDesc: 'Ubah halaman PDF menjadi gambar PNG atau JPEG resolusi tinggi secara satuan atau arsip ZIP.',
        instruction: 'Pilih format gambar keluaran (PNG atau JPEG), skala resolusi, dan halaman yang ingin diekspor.'
      },
      // 13. Watermark
      watermark: {
        name: 'Tambah Watermark',
        shortDesc: 'Sematkan teks tanda air (watermark) kustom dengan pengaturan ukuran, warna, opasitas, dan rotasi.',
        instruction: 'Atur teks watermark, ukuran huruf, transparansi, sudut rotasi, dan posisi dengan pratinjau langsung.'
      },
      // 14. Info
      info: {
        name: 'Informasi PDF',
        shortDesc: 'Periksa metadata dokumen, dimensi setiap halaman, ukuran file, detail pembuat, dan status keamanan.',
        instruction: 'Lihat properti asli dokumen yang tertanam, tanggal pembuatan, dan rincian dimensi per halaman.'
      }
    },
    workspace: {
      dropTitlePdf: 'Lepaskan file PDF di sini, atau klik untuk memilih',
      dropTitleSinglePdf: 'Lepaskan satu file PDF di sini, atau klik untuk memilih',
      dropTitleImg: 'Lepaskan gambar JPG, PNG, atau WebP di sini, atau klik untuk memilih',
      dropSubPdf: 'Mendukung dokumen PDF standar • 100% diproses di dalam browser Anda',
      dropSubImg: 'Mendukung gambar JPEG, PNG, dan WebP • Menjaga rasio aspek proporsional',
      selectFilesBtn: 'Pilih File',
      addMoreFilesBtn: 'Tambah File Lagi',
      loadSampleBtn: 'Muat Contoh PDF',
      loadTwoSamplesBtn: 'Muat 2 Contoh PDF',
      loadSampleImagesBtn: 'Muat 3 Contoh Gambar',
      clearAllBtn: 'Atur Ulang Ruang Kerja',
      filesLoaded: 'File Dimuat',
      pagesCount: 'halaman',
      pageLabel: 'Halaman',
      totalPages: 'Total Halaman',
      fileSize: 'Ukuran File',
      processing: 'Memproses dokumen secara lokal...',
      renderingPreviews: 'Merender pratinjau halaman resolusi tinggi...',
      downloadResult: 'Unduh Hasil',
      downloadZip: 'Unduh Arsip ZIP',
      downloadJson: 'Ekspor Laporan JSON',
      downloadTxt: 'Ekspor Laporan TXT',
      readyToDownload: 'File Anda telah selesai diproses dan siap diunduh!',
      moveUp: 'Geser Naik',
      moveDown: 'Geser Turun',
      moveLeft: 'Geser ke Awal',
      moveRight: 'Geser ke Akhir',
      removeFile: 'Hapus File',
      deletePage: 'Hapus Halaman',
      duplicatePage: 'Duplikat Halaman',
      rotateCw: 'Putar +90°',
      rotateCcw: 'Putar -90°',
      rotate180: 'Putar 180°',
      resetRotation: 'Atur Ulang Rotasi',
      emptyWorkspaceTitle: 'Belum Ada Dokumen yang Dimuat',
      emptyWorkspaceDesc: 'Unggah file Anda pada area di atas atau klik tombol contoh untuk langsung mencoba fitur ini.',
      engineLoading: 'Menyiapkan mesin PDF lokal...',
      engineReady: 'Mesin PDF Siap',
      encryptedError: 'PDF ini dilindungi kata sandi atau terenkripsi. Demi keamanan dan privasi, MoPDF tidak membobol kata sandi. Silakan buka kunci dokumen terlebih dahulu.',
      corruptError: 'Tidak dapat membaca file ini. File mungkin rusak atau bukan format yang valid.',
      unsupportedFileError: 'Format file tidak didukung. Harap unggah file PDF yang valid atau gambar (JPEG, PNG, WebP).',
      emptyFileError: 'File yang diunggah kosong (0 byte) dan tidak dapat diproses.'
    },
    toolControls: {
      // Merge
      mergeBtn: 'Gabungkan PDF Sekarang',
      mergeMinWarning: 'Harap unggah minimal 2 dokumen PDF untuk melakukan penggabungan.',
      mergeSummary: 'Menggabungkan {files} dokumen ({pages} total halaman)',

      // Split
      splitRangeLabel: 'Rentang Halaman untuk Diekstrak',
      splitRangePlaceholder: 'contoh: 1-3, 5, 7-9',
      splitRangeHint: 'Gunakan koma dan tanda hubung (1-{max}). Anda juga dapat mengklik kartu halaman di bawah.',
      splitModeLabel: 'Mode Keluaran',
      splitModeMerge: 'Gabungkan halaman terpilih menjadi satu PDF',
      splitModeZip: 'Simpan setiap rentang sebagai PDF terpisah (Arsip ZIP)',
      splitSelectAll: 'Pilih Semua Halaman',
      splitSelectOdd: 'Halaman Ganjil',
      splitSelectEven: 'Halaman Genap',
      splitClearSelection: 'Hapus Pilihan',
      splitBtn: 'Pisah & Ekstrak PDF',
      splitRangeInvalid: 'Format rentang halaman tidak valid. Gunakan angka seperti 1-3, 5.',
      splitRangeOutBounds: 'Nomor halaman melebihi batas. Dokumen memiliki {max} halaman.',
      splitRangeEmpty: 'Harap pilih setidaknya satu halaman atau rentang yang valid.',

      // Organize
      organizeOrderHint: 'Seret pratinjau halaman atau gunakan tombol panah untuk mengubah urutan. Hasil ekspor mengikuti urutan ini.',
      organizeBtn: 'Ekspor PDF yang Diatur',
      organizeMinPageWarn: 'Dokumen PDF harus memiliki setidaknya 1 halaman.',
      organizeResetBtn: 'Kembalikan Halaman Awal',

      // Rotate
      rotateAllTitle: 'Putar Massal Semua Halaman',
      rotateAll90: 'Putar Semua 90° Searah Jarum Jam',
      rotateAll180: 'Putar Semua 180°',
      rotateAll270: 'Putar Semua 270°',
      rotateSelectedTitle: 'Terapkan pada Halaman Terpilih',
      rotateSaveBtn: 'Simpan PDF yang Diputar',

      // Compress [NEW]
      compressLevelLabel: 'Mode Optimasi',
      compressModeLossless: 'Optimasi Struktur Lossless (Kualitas 100% Terjaga)',
      compressModeMax: 'Pemadatan Aliran Data Ekstra',
      compressOrigSizeLabel: 'Ukuran Awal File',
      compressNewSizeLabel: 'Ukuran Setelah Optimasi',
      compressReductionLabel: 'Pengurangan Ukuran',
      compressBtn: 'Kompres & Optimasi PDF',
      compressAlreadyOptimized: 'Dokumen PDF Anda sudah sangat padat dan teroptimasi! File asli tetap dipertahankan dengan kualitas 100%.',
      compressDisclaimer: 'Kompresi menggunakan restrukturisasi aliran objek di browser dan kompresi Flate. Tidak ada perenderan gambar raster penuh, sehingga ketajaman teks tetap utuh.',

      // Page Numbers [NEW]
      pnFormatLabel: 'Format Penomoran',
      pnFormatSimple: '1, 2, 3...',
      pnFormatPageN: 'Halaman 1, Halaman 2...',
      pnFormatNOfTotal: '1 dari N, 2 dari N...',
      pnFormatPageNOfTotal: 'Halaman 1 dari N...',
      pnFormatDash: '- 1 -, - 2 -...',
      pnStartNumLabel: 'Nomor Halaman Awal',
      pnFontSizeLabel: 'Ukuran Huruf',
      pnColorLabel: 'Warna Teks',
      pnPositionLabel: 'Posisi & Penjajaran',
      pnPosBottomCenter: 'Bawah Tengah',
      pnPosBottomRight: 'Bawah Kanan',
      pnPosBottomLeft: 'Bawah Kiri',
      pnPosTopCenter: 'Atas Tengah',
      pnPosTopRight: 'Atas Kanan',
      pnPosTopLeft: 'Atas Kiri',
      pnMarginLabel: 'Jarak Margin Tepi (pt)',
      pnTargetLabel: 'Terapkan Pada Halaman',
      pnTargetAll: 'Semua Halaman',
      pnTargetCustom: 'Rentang Kustom (misal: 2-N untuk lewati sampul)',
      pnApplyBtn: 'Beri Nomor & Ekspor PDF',
      pnLivePreview: 'Pratinjau Langsung Penomoran (Halaman 1)',

      // Crop [NEW]
      cropMarginPresets: 'Pilihan Cepat Margin',
      cropPresetNone: 'Pangkas Kustom',
      cropPresetMargin10: 'Pangkas Tepi 10 pt',
      cropPresetMargin20: 'Pangkas Tepi 20 pt',
      cropPresetMargin40: 'Pangkas Tepi 40 pt',
      cropTopLabel: 'Pangkas Atas',
      cropBottomLabel: 'Pangkas Bawah',
      cropLeftLabel: 'Pangkas Kiri',
      cropRightLabel: 'Pangkas Kanan',
      cropTargetLabel: 'Terapkan Pemangkasan Pada',
      cropTargetAll: 'Semua Halaman',
      cropTargetCurrent: 'Halaman Ini Saja',
      cropTargetCustom: 'Rentang Halaman Kustom',
      cropDisclaimer: 'Catatan: Pemangkasan PDF menyesuaikan batas area tampilan visual (MediaBox & CropBox). Bagian di luar kotak tersembunyi dari tampilan namun tidak terhapus secara permanen.',
      cropApplyBtn: 'Terapkan Pemangkasan & Ekspor PDF',
      cropLivePreview: 'Pratinjau Area Pemangkasan (Halaman 1)',

      // Resize [NEW]
      resizeSizeLabel: 'Ukuran Kertas Tujuan',
      resizeA4: 'A4 (210 × 297 mm)',
      resizeA3: 'A3 (297 × 420 mm)',
      resizeA5: 'A5 (148 × 210 mm)',
      resizeLetter: 'US Letter (8.5 × 11 in)',
      resizeLegal: 'US Legal (8.5 × 14 in)',
      resizeCustom: 'Ukuran Kustom',
      resizeCustomWidth: 'Lebar (pt)',
      resizeCustomHeight: 'Tinggi (pt)',
      resizeOrientationLabel: 'Orientasi Halaman',
      resizePortrait: 'Potret (Tegak)',
      resizeLandscape: 'Lanskap (Mendatar)',
      resizeAuto: 'Otomatis (Ikuti Asli)',
      resizeModeLabel: 'Strategi Penskalaan Konten',
      resizeModeScaleFit: 'Skalakan konten vektor secara proporsional sesuai ukuran baru',
      resizeModeCanvasOnly: 'Ubah ukuran batas kanvas tanpa mengubah ukuran konten',
      resizeTargetLabel: 'Halaman yang Diubah',
      resizeTargetAll: 'Semua Halaman',
      resizeTargetCustom: 'Rentang Kustom',
      resizeApplyBtn: 'Ubah Ukuran & Ekspor PDF',

      // Metadata [NEW]
      metaDocProps: 'Edit Properti Dokumen',
      metaTitleLabel: 'Judul Dokumen',
      metaAuthorLabel: 'Penulis (Author)',
      metaSubjectLabel: 'Subjek Dokumen',
      metaKeywordsLabel: 'Kata Kunci (pisahkan dengan koma)',
      metaCreatorLabel: 'Aplikasi Pembuat',
      metaProducerLabel: 'Produser PDF',
      metaClearAllBtn: 'Kosongkan Semua Metadata',
      metaResetBtn: 'Kembalikan Nilai Awal',
      metaApplyBtn: 'Simpan Metadata & Ekspor PDF',
      metaDisclaimer: 'Catatan: Mengedit metadata memperbarui informasi standar PDF. Ini tidak menghapus riwayat dokumen atau jejak teks yang tersembunyi di dalam aliran objek mentah.',

      // Sign [NEW]
      signMethodLabel: 'Metode Pembuatan Tanda Tangan',
      signMethodDraw: 'Gambar Tanda Tangan',
      signMethodType: 'Ketik Tanda Tangan',
      signMethodUpload: 'Unggah Gambar',
      signDrawClear: 'Hapus Goresan',
      signTypeNameLabel: 'Ketik Nama Anda',
      signTypeNamePlaceholder: 'misal: Dimas Mong',
      signTypeFontLabel: 'Gaya Kaligrafi',
      signFontElegant: 'Kaligrafi Klasik',
      signFontModern: 'Kaligrafi Modern',
      signFontCursive: 'Tulisan Kursif',
      signFontFormal: 'Formal Eksekutif',
      signUploadLabel: 'Pilih File Gambar Tanda Tangan (PNG, JPG)',
      signPageTargetLabel: 'Beri Tanda Tangan Pada Halaman',
      signSizeLabel: 'Lebar Tanda Tangan',
      signPositionLabel: 'Posisi Penempatan',
      signPosBottomRight: 'Kanan Bawah',
      signPosBottomLeft: 'Kiri Bawah',
      signPosCenter: 'Tengah Halaman',
      signPosTopRight: 'Kanan Atas',
      signPosTopLeft: 'Kiri Atas',
      signDisclaimer: 'Penting: Fitur ini menyematkan tanda tangan visual pada halaman dokumen. Ini bukan tanda tangan digital berbasis sertifikat kriptografi (PKI/X.509).',
      signApplyBtn: 'Sematkan Tanda Tangan & Ekspor PDF',
      signLivePreview: 'Pratinjau Penempatan Tanda Tangan',

      // Images to PDF
      imgPageSize: 'Ukuran Halaman',
      imgSizeA4: 'A4 (210 × 297 mm)',
      imgSizeLetter: 'US Letter (8.5 × 11 in)',
      imgSizeFit: 'Sesuaikan Ukuran Gambar',
      imgOrientation: 'Orientasi Halaman',
      imgPortrait: 'Potret (Tegak)',
      imgLandscape: 'Lanskap (Mendatar)',
      imgAutoOrient: 'Otomatis (Ikuti Gambar)',
      imgMargin: 'Margin Halaman',
      imgMarginNone: 'Tanpa Margin (Penuh)',
      imgMarginSmall: 'Margin Kecil (20 pt)',
      imgMarginLarge: 'Margin Standar (40 pt)',
      imgConvertBtn: 'Buat PDF dari Gambar',

      // PDF to Images
      pdf2imgFormat: 'Format Gambar',
      pdf2imgFormatPng: 'PNG (Kualitas Tanpa Kompresi)',
      pdf2imgFormatJpg: 'JPEG (Ukuran Lebih Ringan)',
      pdf2imgScale: 'Skala Resolusi',
      pdf2imgScale1: '1x Standar (96 DPI)',
      pdf2imgScale2: '2x Resolusi Tinggi (192 DPI)',
      pdf2imgScale3: '3x Kualitas Cetak Ultra (288 DPI)',
      pdf2imgPages: 'Halaman yang Dirender',
      pdf2imgAllPages: 'Semua Halaman',
      pdf2imgSelectedPages: 'Halaman Terpilih Saja',
      pdf2imgExportBtn: 'Render & Unduh Gambar',

      // Watermark
      wmTextLabel: 'Teks Watermark',
      wmTextPlaceholder: 'RAHASIA / DRAF',
      wmFontSize: 'Ukuran Huruf',
      wmOpacity: 'Opasitas (Transparansi)',
      wmRotation: 'Sudut Rotasi',
      wmColor: 'Warna Watermark',
      wmPosition: 'Posisi pada Halaman',
      wmPosCenter: 'Tengah Halaman',
      wmPosTiled: 'Pola Berulang (Grid Penuh)',
      wmPosTopLeft: 'Kiri Atas',
      wmPosTopRight: 'Kanan Atas',
      wmPosBottomLeft: 'Kiri Bawah',
      wmPosBottomRight: 'Kanan Bawah',
      wmPagesTarget: 'Terapkan Pada',
      wmTargetAll: 'Semua Halaman',
      wmTargetCustom: 'Rentang Halaman Kustom',
      wmLivePreview: 'Pratinjau Langsung Watermark (Halaman 1)',
      wmApplyBtn: 'Sematkan Watermark & Ekspor PDF',
      wmEmptyTextError: 'Harap masukkan teks watermark sebelum mengekspor.',

      // Info
      infoDocProps: 'Metadata & Properti Dokumen',
      infoPageDims: 'Rincian Dimensi per Halaman',
      infoFieldTitle: 'Judul Dokumen',
      infoFieldAuthor: 'Penulis (Author)',
      infoFieldSubject: 'Subjek',
      infoFieldCreator: 'Aplikasi Pembuat',
      infoFieldProducer: 'Produser PDF',
      infoFieldKeywords: 'Kata Kunci',
      infoFieldCreated: 'Tanggal Dibuat',
      infoFieldModified: 'Terakhir Diubah',
      infoFieldFileName: 'Nama File',
      infoFieldExactSize: 'Ukuran File Presisi',
      infoFieldEncrypted: 'Status Enkripsi',
      infoNotEncrypted: 'Tidak Terenkripsi (PDF Terbuka Standar)',
      infoNotSpecified: 'Tidak tersedia di dalam dokumen',
      infoPoints: 'Poin (pt)',
      infoMillimeters: 'Milimeter (mm)',
      infoInches: 'Inci (in)',
      infoOrientationLabel: 'Orientasi'
    },
    notifications: {
      sampleLoaded: 'Contoh PDF berhasil dibuat dan dimuat ke ruang kerja.',
      sampleImagesLoaded: '3 contoh gambar berhasil dibuat dan dimuat.',
      mergeSuccess: 'Berhasil menggabungkan {count} file PDF!',
      splitSuccess: 'Berhasil mengekstrak halaman yang diminta!',
      organizeSuccess: 'Berhasil mengekspor PDF yang telah diatur ({count} halaman)!',
      rotateSuccess: 'Berhasil menerapkan rotasi dan mengekspor PDF!',
      compressSuccess: 'Berhasil mengompresi dan mengoptimasi dokumen PDF!',
      pageNumbersSuccess: 'Berhasil menyematkan nomor halaman ke PDF!',
      cropSuccess: 'Berhasil memangkas halaman PDF!',
      resizeSuccess: 'Berhasil mengubah ukuran dokumen PDF!',
      metadataSuccess: 'Berhasil memperbarui metadata dokumen PDF!',
      signSuccess: 'Berhasil menyematkan tanda tangan visual ke PDF!',
      img2pdfSuccess: 'Berhasil mengonversi {count} gambar menjadi dokumen PDF!',
      pdf2imgSuccess: 'Berhasil merender {count} halaman menjadi gambar!',
      watermarkSuccess: 'Berhasil menyematkan watermark ke dalam PDF!'
    },
    faq: {
      title: 'Pertanyaan Umum (FAQ) & Arsitektur Privasi',
      subtitle: 'Semua yang perlu Anda ketahui tentang bagaimana MoPDF melindungi dokumen Anda.',
      q1: 'Apakah file PDF saya diunggah ke server pihak ketiga?',
      a1: 'Tidak pernah. MoPDF berjalan 100% secara lokal di dalam browser web Anda menggunakan teknologi WebAssembly dan HTML5 Canvas (pdf-lib & PDF.js). Dokumen Anda tidak pernah meninggalkan perangkat Anda.',
      q2: 'Apakah MoPDF menyimpan isi dokumen saya di localStorage?',
      a2: 'Tidak. Isi dokumen hanya berada di memori sementara browser selama Anda mengeditnya dan langsung dihapus saat Anda mereset ruang kerja atau menutup tab. Hanya preferensi tema (Terang/Gelap) dan bahasa (EN/ID) yang disimpan di localStorage.',
      q3: 'Di mana saya bisa melihat kode sumber MoPDF?',
      a3: 'Buka repositori GitHub MoPDF melalui ikon GitHub di bilah navigasi atau bagian footer.',
      q4: 'Apa yang terjadi jika saya mengunggah PDF yang dikunci kata sandi?',
      a4: 'MoPDF menghormati keamanan dokumen dan tidak mencoba membobol kata sandi PDF. Jika file terenkripsi terdeteksi, MoPDF akan menampilkan pesan pemberitahuan yang jelas tanpa membuat aplikasi berhenti.'
    },
    footer: {
      tagline: 'Toolkit PDF modern, gratis, dan mengutamakan privasi.',
      localGuarantee: '100% Eksekusi Sisi Browser • Tanpa Pelacakan • Lisensi Open Source MIT',
      copyright: 'Dimas Mong. Licensed under the MIT License.'
    }
  }
};
