import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  FileText,
  Files,
  Scissors,
  LayoutGrid,
  RotateCw,
  RotateCcw,
  Image as ImageIcon,
  FileImage,
  Stamp,
  Info,
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Globe,
  Github,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  Plus,
  Check,
  Loader2,
  Eye,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Menu,
  Copy,
  FilePlus2,
  Layers,
  Lock,
  BookOpen,
  Terminal,
  ExternalLink,
  Sliders,
  Maximize2
} from 'lucide-react';

/**
 * ============================================================================
 * CENTRAL CONFIGURATION
 * Update GITHUB_REPO_URL here after publishing your repository to GitHub.
 * ============================================================================
 */
const GITHUB_REPO_URL = 'https://github.com/dimasmong/MoPDF';
const APP_VERSION = '1.0.0';

/**
 * ============================================================================
 * EXTERNAL CDN LIBRARIES LOADER (pdf-lib, pdf.js, JSZip)
 * Ensures 100% browser-side PDF manipulation, rendering, and ZIP packaging.
 * ============================================================================
 */
const CDN_LIBS = {
  pdfLib: 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  jsZip: 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  pdfJs: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  pdfJsWorker: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
};

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute('data-loaded') === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * ============================================================================
 * CENTRALIZED STRONGLY-STRUCTURED TRANSLATION DICTIONARY (EN & ID)
 * ============================================================================
 */
const TRANSLATIONS = {
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
      openTool: 'Launch Tool'
    },
    tools: {
      merge: {
        name: 'Merge PDF',
        shortDesc: 'Combine multiple PDF documents into a single unified file in your preferred order.',
        instruction: 'Upload 2 or more PDF files, drag or use arrows to reorder them, and merge into one document.'
      },
      split: {
        name: 'Split PDF',
        shortDesc: 'Extract specific pages or split a document by custom page ranges into separate files.',
        instruction: 'Enter page ranges (e.g. 1-3, 5, 8-10) or click thumbnails to extract pages as one PDF or a ZIP archive.'
      },
      organize: {
        name: 'Organize PDF',
        shortDesc: 'Reorder, rotate, duplicate, or delete individual PDF pages with visual thumbnails.',
        instruction: 'Drag and drop page cards or use the move, rotate, duplicate, and delete controls to reorganize your PDF.'
      },
      rotate: {
        name: 'Rotate PDF',
        shortDesc: 'Rotate individual pages, selected pages, or the entire document by 90°, 180°, or 270°.',
        instruction: 'Rotate all pages at once or fine-tune individual pages with real-time visual previews.'
      },
      img2pdf: {
        name: 'Images to PDF',
        shortDesc: 'Convert JPG, PNG, and WebP images into a clean, customizable PDF document.',
        instruction: 'Upload multiple images, arrange their sequence, and choose page size, orientation, and margins.'
      },
      pdf2img: {
        name: 'PDF to Images',
        shortDesc: 'Render PDF pages into high-resolution PNG or JPEG images individually or as a ZIP.',
        instruction: 'Choose your output image format (PNG or JPEG), resolution scale, and pages to export.'
      },
      watermark: {
        name: 'Add Watermark',
        shortDesc: 'Stamp customizable text watermarks with precise size, color, opacity, and rotation.',
        instruction: 'Configure your watermark text, typography, opacity, angle, and placement with live preview.'
      },
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
      openTool: 'Buka Alat'
    },
    tools: {
      merge: {
        name: 'Gabung PDF',
        shortDesc: 'Gabungkan beberapa dokumen PDF menjadi satu file utuh sesuai urutan yang Anda inginkan.',
        instruction: 'Unggah 2 atau lebih file PDF, seret atau gunakan tombol panah untuk mengatur urutan, lalu gabungkan.'
      },
      split: {
        name: 'Pisah PDF',
        shortDesc: 'Ekstrak halaman tertentu atau pisahkan dokumen berdasarkan rentang halaman kustom.',
        instruction: 'Masukkan rentang halaman (misal 1-3, 5, 8-10) atau klik pratinjau halaman untuk mengekstrak sebagai PDF atau ZIP.'
      },
      organize: {
        name: 'Atur Halaman PDF',
        shortDesc: 'Ubah urutan, putar, duplikat, atau hapus halaman PDF secara visual dengan pratinjau.',
        instruction: 'Seret dan lepas kartu halaman atau gunakan tombol geser, putar, duplikat, dan hapus untuk menyusun ulang PDF.'
      },
      rotate: {
        name: 'Putar PDF',
        shortDesc: 'Putar halaman individual, halaman terpilih, atau seluruh dokumen sebesar 90°, 180°, atau 270°.',
        instruction: 'Putar semua halaman sekaligus atau atur halaman tertentu dengan pratinjau visual langsung.'
      },
      img2pdf: {
        name: 'Gambar ke PDF',
        shortDesc: 'Konversi gambar JPG, PNG, dan WebP menjadi dokumen PDF rapi yang dapat disesuaikan.',
        instruction: 'Unggah beberapa gambar, atur urutannya, serta pilih ukuran halaman, orientasi, dan margin.'
      },
      pdf2img: {
        name: 'PDF ke Gambar',
        shortDesc: 'Ubah halaman PDF menjadi gambar PNG atau JPEG resolusi tinggi secara satuan atau arsip ZIP.',
        instruction: 'Pilih format gambar keluaran (PNG atau JPEG), skala resolusi, dan halaman yang ingin diekspor.'
      },
      watermark: {
        name: 'Tambah Watermark',
        shortDesc: 'Sematkan teks tanda air (watermark) kustom dengan pengaturan ukuran, warna, opasitas, dan rotasi.',
        instruction: 'Atur teks watermark, ukuran huruf, transparansi, sudut rotasi, dan posisi dengan pratinjau langsung.'
      },
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
      tagline: 'Toolkit PDF modern, gratis, dan mengutamakan privasi dengan desain Red Liquid Glass.',
      localGuarantee: '100% Eksekusi Sisi Browser • Tanpa Pelacakan • Lisensi Open Source MIT',
      copyright: 'MoPDF Toolkit. Dirancang untuk kecepatan, aksesibilitas, dan privasi dokumen sepenuhnya.'
    }
  }
};

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function hexToRgbNormalized(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  return {
    r: Number.isFinite(r) ? r : 0.9,
    g: Number.isFinite(g) ? g : 0.22,
    b: Number.isFinite(b) ? b : 0.21
  };
}

/**
 * Parse page range strings like "1-3, 5, 8-10"
 * Returns { valid: boolean, errorKey: string | null, ranges: Array<number[]>, flatPages: number[] }
 * Note: returned page indices are 1-based.
 */
function parsePageRanges(inputStr, maxPages) {
  const cleaned = (inputStr || '').trim();
  if (!cleaned) {
    return { valid: false, errorKey: 'splitRangeEmpty', ranges: [], flatPages: [] };
  }

  const parts = cleaned.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { valid: false, errorKey: 'splitRangeEmpty', ranges: [], flatPages: [] };
  }

  const ranges = [];
  const flatSet = new Set();

  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const pageNum = parseInt(part, 10);
      if (pageNum < 1 || pageNum > maxPages) {
        return { valid: false, errorKey: 'splitRangeOutBounds', ranges: [], flatPages: [] };
      }
      ranges.push([pageNum]);
      flatSet.add(pageNum);
    } else if (/^\d+\s*-\s*\d+$/.test(part)) {
      const [startStr, endStr] = part.split('-').map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (start < 1 || end < 1 || start > end) {
        return { valid: false, errorKey: 'splitRangeInvalid', ranges: [], flatPages: [] };
      }
      if (start > maxPages || end > maxPages) {
        return { valid: false, errorKey: 'splitRangeOutBounds', ranges: [], flatPages: [] };
      }
      const group = [];
      for (let p = start; p <= end; p++) {
        group.push(p);
        flatSet.add(p);
      }
      ranges.push(group);
    } else {
      return { valid: false, errorKey: 'splitRangeInvalid', ranges: [], flatPages: [] };
    }
  }

  return {
    valid: true,
    errorKey: null,
    ranges,
    flatPages: Array.from(flatSet).sort((a, b) => a - b)
  };
}

/**
 * Convert an array of 1-based page numbers into compact range string e.g. [1,2,3,5] -> "1-3, 5"
 */
function pagesArrayToRangeString(pages) {
  if (!pages || pages.length === 0) return '';
  const sorted = Array.from(new Set(pages)).sort((a, b) => a - b);
  const parts = [];
  let start = sorted[0];
  let prev = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const curr = sorted[i];
    if (curr === prev + 1) {
      prev = curr;
    } else {
      parts.push(start === prev ? `${start}` : `${start}-${prev}`);
      start = curr;
      prev = curr;
    }
  }
  parts.push(start === prev ? `${start}` : `${start}-${prev}`);
  return parts.join(', ');
}

/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT
 * ============================================================================
 */
export default function App() {
  // 1. Theme State — Strictly defaults to 'light' on first visit
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('mopdf_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  // 2. Language State — Strictly defaults to 'en' on first visit
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('mopdf_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  const t = TRANSLATIONS[lang];

  // Sync theme & language to localStorage and document root
  useEffect(() => {
    try {
      localStorage.setItem('mopdf_theme', theme);
    } catch {
      // ignore
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('mopdf_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  // 3. External PDF Libraries Status
  const [libsReady, setLibsReady] = useState(false);
  const [libsError, setLibsError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function initLibraries() {
      try {
        await Promise.all([
          loadScriptOnce(CDN_LIBS.pdfLib),
          loadScriptOnce(CDN_LIBS.jsZip),
          loadScriptOnce(CDN_LIBS.pdfJs)
        ]);
        if (window.pdfjsLib && window.pdfjsLib.GlobalWorkerOptions) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN_LIBS.pdfJsWorker;
        }
        if (mounted) setLibsReady(true);
      } catch (err) {
        if (mounted) setLibsError(err.message || 'Failed to load PDF libraries');
      }
    }
    initLibraries();
    return () => {
      mounted = false;
    };
  }, []);

  // 4. Navigation & Active Tool State
  const [activeTool, setActiveTool] = useState('merge');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const workspaceRef = useRef(null);
  const fileInputRef = useRef(null);

  // 5. Uploaded Files & Page State
  // pdfFiles: Array of { id, name, size, bytes (Uint8Array), pageCount, thumbnails: string[], metadata, pageDims: [] }
  const [pdfFiles, setPdfFiles] = useState([]);
  // organizePages: Array of { uid, sourcePageIndex (0-based), pageNumber (1-based), rotation (0|90|180|270), thumbnail, widthPt, heightPt }
  const [organizePages, setOrganizePages] = useState([]);
  // imageFiles (for img2pdf): Array of { id, name, size, dataUrl, width, height, mimeType }
  const [imageFiles, setImageFiles] = useState([]);

  // 6. Tool-Specific Settings State
  // Split settings
  const [splitRangeInput, setSplitRangeInput] = useState('1-2');
  const [splitMode, setSplitMode] = useState('merge'); // 'merge' | 'zip'
  // Rotate settings
  const [selectedRotatePages, setSelectedRotatePages] = useState([]);
  // Images to PDF settings
  const [imgPageSize, setImgPageSize] = useState('A4'); // 'A4' | 'Letter' | 'Fit'
  const [imgOrientation, setImgOrientation] = useState('portrait'); // 'portrait' | 'landscape' | 'auto'
  const [imgMargin, setImgMargin] = useState('small'); // 'none' | 'small' | 'large'
  // PDF to Images settings
  const [pdf2imgFormat, setPdf2imgFormat] = useState('png'); // 'png' | 'jpeg'
  const [pdf2imgScale, setPdf2imgScale] = useState(2); // 1 | 2 | 3
  const [pdf2imgScope, setPdf2imgScope] = useState('all'); // 'all' | 'selected'
  const [selectedExportPages, setSelectedExportPages] = useState([]);
  // Watermark settings
  const [wmText, setWmText] = useState('CONFIDENTIAL • MoPDF');
  const [wmFontSize, setWmFontSize] = useState(42);
  const [wmOpacity, setWmOpacity] = useState(0.28);
  const [wmRotation, setWmRotation] = useState(-45);
  const [wmColor, setWmColor] = useState('#E53935');
  const [wmPosition, setWmPosition] = useState('center'); // 'center' | 'tiled' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  const [wmTarget, setWmTarget] = useState('all'); // 'all' | 'custom'
  const [wmCustomRange, setWmCustomRange] = useState('1');

  // 7. Processing, Drag-and-Drop, Output & Notification States
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRenderingThumbs, setIsRenderingThumbs] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [resultDownload, setResultDownload] = useState(null); // { url, filename, size, type }
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Revoke object URL when resultDownload changes or unmounts
  useEffect(() => {
    return () => {
      if (resultDownload && resultDownload.url) {
        URL.revokeObjectURL(resultDownload.url);
      }
    };
  }, [resultDownload]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const clearResultDownload = useCallback(() => {
    setResultDownload((prev) => {
      if (prev && prev.url) URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const resetWorkspace = useCallback(() => {
    clearResultDownload();
    setPdfFiles([]);
    setOrganizePages([]);
    setImageFiles([]);
    setSelectedRotatePages([]);
    setSelectedExportPages([]);
    setErrorBanner(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [clearResultDownload]);

  /**
   * ============================================================================
   * PDF THUMBNAIL RENDERER (pdf.js with fallback visual canvas)
   * ============================================================================
   */
  const renderPdfThumbnails = useCallback(async (uint8Array, pageCount, pageDims) => {
    const thumbnails = [];
    // Attempt rendering via pdf.js
    if (window.pdfjsLib) {
      try {
        const dataCopy = uint8Array.slice(0);
        let loadingTask = window.pdfjsLib.getDocument({ data: dataCopy });
        let pdfDoc;
        try {
          pdfDoc = await loadingTask.promise;
        } catch {
          // Fallback with disableWorker if worker CSP restricted
          loadingTask = window.pdfjsLib.getDocument({ data: uint8Array.slice(0), disableWorker: true });
          pdfDoc = await loadingTask.promise;
        }

        const maxThumbPages = Math.min(pdfDoc.numPages, 50);
        for (let p = 1; p <= maxThumbPages; p++) {
          const page = await pdfDoc.getPage(p);
          const viewport = page.getViewport({ scale: 0.45 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          thumbnails.push(canvas.toDataURL('image/jpeg', 0.82));
          // Release canvas memory
          canvas.width = 0;
          canvas.height = 0;
        }
        if (pdfDoc.destroy) await pdfDoc.destroy();
        return thumbnails;
      } catch {
        // Fallback to clean synthetic vector page thumbnail if pdf.js fails
      }
    }

    // Fallback synthetic page thumbnail generator
    for (let i = 0; i < pageCount; i++) {
      const dim = pageDims[i] || { widthPt: 595, heightPt: 842 };
      const canvas = document.createElement('canvas');
      canvas.width = 240;
      canvas.height = Math.round(240 * (dim.heightPt / dim.widthPt)) || 340;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FEE2E2';
      ctx.fillRect(20, 22, canvas.width - 40, 28);
      ctx.fillStyle = '#E53935';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`PDF PAGE ${i + 1}`, 30, 41);
      ctx.fillStyle = '#E4E4E7';
      for (let y = 70; y < canvas.height - 40; y += 18) {
        ctx.fillRect(24, y, canvas.width - (y % 36 === 0 ? 70 : 48), 7);
      }
      thumbnails.push(canvas.toDataURL('image/png'));
      canvas.width = 0;
      canvas.height = 0;
    }
    return thumbnails;
  }, []);

  /**
   * ============================================================================
   * PARSE AND INSPECT UPLOADED PDF FILE
   * ============================================================================
   */
  const inspectPdfBytes = useCallback(
    async (arrayBuffer, fileName, fileSize) => {
      if (!window.PDFLib) {
        throw new Error('PDF engine is still initializing.');
      }
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        const err = new Error('EMPTY_FILE');
        err.code = 'EMPTY_FILE';
        throw err;
      }

      const uint8 = new Uint8Array(arrayBuffer);
      let pdfDoc;
      try {
        pdfDoc = await window.PDFLib.PDFDocument.load(uint8, {
          updateMetadata: false
        });
      } catch (err) {
        const msg = (err && err.message ? err.message : '').toLowerCase();
        if (msg.includes('encrypted') || msg.includes('password')) {
          const encErr = new Error('ENCRYPTED_PDF');
          encErr.code = 'ENCRYPTED_PDF';
          throw encErr;
        }
        const corrErr = new Error('CORRUPT_PDF');
        corrErr.code = 'CORRUPT_PDF';
        throw corrErr;
      }

      const pages = pdfDoc.getPages();
      const pageCount = pages.length;
      if (pageCount === 0) {
        const corrErr = new Error('CORRUPT_PDF');
        corrErr.code = 'CORRUPT_PDF';
        throw corrErr;
      }

      const pageDims = pages.map((p, idx) => {
        const { width, height } = p.getSize();
        const rot = p.getRotation ? p.getRotation().angle : 0;
        return {
          pageNumber: idx + 1,
          widthPt: Math.round(width * 100) / 100,
          heightPt: Math.round(height * 100) / 100,
          widthMm: Math.round((width * 25.4) / 72),
          heightMm: Math.round((height * 25.4) / 72),
          widthIn: (width / 72).toFixed(2),
          heightIn: (height / 72).toFixed(2),
          orientation: width > height ? 'Landscape' : 'Portrait',
          rotation: ((rot % 360) + 360) % 360
        };
      });

      const safeMeta = (getter) => {
        try {
          const val = getter.call(pdfDoc);
          if (!val) return null;
          if (val instanceof Date) return val.toISOString().replace('T', ' ').substring(0, 19);
          if (Array.isArray(val)) return val.join(', ');
          return String(val).trim() || null;
        } catch {
          return null;
        }
      };

      const metadata = {
        title: safeMeta(pdfDoc.getTitle),
        author: safeMeta(pdfDoc.getAuthor),
        subject: safeMeta(pdfDoc.getSubject),
        creator: safeMeta(pdfDoc.getCreator),
        producer: safeMeta(pdfDoc.getProducer),
        keywords: safeMeta(pdfDoc.getKeywords),
        creationDate: safeMeta(pdfDoc.getCreationDate),
        modificationDate: safeMeta(pdfDoc.getModificationDate)
      };

      setIsRenderingThumbs(true);
      const thumbnails = await renderPdfThumbnails(uint8, pageCount, pageDims);
      setIsRenderingThumbs(false);

      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: fileName,
        size: fileSize,
        bytes: uint8,
        pageCount,
        thumbnails,
        metadata,
        pageDims
      };
    },
    [renderPdfThumbnails]
  );

  /**
   * Populate Organize/Rotate/Split states whenever primary PDF changes
   */
  const syncSinglePdfStates = useCallback((parsedPdf) => {
    const pagesList = Array.from({ length: parsedPdf.pageCount }, (_, idx) => ({
      uid: `page-${idx + 1}-${Math.random().toString(36).slice(2, 7)}`,
      sourcePageIndex: idx,
      pageNumber: idx + 1,
      rotation: parsedPdf.pageDims[idx]?.rotation || 0,
      thumbnail: parsedPdf.thumbnails[idx] || null,
      widthPt: parsedPdf.pageDims[idx]?.widthPt || 595,
      heightPt: parsedPdf.pageDims[idx]?.heightPt || 842
    }));
    setOrganizePages(pagesList);
    setSelectedRotatePages(pagesList.map((p) => p.uid));
    setSelectedExportPages(pagesList.map((_, i) => i + 1));
    const defaultSplitEnd = Math.min(2, parsedPdf.pageCount);
    setSplitRangeInput(parsedPdf.pageCount > 1 ? `1-${defaultSplitEnd}` : '1');
    setWmCustomRange(parsedPdf.pageCount > 1 ? `1-${parsedPdf.pageCount}` : '1');
  }, []);

  /**
   * ============================================================================
   * FILE UPLOAD HANDLER (PDFs & Images)
   * ============================================================================
   */
  const handleFilesSelected = useCallback(
    async (fileList) => {
      if (!fileList || fileList.length === 0) return;
      setErrorBanner(null);
      clearResultDownload();

      const filesArray = Array.from(fileList);

      // Case A: Images to PDF tool
      if (activeTool === 'img2pdf') {
        setIsProcessing(true);
        const loadedImages = [];
        try {
          for (const file of filesArray) {
            if (file.size === 0) {
              throw new Error(t.workspace.emptyFileError);
            }
            const isSupportedImg =
              file.type === 'image/jpeg' ||
              file.type === 'image/png' ||
              file.type === 'image/webp' ||
              /\.(jpe?g|png|webp)$/i.test(file.name);

            if (!isSupportedImg) {
              throw new Error(t.workspace.unsupportedFileError);
            }

            const imgData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                  // Normalize any image (including WebP) via canvas so pdf-lib can always embed it
                  const canvas = document.createElement('canvas');
                  canvas.width = img.naturalWidth || img.width || 800;
                  canvas.height = img.naturalHeight || img.height || 600;
                  const ctx = canvas.getContext('2d');
                  ctx.fillStyle = '#FFFFFF';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0);
                  const normalizedPngUrl = canvas.toDataURL('image/png');
                  const w = canvas.width;
                  const h = canvas.height;
                  canvas.width = 0;
                  canvas.height = 0;
                  resolve({
                    id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    name: file.name,
                    size: file.size,
                    dataUrl: normalizedPngUrl,
                    width: w,
                    height: h
                  });
                };
                img.onerror = () => reject(new Error(t.workspace.corruptError));
                img.src = reader.result;
              };
              reader.onerror = () => reject(new Error(t.workspace.corruptError));
              reader.readAsDataURL(file);
            });
            loadedImages.push(imgData);
          }
          setImageFiles((prev) => [...prev, ...loadedImages]);
        } catch (err) {
          setErrorBanner(err.message || t.workspace.corruptError);
        } finally {
          setIsProcessing(false);
        }
        return;
      }

      // Case B: PDF tools
      setIsProcessing(true);
      try {
        const parsedResults = [];
        const filesToProcess = activeTool === 'merge' ? filesArray : [filesArray[0]];

        for (const file of filesToProcess) {
          if (file.size === 0) {
            const emptyErr = new Error('EMPTY_FILE');
            emptyErr.code = 'EMPTY_FILE';
            throw emptyErr;
          }
          const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
          if (!isPdf) {
            const typeErr = new Error('UNSUPPORTED_FILE');
            typeErr.code = 'UNSUPPORTED_FILE';
            throw typeErr;
          }
          const buffer = await file.arrayBuffer();
          const inspected = await inspectPdfBytes(buffer, file.name, file.size);
          parsedResults.push(inspected);
        }

        if (activeTool === 'merge') {
          setPdfFiles((prev) => {
            const next = [...prev, ...parsedResults];
            if (next.length === 1) syncSinglePdfStates(next[0]);
            return next;
          });
        } else {
          const single = parsedResults[0];
          setPdfFiles([single]);
          syncSinglePdfStates(single);
        }
      } catch (err) {
        setIsRenderingThumbs(false);
        if (err.code === 'ENCRYPTED_PDF') {
          setErrorBanner(t.workspace.encryptedError);
        } else if (err.code === 'EMPTY_FILE') {
          setErrorBanner(t.workspace.emptyFileError);
        } else if (err.code === 'UNSUPPORTED_FILE') {
          setErrorBanner(t.workspace.unsupportedFileError);
        } else {
          setErrorBanner(t.workspace.corruptError);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [activeTool, clearResultDownload, inspectPdfBytes, syncSinglePdfStates, t]
  );

  /**
   * ============================================================================
   * BUILT-IN REAL SAMPLE PDF & SAMPLE IMAGE GENERATOR
   * Allows immediate testing of every tool with zero external files required!
   * ============================================================================
   */
  const generateSamplePdfBytes = useCallback(async (docTitle = 'MoPDF Official Sample Document', pageTotal = 4, accentType = 'red') => {
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
    const pdfDoc = await PDFDocument.create();
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    pdfDoc.setTitle(docTitle);
    pdfDoc.setAuthor('MoPDF — Premium PDF Toolkit');
    pdfDoc.setSubject('Interactive Browser-Side PDF Verification Sample');
    pdfDoc.setCreator('MoPDF Client Engine v1.0');
    pdfDoc.setProducer('pdf-lib + MoPDF Red Liquid Glass');
    pdfDoc.setKeywords(['MoPDF', 'PDF Toolkit', 'Privacy-First', 'Sample']);
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    const pageThemes = [
      { title: 'Executive Overview & Architecture', badge: 'SECTION 01' },
      { title: 'Financial & Quarterly Metrics', badge: 'SECTION 02' },
      { title: 'Privacy & Local Security Protocol', badge: 'SECTION 03' },
      { title: 'Summary & Verification Appendix', badge: 'SECTION 04' }
    ];

    for (let i = 0; i < pageTotal; i++) {
      const page = pdfDoc.addPage([595.28, 841.89]); // A4
      const { width, height } = page.getSize();
      const themeInfo = pageThemes[i % pageThemes.length];

      // Header Banner
      const primaryColor = accentType === 'crimson' ? rgb(0.72, 0.11, 0.11) : rgb(0.9, 0.22, 0.21);
      page.drawRectangle({
        x: 40,
        y: height - 115,
        width: width - 80,
        height: 68,
        color: primaryColor
      });

      page.drawText(`MoPDF SAMPLE • ${themeInfo.badge}`, {
        x: 58,
        y: height - 74,
        size: 11,
        font: fontBold,
        color: rgb(1, 0.9, 0.9)
      });

      page.drawText(`Page ${i + 1} of ${pageTotal} — ${themeInfo.title}`, {
        x: 58,
        y: height - 98,
        size: 16,
        font: fontBold,
        color: rgb(1, 1, 1)
      });

      // Document Title & Info Box
      page.drawRectangle({
        x: 40,
        y: height - 220,
        width: width - 80,
        height: 85,
        color: rgb(0.99, 0.95, 0.95),
        borderColor: rgb(0.9, 0.22, 0.21),
        borderWidth: 1
      });

      page.drawText(docTitle, {
        x: 56,
        y: height - 162,
        size: 14,
        font: fontBold,
        color: rgb(0.12, 0.12, 0.15)
      });

      page.drawText(
        'This sample PDF was dynamically generated inside your browser using MoPDF.',
        {
          x: 56,
          y: height - 184,
          size: 10.5,
          font: fontRegular,
          color: rgb(0.3, 0.3, 0.35)
        }
      );

      page.drawText(
        'Use this document to test Merge, Split, Organize, Rotate, PDF-to-Images, Watermark, and Info tools.',
        {
          x: 56,
          y: height - 202,
          size: 10,
          font: fontRegular,
          color: rgb(0.4, 0.4, 0.45)
        }
      );

      // Content blocks
      for (let block = 0; block < 4; block++) {
        const topY = height - 270 - block * 115;
        page.drawRectangle({
          x: 40,
          y: topY - 75,
          width: width - 80,
          height: 88,
          color: rgb(0.97, 0.97, 0.98),
          borderColor: rgb(0.88, 0.88, 0.9),
          borderWidth: 0.8
        });

        page.drawText(`0${block + 1}. Verification Module — Page ${i + 1} Item ${block + 1}`, {
          x: 56,
          y: topY - 12,
          size: 12,
          font: fontBold,
          color: rgb(0.8, 0.16, 0.16)
        });

        page.drawText(
          'All PDF operations execute locally in browser memory. Zero files are transmitted to external servers.',
          {
            x: 56,
            y: topY - 34,
            size: 10,
            font: fontRegular,
            color: rgb(0.25, 0.25, 0.3)
          }
        );

        page.drawText(
          `Dimensions: 595.28 x 841.89 pt (Standard ISO A4 Portrait) • Verified Integrity Check #${(i + 1) * 100 + block}`,
          {
            x: 56,
            y: topY - 54,
            size: 9.5,
            font: fontRegular,
            color: rgb(0.45, 0.45, 0.5)
          }
        );
      }

      // Footer
      page.drawText(`MoPDF — Premium PDF Toolkit • Local Browser Engine`, {
        x: 40,
        y: 36,
        size: 9.5,
        font: fontRegular,
        color: rgb(0.5, 0.5, 0.55)
      });

      page.drawText(`PAGE ${i + 1} / ${pageTotal}`, {
        x: width - 115,
        y: 36,
        size: 10,
        font: fontBold,
        color: primaryColor
      });
    }

    return await pdfDoc.save();
  }, []);

  const handleLoadSample = useCallback(async () => {
    if (!libsReady) return;
    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      if (activeTool === 'img2pdf') {
        // Generate 3 distinct crisp sample graphic images via HTML5 Canvas
        const palettes = [
          { bg: '#FFF1F2', accent: '#E53935', title: 'SLIDE 01 • PRODUCT ARCHITECTURE' },
          { bg: '#FEF2F2', accent: '#C62828', title: 'SLIDE 02 • PRIVACY BENCHMARKS' },
          { bg: '#FAF8F9', accent: '#B91C1C', title: 'SLIDE 03 • RELEASE ROADMAP' }
        ];
        const generatedImgs = palettes.map((pal, idx) => {
          const canvas = document.createElement('canvas');
          canvas.width = 960;
          canvas.height = 640;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = pal.bg;
          ctx.fillRect(0, 0, 960, 640);
          ctx.fillStyle = pal.accent;
          ctx.fillRect(60, 60, 840, 110);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(pal.title, 92, 126);
          ctx.fillStyle = '#18181B';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(`MoPDF Visual Image Sample #${idx + 1}`, 92, 250);
          ctx.fillStyle = '#52525B';
          ctx.font = '18px sans-serif';
          ctx.fillText('Ready for instant conversion to A4 or Letter PDF document.', 92, 295);
          ctx.strokeStyle = pal.accent;
          ctx.lineWidth = 4;
          ctx.strokeRect(60, 60, 840, 520);
          const dataUrl = canvas.toDataURL('image/png');
          canvas.width = 0;
          canvas.height = 0;
          return {
            id: `sample-img-${idx}-${Date.now()}`,
            name: `mopdf-sample-slide-0${idx + 1}.png`,
            size: Math.round(dataUrl.length * 0.75),
            dataUrl,
            width: 960,
            height: 640
          };
        });
        setImageFiles(generatedImgs);
        showToast(t.notifications.sampleImagesLoaded);
      } else if (activeTool === 'merge') {
        const bytes1 = await generateSamplePdfBytes('MoPDF Sample Part A — Executive Report', 3, 'red');
        const bytes2 = await generateSamplePdfBytes('MoPDF Sample Part B — Financial Appendix', 2, 'crimson');
        const doc1 = await inspectPdfBytes(bytes1.buffer, 'mopdf-sample-part-A.pdf', bytes1.byteLength);
        const doc2 = await inspectPdfBytes(bytes2.buffer, 'mopdf-sample-part-B.pdf', bytes2.byteLength);
        setPdfFiles([doc1, doc2]);
        syncSinglePdfStates(doc1);
        showToast(t.notifications.sampleLoaded);
      } else {
        const bytes = await generateSamplePdfBytes('MoPDF Complete 4-Page Sample Document', 4, 'red');
        const doc = await inspectPdfBytes(bytes.buffer, 'mopdf-official-sample.pdf', bytes.byteLength);
        setPdfFiles([doc]);
        syncSinglePdfStates(doc);
        showToast(t.notifications.sampleLoaded);
      }

      if (workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  }, [
    activeTool,
    clearResultDownload,
    generateSamplePdfBytes,
    inspectPdfBytes,
    libsReady,
    showToast,
    syncSinglePdfStates,
    t
  ]);

  /**
   * Switch active tool cleanly while preserving loaded PDF when compatible
   */
  const handleSelectTool = useCallback(
    (toolKey) => {
      setActiveTool(toolKey);
      setErrorBanner(null);
      clearResultDownload();
      // If switching from merge (with multiple PDFs) to a single-PDF tool, keep the first PDF synced
      if (toolKey !== 'merge' && toolKey !== 'img2pdf' && pdfFiles.length > 0) {
        syncSinglePdfStates(pdfFiles[0]);
      }
      if (workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [clearResultDownload, pdfFiles, syncSinglePdfStates]
  );

  /**
   * ============================================================================
   * TOOL 1: MERGE PDF EXECUTION
   * ============================================================================
   */
  const executeMergePdf = async () => {
    if (pdfFiles.length < 2) {
      setErrorBanner(t.toolControls.mergeMinWarning);
      return;
    }
    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const { PDFDocument } = window.PDFLib;
      const mergedPdf = await PDFDocument.create();
      mergedPdf.setCreator('MoPDF — Premium PDF Toolkit');
      mergedPdf.setProducer('MoPDF Local Engine');

      for (const fileObj of pdfFiles) {
        const srcDoc = await PDFDocument.load(fileObj.bytes);
        const indices = srcDoc.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(srcDoc, indices);
        copiedPages.forEach((p) => mergedPdf.addPage(p));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultDownload({
        url,
        filename: 'mopdf-merged-document.pdf',
        size: mergedBytes.byteLength,
        type: 'pdf'
      });

      // Trigger automatic download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mopdf-merged-document.pdf';
      a.click();

      showToast(t.notifications.mergeSuccess.replace('{count}', String(pdfFiles.length)));
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 2: SPLIT PDF EXECUTION
   * ============================================================================
   */
  const executeSplitPdf = async () => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;

    const validation = parsePageRanges(splitRangeInput, primaryPdf.pageCount);
    if (!validation.valid) {
      const msgTemplate = t.toolControls[validation.errorKey] || t.toolControls.splitRangeInvalid;
      setErrorBanner(msgTemplate.replace('{max}', String(primaryPdf.pageCount)));
      return;
    }

    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const { PDFDocument } = window.PDFLib;
      const srcDoc = await PDFDocument.load(primaryPdf.bytes);
      const baseName = primaryPdf.name.replace(/\.pdf$/i, '');

      if (splitMode === 'merge' || validation.ranges.length === 1) {
        const outDoc = await PDFDocument.create();
        const zeroBasedIndices = validation.flatPages.map((p) => p - 1);
        const copied = await outDoc.copyPages(srcDoc, zeroBasedIndices);
        copied.forEach((p) => outDoc.addPage(p));
        const outBytes = await outDoc.save();
        const blob = new Blob([outBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const outName = `${baseName}-extracted-pages.pdf`;

        setResultDownload({
          url,
          filename: outName,
          size: outBytes.byteLength,
          type: 'pdf'
        });

        const a = document.createElement('a');
        a.href = url;
        a.download = outName;
        a.click();
      } else {
        // Multiple separate PDF files packaged into a ZIP archive
        const zip = new window.JSZip();
        for (let i = 0; i < validation.ranges.length; i++) {
          const group = validation.ranges[i];
          const subDoc = await PDFDocument.create();
          const copied = await subDoc.copyPages(
            srcDoc,
            group.map((p) => p - 1)
          );
          copied.forEach((p) => subDoc.addPage(p));
          const subBytes = await subDoc.save();
          const rangeLabel = group.length === 1 ? `page-${group[0]}` : `pages-${group[0]}-${group[group.length - 1]}`;
          zip.file(`${baseName}-part-${i + 1}-${rangeLabel}.pdf`, subBytes);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const zipName = `${baseName}-split-files.zip`;

        setResultDownload({
          url,
          filename: zipName,
          size: zipBlob.size,
          type: 'zip'
        });

        const a = document.createElement('a');
        a.href = url;
        a.download = zipName;
        a.click();
      }

      showToast(t.notifications.splitSuccess);
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 3 & 4: ORGANIZE PDF & ROTATE PDF EXECUTION
   * ============================================================================
   */
  const executeExportOrganizedOrRotatedPdf = async (mode = 'organize') => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;
    if (organizePages.length === 0) {
      setErrorBanner(t.toolControls.organizeMinPageWarn);
      return;
    }

    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const { PDFDocument, degrees } = window.PDFLib;
      const srcDoc = await PDFDocument.load(primaryPdf.bytes);
      const outDoc = await PDFDocument.create();

      for (const item of organizePages) {
        const [copiedPage] = await outDoc.copyPages(srcDoc, [item.sourcePageIndex]);
        copiedPage.setRotation(degrees(((item.rotation % 360) + 360) % 360));
        outDoc.addPage(copiedPage);
      }

      const outBytes = await outDoc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const baseName = primaryPdf.name.replace(/\.pdf$/i, '');
      const suffix = mode === 'rotate' ? 'rotated' : 'organized';
      const outName = `${baseName}-${suffix}.pdf`;

      setResultDownload({
        url,
        filename: outName,
        size: outBytes.byteLength,
        type: 'pdf'
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      a.click();

      if (mode === 'rotate') {
        showToast(t.notifications.rotateSuccess);
      } else {
        showToast(t.notifications.organizeSuccess.replace('{count}', String(organizePages.length)));
      }
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 5: IMAGES TO PDF EXECUTION
   * ============================================================================
   */
  const executeImagesToPdf = async () => {
    if (imageFiles.length === 0) return;
    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const { PDFDocument } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();
      const marginPt = imgMargin === 'none' ? 0 : imgMargin === 'small' ? 20 : 40;

      for (const imgObj of imageFiles) {
        // Embed normalized PNG dataUrl
        const embeddedImg = await pdfDoc.embedPng(imgObj.dataUrl);
        const imgW = embeddedImg.width;
        const imgH = embeddedImg.height;

        let pageW = imgW;
        let pageH = imgH;

        if (imgPageSize === 'A4') {
          pageW = 595.28;
          pageH = 841.89;
        } else if (imgPageSize === 'Letter') {
          pageW = 612;
          pageH = 792;
        }

        if (imgPageSize !== 'Fit') {
          const shouldLandscape =
            imgOrientation === 'landscape' || (imgOrientation === 'auto' && imgW > imgH);
          if (shouldLandscape && pageW < pageH) {
            const temp = pageW;
            pageW = pageH;
            pageH = temp;
          } else if (imgOrientation === 'portrait' && pageW > pageH) {
            const temp = pageW;
            pageW = pageH;
            pageH = temp;
          }
        } else {
          pageW = imgW + marginPt * 2;
          pageH = imgH + marginPt * 2;
        }

        const page = pdfDoc.addPage([pageW, pageH]);
        const availW = Math.max(20, pageW - marginPt * 2);
        const availH = Math.max(20, pageH - marginPt * 2);
        const scale = Math.min(availW / imgW, availH / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = (pageW - drawW) / 2;
        const drawY = (pageH - drawH) / 2;

        page.drawImage(embeddedImg, {
          x: drawX,
          y: drawY,
          width: drawW,
          height: drawH
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const outName = 'mopdf-images-converted.pdf';

      setResultDownload({
        url,
        filename: outName,
        size: pdfBytes.byteLength,
        type: 'pdf'
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      a.click();

      showToast(t.notifications.img2pdfSuccess.replace('{count}', String(imageFiles.length)));
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 6: PDF TO IMAGES EXECUTION
   * ============================================================================
   */
  const executePdfToImages = async () => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;

    const targetPages =
      pdf2imgScope === 'all'
        ? Array.from({ length: primaryPdf.pageCount }, (_, i) => i + 1)
        : selectedExportPages.slice().sort((a, b) => a - b);

    if (targetPages.length === 0) {
      setErrorBanner(t.toolControls.splitRangeEmpty);
      return;
    }

    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const baseName = primaryPdf.name.replace(/\.pdf$/i, '');
      const mimeType = pdf2imgFormat === 'png' ? 'image/png' : 'image/jpeg';
      const ext = pdf2imgFormat === 'png' ? 'png' : 'jpg';
      const renderedFiles = [];

      let pdfDoc = null;
      if (window.pdfjsLib) {
        try {
          const task = window.pdfjsLib.getDocument({ data: primaryPdf.bytes.slice(0) });
          pdfDoc = await task.promise;
        } catch {
          const taskFallback = window.pdfjsLib.getDocument({
            data: primaryPdf.bytes.slice(0),
            disableWorker: true
          });
          pdfDoc = await taskFallback.promise;
        }
      }

      for (const pageNum of targetPages) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (pdfDoc) {
          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: Number(pdf2imgScale) || 2 });
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
        } else {
          // Fallback high-res render from stored thumbnail if pdfjs unavailable
          canvas.width = 595 * pdf2imgScale;
          canvas.height = 842 * pdf2imgScale;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        const blob = await new Promise((resolve) =>
          canvas.toBlob((b) => resolve(b), mimeType, 0.92)
        );
        // Free canvas memory immediately
        canvas.width = 0;
        canvas.height = 0;

        renderedFiles.push({
          name: `${baseName}-page-${String(pageNum).padStart(2, '0')}.${ext}`,
          blob
        });
      }

      if (pdfDoc && pdfDoc.destroy) {
        await pdfDoc.destroy();
      }

      if (renderedFiles.length === 1) {
        const single = renderedFiles[0];
        const url = URL.createObjectURL(single.blob);
        setResultDownload({
          url,
          filename: single.name,
          size: single.blob.size,
          type: 'image'
        });
        const a = document.createElement('a');
        a.href = url;
        a.download = single.name;
        a.click();
      } else {
        const zip = new window.JSZip();
        for (const item of renderedFiles) {
          zip.file(item.name, item.blob);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        const zipName = `${baseName}-images-${ext.toUpperCase()}.zip`;
        setResultDownload({
          url,
          filename: zipName,
          size: zipBlob.size,
          type: 'zip'
        });
        const a = document.createElement('a');
        a.href = url;
        a.download = zipName;
        a.click();
      }

      showToast(t.notifications.pdf2imgSuccess.replace('{count}', String(renderedFiles.length)));
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 7: ADD WATERMARK EXECUTION
   * ============================================================================
   */
  const executeAddWatermark = async () => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;

    const cleanText = wmText.trim();
    if (!cleanText) {
      setErrorBanner(t.toolControls.wmEmptyTextError);
      return;
    }

    let targetPagesZeroBased = [];
    if (wmTarget === 'all') {
      targetPagesZeroBased = Array.from({ length: primaryPdf.pageCount }, (_, i) => i);
    } else {
      const parsed = parsePageRanges(wmCustomRange, primaryPdf.pageCount);
      if (!parsed.valid) {
        const msgTemplate = t.toolControls[parsed.errorKey] || t.toolControls.splitRangeInvalid;
        setErrorBanner(msgTemplate.replace('{max}', String(primaryPdf.pageCount)));
        return;
      }
      targetPagesZeroBased = parsed.flatPages.map((p) => p - 1);
    }

    setErrorBanner(null);
    clearResultDownload();
    setIsProcessing(true);

    try {
      const { PDFDocument, StandardFonts, rgb, degrees } = window.PDFLib;
      const pdfDoc = await PDFDocument.load(primaryPdf.bytes);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const { r, g, b } = hexToRgbNormalized(wmColor);
      const sizeNum = Number(wmFontSize) || 40;
      const opacityNum = Math.min(1, Math.max(0.05, Number(wmOpacity) || 0.3));
      const angleNum = Number(wmRotation) || 0;

      for (const pageIdx of targetPagesZeroBased) {
        const page = pages[pageIdx];
        if (!page) continue;
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(cleanText, sizeNum);

        if (wmPosition === 'tiled') {
          const stepX = Math.max(180, textWidth + 90);
          const stepY = Math.max(150, sizeNum * 3.5);
          for (let x = 40; x < width; x += stepX) {
            for (let y = 60; y < height; y += stepY) {
              page.drawText(cleanText, {
                x,
                y,
                size: Math.max(14, Math.round(sizeNum * 0.65)),
                font,
                color: rgb(r, g, b),
                opacity: opacityNum,
                rotate: degrees(angleNum)
              });
            }
          }
        } else {
          let x = (width - textWidth) / 2;
          let y = height / 2;
          const pad = 48;

          if (wmPosition === 'top-left') {
            x = pad;
            y = height - pad - sizeNum;
          } else if (wmPosition === 'top-right') {
            x = Math.max(pad, width - textWidth - pad);
            y = height - pad - sizeNum;
          } else if (wmPosition === 'bottom-left') {
            x = pad;
            y = pad + sizeNum / 2;
          } else if (wmPosition === 'bottom-right') {
            x = Math.max(pad, width - textWidth - pad);
            y = pad + sizeNum / 2;
          } else {
            // Center
            x = width / 2 - (textWidth / 2) * Math.cos((angleNum * Math.PI) / 180);
            y = height / 2 - (textWidth / 2) * Math.sin((angleNum * Math.PI) / 180);
          }

          page.drawText(cleanText, {
            x,
            y,
            size: sizeNum,
            font,
            color: rgb(r, g, b),
            opacity: opacityNum,
            rotate: degrees(angleNum)
          });
        }
      }

      const outBytes = await pdfDoc.save();
      const blob = new Blob([outBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const baseName = primaryPdf.name.replace(/\.pdf$/i, '');
      const outName = `${baseName}-watermarked.pdf`;

      setResultDownload({
        url,
        filename: outName,
        size: outBytes.byteLength,
        type: 'pdf'
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      a.click();

      showToast(t.notifications.watermarkSuccess);
    } catch (err) {
      setErrorBanner(err.message || t.workspace.corruptError);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ============================================================================
   * TOOL 8: EXPORT PDF INFORMATION REPORT (JSON / TXT)
   * ============================================================================
   */
  const exportPdfInfoReport = (format = 'json') => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;

    const baseName = primaryPdf.name.replace(/\.pdf$/i, '');
    const reportObj = {
      generator: 'MoPDF — Premium PDF Toolkit',
      inspectedAt: new Date().toISOString(),
      file: {
        name: primaryPdf.name,
        sizeFormatted: formatBytes(primaryPdf.size),
        sizeBytes: primaryPdf.size,
        totalPages: primaryPdf.pageCount,
        encrypted: false
      },
      metadata: primaryPdf.metadata,
      pages: primaryPdf.pageDims
    };

    const content =
      format === 'json'
        ? JSON.stringify(reportObj, null, 2)
        : [
            '====================================================',
            'MoPDF — DOCUMENT INFORMATION REPORT',
            '====================================================',
            `File Name       : ${primaryPdf.name}`,
            `File Size       : ${formatBytes(primaryPdf.size)} (${primaryPdf.size.toLocaleString()} bytes)`,
            `Total Pages     : ${primaryPdf.pageCount}`,
            `Title           : ${primaryPdf.metadata.title || t.toolControls.infoNotSpecified}`,
            `Author          : ${primaryPdf.metadata.author || t.toolControls.infoNotSpecified}`,
            `Subject         : ${primaryPdf.metadata.subject || t.toolControls.infoNotSpecified}`,
            `Creator         : ${primaryPdf.metadata.creator || t.toolControls.infoNotSpecified}`,
            `Producer        : ${primaryPdf.metadata.producer || t.toolControls.infoNotSpecified}`,
            `Creation Date   : ${primaryPdf.metadata.creationDate || t.toolControls.infoNotSpecified}`,
            `Modified Date   : ${primaryPdf.metadata.modificationDate || t.toolControls.infoNotSpecified}`,
            '',
            '----------------------------------------------------',
            'PAGE DIMENSIONS',
            '----------------------------------------------------',
            ...primaryPdf.pageDims.map(
              (d) =>
                `Page ${d.pageNumber}: ${d.widthPt} x ${d.heightPt} pt (${d.widthMm} x ${d.heightMm} mm) | ${d.orientation} | Rotation: ${d.rotation}°`
            )
          ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}-info-report.${format}`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  /**
   * ============================================================================
   * TOOL LIST METADATA
   * ============================================================================
   */
  const TOOLS_LIST = useMemo(
    () => [
      { id: 'merge', icon: Files, badge: 'Multi-PDF' },
      { id: 'split', icon: Scissors, badge: 'Ranges / ZIP' },
      { id: 'organize', icon: LayoutGrid, badge: 'Drag & Reorder' },
      { id: 'rotate', icon: RotateCw, badge: '90° / 180° / 270°' },
      { id: 'img2pdf', icon: ImageIcon, badge: 'JPG • PNG • WebP' },
      { id: 'pdf2img', icon: FileImage, badge: 'PNG • JPEG • HD' },
      { id: 'watermark', icon: Stamp, badge: 'Live Preview' },
      { id: 'info', icon: Info, badge: 'Metadata & Sizes' }
    ],
    []
  );

  // Helpers for Organize & Rotate page manipulation
  const moveOrganizePage = (index, direction) => {
    setOrganizePages((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const rotateOrganizePage = (uid, deltaDegrees) => {
    setOrganizePages((prev) =>
      prev.map((p) =>
        p.uid === uid
          ? { ...p, rotation: (((p.rotation + deltaDegrees) % 360) + 360) % 360 }
          : p
      )
    );
  };

  const duplicateOrganizePage = (index) => {
    setOrganizePages((prev) => {
      const next = [...prev];
      const source = next[index];
      const clone = {
        ...source,
        uid: `page-dup-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      };
      next.splice(index + 1, 0, clone);
      return next;
    });
  };

  const deleteOrganizePage = (uid) => {
    if (organizePages.length <= 1) {
      setErrorBanner(t.toolControls.organizeMinPageWarn);
      return;
    }
    setOrganizePages((prev) => prev.filter((p) => p.uid !== uid));
  };

  const rotateBatchPages = (deltaDegrees, onlySelected = false) => {
    setOrganizePages((prev) =>
      prev.map((p) => {
        if (onlySelected && !selectedRotatePages.includes(p.uid)) return p;
        return {
          ...p,
          rotation: deltaDegrees === 0 ? 0 : (((p.rotation + deltaDegrees) % 360) + 360) % 360
        };
      })
    );
  };

  // Toggle split page selection from thumbnail click
  const toggleSplitPageNumber = (pageNum) => {
    const primaryPdf = pdfFiles[0];
    if (!primaryPdf) return;
    const parsed = parsePageRanges(splitRangeInput, primaryPdf.pageCount);
    const currentSet = new Set(parsed.valid ? parsed.flatPages : []);
    if (currentSet.has(pageNum)) {
      currentSet.delete(pageNum);
    } else {
      currentSet.add(pageNum);
    }
    const nextStr = pagesArrayToRangeString(Array.from(currentSet));
    setSplitRangeInput(nextStr);
    setErrorBanner(null);
  };

  const currentPrimaryPdf = pdfFiles[0] || null;
  const activeToolMeta = TOOLS_LIST.find((item) => item.id === activeTool) || TOOLS_LIST[0];
  const ActiveToolIcon = activeToolMeta.icon;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        theme === 'dark'
          ? 'bg-[#14161C] text-[#F4F4F6]'
          : 'bg-[#FAF8F9] text-[#18181B]'
      }`}
    >
      {/* Custom Liquid Glass Styles & Ambient Background Glows */}
      <style>{`
        :root {
          --mopdf-bright-red: #FF4D4F;
          --mopdf-primary-red: #E53935;
          --mopdf-crimson: #C62828;
          --mopdf-deep-red: #B91C1C;
          --mopdf-soft-rose: #FFF1F2;
        }
        .liquid-glass-light {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(229, 57, 53, 0.14);
          box-shadow: 0 12px 32px -8px rgba(20, 22, 28, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
        }
        .liquid-glass-dark {
          background: rgba(28, 31, 40, 0.82);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255, 77, 79, 0.18);
          box-shadow: 0 14px 36px -8px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.07);
        }
        .liquid-card-hover {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease;
        }
        .liquid-card-hover:hover {
          transform: translateY(-3px);
        }
        .red-gradient-btn {
          background: linear-gradient(135deg, #FF4D4F 0%, #E53935 55%, #C62828 100%);
          box-shadow: 0 8px 22px -4px rgba(229, 57, 53, 0.42), inset 0 1px 0 0 rgba(255, 255, 255, 0.3);
        }
        .red-gradient-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #FF6668 0%, #E53935 45%, #B91C1C 100%);
          box-shadow: 0 12px 26px -4px rgba(229, 57, 53, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .liquid-card-hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Ambient Non-Overwhelming Background Red Liquid Highlights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute -top-36 left-1/2 -translate-x-1/2 w-[780px] h-[360px] rounded-full blur-[120px] transition-opacity duration-500 ${
            theme === 'dark' ? 'bg-[#E53935]/15' : 'bg-[#FF4D4F]/12'
          }`}
        />
        <div
          className={`absolute top-[40%] -right-32 w-[420px] h-[420px] rounded-full blur-[130px] transition-opacity duration-500 ${
            theme === 'dark' ? 'bg-[#B91C1C]/10' : 'bg-[#FFF1F2]/90'
          }`}
        />
      </div>

      {/* ====================================================================
          A. STICKY FLOATING LIQUID GLASS NAVIGATION BAR
      ==================================================================== */}
      <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 pb-2">
        <nav
          aria-label="Main Navigation"
          className={`max-w-7xl mx-auto rounded-2xl px-3.5 sm:px-6 py-3 transition-all duration-300 ${
            theme === 'dark' ? 'liquid-glass-dark' : 'liquid-glass-light'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Brand Logo & Wordmark */}
            <div className="flex items-center gap-3 min-w-0">
              <a
                href="#top"
                className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl red-gradient-btn flex items-center justify-center text-white shadow-md shrink-0">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight">
                      Mo<span className="text-[#E53935]">PDF</span>
                    </span>
                    <span
                      className={`hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        theme === 'dark'
                          ? 'bg-[#E53935]/15 text-[#FF4D4F] border-[#FF4D4F]/30'
                          : 'bg-[#FFF1F2] text-[#C62828] border-[#E53935]/20'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {t.privacyBadge}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-none truncate ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    {t.brandSubtitle}
                  </p>
                </div>
              </a>
            </div>

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center gap-1">
              <a
                href="#tools-grid"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-200 hover:bg-white/10'
                    : 'text-zinc-700 hover:bg-[#FFF1F2] hover:text-[#C62828]'
                }`}
              >
                {t.nav.tools}
              </a>
              <a
                href="#workspace-section"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-200 hover:bg-white/10'
                    : 'text-zinc-700 hover:bg-[#FFF1F2] hover:text-[#C62828]'
                }`}
              >
                {t.nav.workspace}
              </a>
              <a
                href="#faq-section"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-zinc-200 hover:bg-white/10'
                    : 'text-zinc-700 hover:bg-[#FFF1F2] hover:text-[#C62828]'
                }`}
              >
                {t.nav.faq}
              </a>
            </div>

            {/* Right Controls: Sample Generator, Language (EN/ID), Theme Switch, GitHub, Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                disabled={!libsReady || isProcessing}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800/80 border-zinc-700 text-zinc-200 hover:border-[#FF4D4F] hover:text-white'
                    : 'bg-white/90 border-zinc-200 text-zinc-800 hover:border-[#E53935] hover:text-[#C62828]'
                } disabled:opacity-50`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
                <span>{t.nav.samplePdf}</span>
              </button>

              {/* Language Selector EN | ID */}
              <div
                role="group"
                aria-label={t.nav.languageLabel}
                className={`inline-flex items-center p-0.5 rounded-xl border ${
                  theme === 'dark'
                    ? 'bg-zinc-900/90 border-zinc-700/80'
                    : 'bg-zinc-100/90 border-zinc-200/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    lang === 'en'
                      ? 'bg-[#E53935] text-white shadow-sm'
                      : theme === 'dark'
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  aria-pressed={lang === 'en'}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    lang === 'id'
                      ? 'bg-[#E53935] text-white shadow-sm'
                      : theme === 'dark'
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  aria-pressed={lang === 'id'}
                >
                  ID
                </button>
              </div>

              {/* Light / Dark Theme Switch */}
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
                aria-label={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
                title={theme === 'light' ? t.nav.darkMode : t.nav.lightMode}
                className={`p-2.5 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800/80 border-zinc-700 text-amber-300 hover:border-[#FF4D4F]'
                    : 'bg-white/90 border-zinc-200 text-zinc-700 hover:border-[#E53935] hover:text-[#E53935]'
                }`}
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* GitHub Repository Link */}
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.nav.githubLabel}
                title={t.nav.githubLabel}
                className={`p-2.5 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800/80 border-zinc-700 text-zinc-200 hover:border-[#FF4D4F] hover:text-white'
                    : 'bg-white/90 border-zinc-200 text-zinc-700 hover:border-[#E53935] hover:text-[#E53935]'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle Menu"
                className={`lg:hidden p-2.5 rounded-xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-zinc-800/80 border-zinc-700 text-zinc-200'
                    : 'bg-white/90 border-zinc-200 text-zinc-700'
                }`}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Responsive Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className={`lg:hidden mt-3 pt-3 border-t flex flex-col gap-2 ${
                theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200/80'
              }`}
            >
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#tools-grid"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium text-center border ${
                    theme === 'dark'
                      ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  {t.nav.tools}
                </a>
                <a
                  href="#workspace-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium text-center border ${
                    theme === 'dark'
                      ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  {t.nav.workspace}
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLoadSample();
                }}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white'
                    : 'bg-white border-zinc-200 text-zinc-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#E53935]" />
                <span>{t.nav.samplePdf}</span>
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-md animate-bounce"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl ${
              theme === 'dark'
                ? 'bg-zinc-900/95 border-[#FF4D4F]/40 text-white'
                : 'bg-white/95 border-[#E53935]/30 text-zinc-900'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-[#E53935] shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 rounded-lg hover:bg-zinc-500/10"
              aria-label="Close Notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main id="top" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* ====================================================================
            B. HERO SECTION
        ==================================================================== */}
        <section className="pt-8 pb-10 sm:pt-12 sm:pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 border bg-[#FFF1F2]/90 text-[#C62828] border-[#E53935]/25 dark:bg-[#E53935]/15 dark:text-[#FF4D4F] dark:border-[#FF4D4F]/30">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
            <span className="block">{t.hero.titleStart}</span>
            <span className="block mt-1.5 sm:mt-2 bg-gradient-to-r from-[#FF4D4F] via-[#E53935] to-[#B91C1C] bg-clip-text text-transparent">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p
            className={`mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
            }`}
          >
            {t.hero.subtle}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#workspace-section"
              className="px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center gap-2 transition-transform active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>{t.hero.ctaExplore}</span>
            </a>

            <button
              type="button"
              onClick={handleLoadSample}
              disabled={!libsReady || isProcessing}
              className={`px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base inline-flex items-center gap-2 border transition-all ${
                theme === 'dark'
                  ? 'liquid-glass-dark text-zinc-100 hover:border-[#FF4D4F]'
                  : 'liquid-glass-light text-zinc-800 hover:border-[#E53935]'
              } disabled:opacity-50`}
            >
              <Sparkles className="w-4 h-4 text-[#E53935]" />
              <span>{t.hero.ctaSample}</span>
            </button>
          </div>

          {/* Trust & Privacy Pills */}
          <div
            className={`mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
              {t.hero.trust1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
              {t.hero.trust2}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
              {t.hero.trust3}
            </span>
          </div>
        </section>

        {/* ====================================================================
            C. PDF TOOLS DASHBOARD (8 LIQUID GLASS TOOL CARDS)
        ==================================================================== */}
        <section id="tools-grid" className="py-4 sm:py-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {t.dashboard.sectionTitle}
              </h2>
              <p
                className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {t.dashboard.sectionSubtitle}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  libsReady ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}>
                {libsReady ? t.workspace.engineReady : t.workspace.engineLoading}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS_LIST.map((toolItem) => {
              const IconComponent = toolItem.icon;
              const isSelected = activeTool === toolItem.id;
              const toolText = t.tools[toolItem.id];

              return (
                <button
                  key={toolItem.id}
                  type="button"
                  onClick={() => handleSelectTool(toolItem.id)}
                  className={`group text-left rounded-2xl p-5 flex flex-col justify-between h-full liquid-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] ${
                    theme === 'dark' ? 'liquid-glass-dark' : 'liquid-glass-light'
                  } ${
                    isSelected
                      ? 'ring-2 ring-[#E53935] border-[#E53935]'
                      : 'hover:border-[#E53935]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'red-gradient-btn text-white'
                            : theme === 'dark'
                            ? 'bg-[#E53935]/15 text-[#FF4D4F] group-hover:bg-[#E53935] group-hover:text-white'
                            : 'bg-[#FFF1F2] text-[#E53935] group-hover:bg-[#E53935] group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                          isSelected
                            ? 'bg-[#E53935] text-white border-[#E53935]'
                            : theme === 'dark'
                            ? 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
                            : 'bg-zinc-100 text-zinc-600 border-zinc-200/80'
                        }`}
                      >
                        {isSelected ? t.dashboard.activeLabel : toolItem.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold tracking-tight mb-1.5">
                      {toolText.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      {toolText.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-500/10 flex items-center justify-between text-xs font-bold text-[#E53935] dark:text-[#FF4D4F]">
                    <span>{t.dashboard.openTool}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            D. INTERACTIVE PDF WORKSPACE
        ==================================================================== */}
        <section
          id="workspace-section"
          ref={workspaceRef}
          className="mt-8 scroll-mt-24"
          aria-label="PDF Editing Workspace"
        >
          <div
            className={`rounded-3xl p-5 sm:p-8 transition-all ${
              theme === 'dark' ? 'liquid-glass-dark' : 'liquid-glass-light'
            }`}
          >
            {/* Workspace Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-500/15">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl red-gradient-btn flex items-center justify-center text-white shrink-0">
                  <ActiveToolIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {t.tools[activeTool].name}
                    </h2>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        theme === 'dark'
                          ? 'bg-[#E53935]/20 text-[#FF4D4F]'
                          : 'bg-[#FFF1F2] text-[#C62828]'
                      }`}
                    >
                      {activeToolMeta.badge}
                    </span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm mt-1 ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {t.tools[activeTool].instruction}
                  </p>
                </div>
              </div>

              {/* Workspace Quick Actions: Load Sample & Clear */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  disabled={!libsReady || isProcessing}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 border transition-all ${
                    theme === 'dark'
                      ? 'bg-zinc-800/90 border-zinc-700 text-zinc-100 hover:border-[#FF4D4F]'
                      : 'bg-white border-zinc-200 text-zinc-800 hover:border-[#E53935]'
                  } disabled:opacity-50`}
                >
                  <Sparkles className="w-4 h-4 text-[#E53935]" />
                  <span>
                    {activeTool === 'merge'
                      ? t.workspace.loadTwoSamplesBtn
                      : activeTool === 'img2pdf'
                      ? t.workspace.loadSampleImagesBtn
                      : t.workspace.loadSampleBtn}
                  </span>
                </button>

                {(pdfFiles.length > 0 || imageFiles.length > 0) && (
                  <button
                    type="button"
                    onClick={resetWorkspace}
                    className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 border transition-colors ${
                      theme === 'dark'
                        ? 'bg-red-950/40 border-red-800/50 text-red-300 hover:bg-red-900/50'
                        : 'bg-[#FFF1F2] border-[#E53935]/25 text-[#C62828] hover:bg-[#FFE4E6]'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.workspace.clearAllBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Error Alert Banner */}
            {(errorBanner || libsError) && (
              <div
                role="alert"
                className={`mt-5 p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                  theme === 'dark'
                    ? 'bg-red-950/60 border-[#FF4D4F]/50 text-red-200'
                    : 'bg-[#FFF1F2] border-[#E53935]/40 text-[#B91C1C]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">
                    {errorBanner || libsError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorBanner(null)}
                  className="p-1 rounded-lg hover:bg-black/10 shrink-0"
                  aria-label="Dismiss Error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Drag-and-Drop File Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDraggingOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDraggingOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDraggingOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleFilesSelected(e.dataTransfer.files);
                }
              }}
              className={`mt-6 rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all ${
                isDraggingOver
                  ? 'border-[#E53935] bg-[#E53935]/10 scale-[1.01]'
                  : theme === 'dark'
                  ? 'border-zinc-700/80 bg-zinc-900/40 hover:border-[#FF4D4F]/60'
                  : 'border-[#E53935]/30 bg-white/60 hover:border-[#E53935]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple={activeTool === 'merge' || activeTool === 'img2pdf'}
                accept={
                  activeTool === 'img2pdf'
                    ? 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp'
                    : 'application/pdf,.pdf'
                }
                onChange={(e) => handleFilesSelected(e.target.files)}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-[#FFF1F2] text-[#E53935] dark:bg-[#E53935]/15 dark:text-[#FF4D4F]">
                <Upload className="w-7 h-7" />
              </div>

              <h3 className="text-base sm:text-lg font-bold">
                {activeTool === 'img2pdf'
                  ? t.workspace.dropTitleImg
                  : activeTool === 'merge'
                  ? t.workspace.dropTitlePdf
                  : t.workspace.dropTitleSinglePdf}
              </h3>
              <p
                className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {activeTool === 'img2pdf' ? t.workspace.dropSubImg : t.workspace.dropSubPdf}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  disabled={!libsReady || isProcessing}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white red-gradient-btn inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>
                    {(activeTool === 'merge' && pdfFiles.length > 0) ||
                    (activeTool === 'img2pdf' && imageFiles.length > 0)
                      ? t.workspace.addMoreFilesBtn
                      : t.workspace.selectFilesBtn}
                  </span>
                </button>
              </div>
            </div>

            {/* Loading / Rendering Feedback Indicator */}
            {(isProcessing || isRenderingThumbs) && (
              <div
                className={`mt-6 p-4 rounded-2xl border flex items-center justify-center gap-3 ${
                  theme === 'dark'
                    ? 'bg-zinc-900/80 border-zinc-800 text-zinc-200'
                    : 'bg-[#FFF1F2]/70 border-[#E53935]/20 text-zinc-800'
                }`}
              >
                <Loader2 className="w-5 h-5 text-[#E53935] animate-spin shrink-0" />
                <span className="text-sm font-semibold">
                  {isRenderingThumbs ? t.workspace.renderingPreviews : t.workspace.processing}
                </span>
              </div>
            )}

            {/* Download Result Banner when Ready */}
            {resultDownload && (
              <div
                className={`mt-6 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  theme === 'dark'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : 'bg-emerald-50/90 border-emerald-500/30 text-emerald-950'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{t.workspace.readyToDownload}</p>
                    <p className="text-xs opacity-80 truncate">
                      {resultDownload.filename} • {formatBytes(resultDownload.size)}
                    </p>
                  </div>
                </div>

                <a
                  href={resultDownload.url}
                  download={resultDownload.filename}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white red-gradient-btn inline-flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {resultDownload.type === 'zip'
                      ? t.workspace.downloadZip
                      : t.workspace.downloadResult}
                  </span>
                </a>
              </div>
            )}

            {/* ================================================================
                TOOL-SPECIFIC WORKSPACE INTERFACES
            ================================================================ */}

            {/* Empty State when no files are loaded */}
            {((activeTool === 'img2pdf' && imageFiles.length === 0) ||
              (activeTool !== 'img2pdf' && pdfFiles.length === 0)) &&
              !isProcessing && (
                <div
                  className={`mt-6 rounded-2xl p-8 text-center border ${
                    theme === 'dark'
                      ? 'bg-zinc-900/30 border-zinc-800/80 text-zinc-400'
                      : 'bg-zinc-50/70 border-zinc-200/70 text-zinc-500'
                  }`}
                >
                  <FileText className="w-10 h-10 mx-auto mb-2.5 opacity-40 text-[#E53935]" />
                  <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                    {t.workspace.emptyWorkspaceTitle}
                  </p>
                  <p className="text-xs sm:text-sm mt-1 max-w-md mx-auto">
                    {t.workspace.emptyWorkspaceDesc}
                  </p>
                </div>
              )}

            {/* ----------------------------------------------------------------
                TOOL 1: MERGE PDF INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'merge' && pdfFiles.length > 0 && (
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold">
                    {t.toolControls.mergeSummary
                      .replace('{files}', String(pdfFiles.length))
                      .replace(
                        '{pages}',
                        String(pdfFiles.reduce((acc, f) => acc + f.pageCount, 0))
                      )}
                  </span>
                </div>

                <div className="space-y-3">
                  {pdfFiles.map((fileItem, idx) => (
                    <div
                      key={fileItem.id}
                      draggable
                      onDragStart={() => setDraggedIndex(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedIndex === null || draggedIndex === idx) return;
                        setPdfFiles((prev) => {
                          const copy = [...prev];
                          const [moved] = copy.splice(draggedIndex, 1);
                          copy.splice(idx, 0, moved);
                          return copy;
                        });
                        setDraggedIndex(null);
                      }}
                      className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                        theme === 'dark'
                          ? 'bg-zinc-900/70 border-zinc-800 hover:border-[#FF4D4F]/40'
                          : 'bg-white/90 border-zinc-200/90 hover:border-[#E53935]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-[#E53935] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {fileItem.thumbnails[0] && (
                          <img
                            src={fileItem.thumbnails[0]}
                            alt={fileItem.name}
                            className="w-11 h-14 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700 shrink-0 bg-white"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold break-all line-clamp-1">
                            {fileItem.name}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                            }`}
                          >
                            {fileItem.pageCount} {t.workspace.pagesCount} •{' '}
                            {formatBytes(fileItem.size)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (idx === 0) return;
                            setPdfFiles((prev) => {
                              const copy = [...prev];
                              const temp = copy[idx - 1];
                              copy[idx - 1] = copy[idx];
                              copy[idx] = temp;
                              return copy;
                            });
                          }}
                          disabled={idx === 0}
                          title={t.workspace.moveUp}
                          aria-label={t.workspace.moveUp}
                          className={`p-2 rounded-xl border transition-colors disabled:opacity-30 ${
                            theme === 'dark'
                              ? 'border-zinc-700 hover:bg-zinc-800'
                              : 'border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (idx === pdfFiles.length - 1) return;
                            setPdfFiles((prev) => {
                              const copy = [...prev];
                              const temp = copy[idx + 1];
                              copy[idx + 1] = copy[idx];
                              copy[idx] = temp;
                              return copy;
                            });
                          }}
                          disabled={idx === pdfFiles.length - 1}
                          title={t.workspace.moveDown}
                          aria-label={t.workspace.moveDown}
                          className={`p-2 rounded-xl border transition-colors disabled:opacity-30 ${
                            theme === 'dark'
                              ? 'border-zinc-700 hover:bg-zinc-800'
                              : 'border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPdfFiles((prev) => prev.filter((item) => item.id !== fileItem.id))
                          }
                          title={t.workspace.removeFile}
                          aria-label={t.workspace.removeFile}
                          className="p-2 rounded-xl border border-red-500/30 text-[#E53935] hover:bg-[#FFF1F2] dark:hover:bg-red-950/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={executeMergePdf}
                    disabled={pdfFiles.length < 2 || isProcessing}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Files className="w-5 h-5" />
                    <span>{t.toolControls.mergeBtn}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 2: SPLIT PDF INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'split' && currentPrimaryPdf && (
              <div className="mt-6 space-y-6">
                {/* Selected File Info Bar */}
                <div
                  className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-[#FFF1F2]/60 border-[#E53935]/20'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-5 h-5 text-[#E53935] shrink-0" />
                    <span className="font-bold text-sm truncate">{currentPrimaryPdf.name}</span>
                  </div>
                  <div className="text-xs font-semibold flex items-center gap-3">
                    <span>
                      {t.workspace.totalPages}: <strong>{currentPrimaryPdf.pageCount}</strong>
                    </span>
                    <span>•</span>
                    <span>{formatBytes(currentPrimaryPdf.size)}</span>
                  </div>
                </div>

                {/* Split Controls Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border ${
                      theme === 'dark'
                        ? 'bg-zinc-900/50 border-zinc-800'
                        : 'bg-white/80 border-zinc-200/80'
                    }`}
                  >
                    <label className="block text-sm font-bold mb-2">
                      {t.toolControls.splitRangeLabel}
                    </label>
                    <input
                      type="text"
                      value={splitRangeInput}
                      onChange={(e) => {
                        setSplitRangeInput(e.target.value);
                        setErrorBanner(null);
                      }}
                      placeholder={t.toolControls.splitRangePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E53935] ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                    <p
                      className={`text-xs mt-2 ${
                        theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      {t.toolControls.splitRangeHint.replace(
                        '{max}',
                        String(currentPrimaryPdf.pageCount)
                      )}
                    </p>

                    {/* Quick Page Selection Pills */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSplitRangeInput(`1-${currentPrimaryPdf.pageCount}`)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#E53935]/30 text-[#E53935] hover:bg-[#FFF1F2] dark:hover:bg-zinc-800"
                      >
                        {t.toolControls.splitSelectAll}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const odds = Array.from(
                            { length: currentPrimaryPdf.pageCount },
                            (_, i) => i + 1
                          ).filter((n) => n % 2 === 1);
                          setSplitRangeInput( odds.join(', ') );
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-zinc-500/30 hover:bg-zinc-500/10"
                      >
                        {t.toolControls.splitSelectOdd}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const evens = Array.from(
                            { length: currentPrimaryPdf.pageCount },
                            (_, i) => i + 1
                          ).filter((n) => n % 2 === 0);
                          if (evens.length > 0) setSplitRangeInput(evens.join(', '));
                        }}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-zinc-500/30 hover:bg-zinc-500/10"
                      >
                        {t.toolControls.splitSelectEven}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSplitRangeInput('')}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-zinc-500/30 hover:bg-zinc-500/10"
                      >
                        {t.toolControls.splitClearSelection}
                      </button>
                    </div>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                      theme === 'dark'
                        ? 'bg-zinc-900/50 border-zinc-800'
                        : 'bg-white/80 border-zinc-200/80'
                    }`}
                  >
                    <div>
                      <label className="block text-sm font-bold mb-2.5">
                        {t.toolControls.splitModeLabel}
                      </label>
                      <div className="space-y-2.5">
                        <label className="flex items-center gap-3 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="splitMode"
                            checked={splitMode === 'merge'}
                            onChange={() => setSplitMode('merge')}
                            className="accent-[#E53935] w-4 h-4"
                          />
                          <span>{t.toolControls.splitModeMerge}</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="splitMode"
                            checked={splitMode === 'zip'}
                            onChange={() => setSplitMode('zip')}
                            className="accent-[#E53935] w-4 h-4"
                          />
                          <span>{t.toolControls.splitModeZip}</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={executeSplitPdf}
                      disabled={isProcessing}
                      className="mt-5 w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center justify-center gap-2"
                    >
                      <Scissors className="w-5 h-5" />
                      <span>{t.toolControls.splitBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Page Thumbnails Grid for Split Selection */}
                {(() => {
                  const parsed = parsePageRanges(splitRangeInput, currentPrimaryPdf.pageCount);
                  const activeSet = new Set(parsed.valid ? parsed.flatPages : []);
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                      {currentPrimaryPdf.thumbnails.map((thumb, idx) => {
                        const pageNum = idx + 1;
                        const isChecked = activeSet.has(pageNum);
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => toggleSplitPageNumber(pageNum)}
                            className={`group relative rounded-2xl p-2.5 border text-left transition-all ${
                              isChecked
                                ? 'ring-2 ring-[#E53935] border-[#E53935] bg-[#FFF1F2]/60 dark:bg-[#E53935]/15'
                                : theme === 'dark'
                                ? 'bg-zinc-900/60 border-zinc-800 opacity-70 hover:opacity-100'
                                : 'bg-white border-zinc-200 opacity-75 hover:opacity-100'
                            }`}
                          >
                            <div className="relative aspect-[1/1.4] rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                              <img
                                src={thumb}
                                alt={`${t.workspace.pageLabel} ${pageNum}`}
                                className="w-full h-full object-contain"
                              />
                              <div
                                className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow ${
                                  isChecked
                                    ? 'bg-[#E53935] text-white'
                                    : 'bg-zinc-900/60 text-white'
                                }`}
                              >
                                {isChecked ? <Check className="w-3.5 h-3.5" /> : pageNum}
                              </div>
                            </div>
                            <p className="mt-2 text-center text-xs font-bold">
                              {t.workspace.pageLabel} {pageNum}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 3: ORGANIZE PDF INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'organize' && currentPrimaryPdf && (
              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {t.toolControls.organizeOrderHint}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => syncSinglePdfStates(currentPrimaryPdf)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border inline-flex items-center gap-1.5 ${
                        theme === 'dark'
                          ? 'border-zinc-700 hover:bg-zinc-800'
                          : 'border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.toolControls.organizeResetBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => executeExportOrganizedOrRotatedPdf('organize')}
                      disabled={isProcessing}
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white red-gradient-btn inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.toolControls.organizeBtn}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {organizePages.map((pageItem, idx) => (
                    <div
                      key={pageItem.uid}
                      draggable
                      onDragStart={() => setDraggedIndex(idx)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedIndex === null || draggedIndex === idx) return;
                        setOrganizePages((prev) => {
                          const next = [...prev];
                          const [moved] = next.splice(draggedIndex, 1);
                          next.splice(idx, 0, moved);
                          return next;
                        });
                        setDraggedIndex(null);
                      }}
                      className={`rounded-2xl p-3.5 border flex flex-col justify-between transition-all ${
                        theme === 'dark'
                          ? 'bg-zinc-900/70 border-zinc-800 hover:border-[#FF4D4F]/50'
                          : 'bg-white border-zinc-200 hover:border-[#E53935]/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#E53935] text-white">
                            #{idx + 1}
                          </span>
                          <span
                            className={`text-[11px] font-semibold ${
                              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                            }`}
                          >
                            Orig. P{pageItem.pageNumber} • {pageItem.rotation}°
                          </span>
                        </div>

                        <div className="aspect-[1/1.35] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-2">
                          {pageItem.thumbnail && (
                            <img
                              src={pageItem.thumbnail}
                              alt={`Page ${pageItem.pageNumber}`}
                              style={{ transform: `rotate(${pageItem.rotation}deg)` }}
                              className="max-w-full max-h-full object-contain transition-transform duration-200"
                            />
                          )}
                        </div>
                      </div>

                      {/* Accessible Page Action Controls */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-500/10 flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => moveOrganizePage(idx, -1)}
                          disabled={idx === 0}
                          title={t.workspace.moveLeft}
                          aria-label={t.workspace.moveLeft}
                          className="p-1.5 rounded-lg border border-zinc-500/20 hover:bg-zinc-500/10 disabled:opacity-30"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveOrganizePage(idx, 1)}
                          disabled={idx === organizePages.length - 1}
                          title={t.workspace.moveRight}
                          aria-label={t.workspace.moveRight}
                          className="p-1.5 rounded-lg border border-zinc-500/20 hover:bg-zinc-500/10 disabled:opacity-30"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => rotateOrganizePage(pageItem.uid, 90)}
                          title={t.workspace.rotateCw}
                          aria-label={t.workspace.rotateCw}
                          className="p-1.5 rounded-lg border border-zinc-500/20 hover:bg-zinc-500/10"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateOrganizePage(idx)}
                          title={t.workspace.duplicatePage}
                          aria-label={t.workspace.duplicatePage}
                          className="p-1.5 rounded-lg border border-zinc-500/20 hover:bg-zinc-500/10"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteOrganizePage(pageItem.uid)}
                          title={t.workspace.deletePage}
                          aria-label={t.workspace.deletePage}
                          className="p-1.5 rounded-lg border border-red-500/30 text-[#E53935] hover:bg-[#FFF1F2] dark:hover:bg-red-950/40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 4: ROTATE PDF INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'rotate' && currentPrimaryPdf && (
              <div className="mt-6 space-y-6">
                {/* Batch Rotation Controls */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-white/90 border-zinc-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold mr-2">{t.toolControls.rotateAllTitle}:</span>
                    <button
                      type="button"
                      onClick={() => rotateBatchPages(90, false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E53935]/30 text-[#E53935] hover:bg-[#FFF1F2] dark:hover:bg-zinc-800 inline-flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{t.toolControls.rotateAll90}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateBatchPages(180, false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-500/30 hover:bg-zinc-500/10 inline-flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.toolControls.rotateAll180}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateBatchPages(270, false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-500/30 hover:bg-zinc-500/10 inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.toolControls.rotateAll270}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => rotateBatchPages(0, false)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-500/20 hover:bg-zinc-500/10"
                    >
                      {t.workspace.resetRotation}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => executeExportOrganizedOrRotatedPdf('rotate')}
                    disabled={isProcessing}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-white red-gradient-btn inline-flex items-center justify-center gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.toolControls.rotateSaveBtn}</span>
                  </button>
                </div>

                {/* Individual Page Rotation Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {organizePages.map((pageItem) => (
                    <div
                      key={pageItem.uid}
                      className={`rounded-2xl p-4 border flex flex-col justify-between ${
                        theme === 'dark'
                          ? 'bg-zinc-900/70 border-zinc-800'
                          : 'bg-white border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold">
                          {t.workspace.pageLabel} {pageItem.pageNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF1F2] text-[#C62828] dark:bg-[#E53935]/20 dark:text-[#FF4D4F]">
                          {pageItem.rotation}°
                        </span>
                      </div>

                      <div className="aspect-[1/1.3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-3">
                        {pageItem.thumbnail && (
                          <img
                            src={pageItem.thumbnail}
                            alt={`Page ${pageItem.pageNumber}`}
                            style={{ transform: `rotate(${pageItem.rotation}deg)` }}
                            className="max-w-full max-h-full object-contain transition-transform duration-200"
                          />
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => rotateOrganizePage(pageItem.uid, 90)}
                          className="py-1.5 px-2 rounded-lg text-xs font-bold border border-zinc-500/25 hover:border-[#E53935] hover:text-[#E53935] flex items-center justify-center gap-1"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>+90°</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => rotateOrganizePage(pageItem.uid, 180)}
                          className="py-1.5 px-2 rounded-lg text-xs font-bold border border-zinc-500/25 hover:border-[#E53935] hover:text-[#E53935]"
                        >
                          180°
                        </button>
                        <button
                          type="button"
                          onClick={() => rotateOrganizePage(pageItem.uid, 270)}
                          className="py-1.5 px-2 rounded-lg text-xs font-bold border border-zinc-500/25 hover:border-[#E53935] hover:text-[#E53935] flex items-center justify-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>270°</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 5: IMAGES TO PDF INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'img2pdf' && imageFiles.length > 0 && (
              <div className="mt-6 space-y-6">
                {/* Page Layout Options */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-white/90 border-zinc-200'
                  }`}
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.imgPageSize}
                    </label>
                    <select
                      value={imgPageSize}
                      onChange={(e) => setImgPageSize(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="A4">{t.toolControls.imgSizeA4}</option>
                      <option value="Letter">{t.toolControls.imgSizeLetter}</option>
                      <option value="Fit">{t.toolControls.imgSizeFit}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.imgOrientation}
                    </label>
                    <select
                      value={imgOrientation}
                      onChange={(e) => setImgOrientation(e.target.value)}
                      disabled={imgPageSize === 'Fit'}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium disabled:opacity-50 ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="portrait">{t.toolControls.imgPortrait}</option>
                      <option value="landscape">{t.toolControls.imgLandscape}</option>
                      <option value="auto">{t.toolControls.imgAutoOrient}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.imgMargin}
                    </label>
                    <select
                      value={imgMargin}
                      onChange={(e) => setImgMargin(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="none">{t.toolControls.imgMarginNone}</option>
                      <option value="small">{t.toolControls.imgMarginSmall}</option>
                      <option value="large">{t.toolControls.imgMarginLarge}</option>
                    </select>
                  </div>
                </div>

                {/* Uploaded Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imageFiles.map((imgItem, idx) => (
                    <div
                      key={imgItem.id}
                      className={`rounded-2xl p-3.5 border flex flex-col justify-between ${
                        theme === 'dark'
                          ? 'bg-zinc-900/70 border-zinc-800'
                          : 'bg-white border-zinc-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#E53935] text-white">
                            #{idx + 1}
                          </span>
                          <span className="text-[11px] opacity-75">
                            {imgItem.width}×{imgItem.height}px
                          </span>
                        </div>
                        <div className="aspect-video rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                          <img
                            src={imgItem.dataUrl}
                            alt={imgItem.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="mt-2 text-xs font-bold truncate" title={imgItem.name}>
                          {imgItem.name}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-zinc-500/10 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (idx === 0) return;
                              setImageFiles((prev) => {
                                const next = [...prev];
                                const temp = next[idx - 1];
                                next[idx - 1] = next[idx];
                                next[idx] = temp;
                                return next;
                              });
                            }}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg border border-zinc-500/20 disabled:opacity-30"
                            aria-label={t.workspace.moveLeft}
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (idx === imageFiles.length - 1) return;
                              setImageFiles((prev) => {
                                const next = [...prev];
                                const temp = next[idx + 1];
                                next[idx + 1] = next[idx];
                                next[idx] = temp;
                                return next;
                              });
                            }}
                            disabled={idx === imageFiles.length - 1}
                            className="p-1.5 rounded-lg border border-zinc-500/20 disabled:opacity-30"
                            aria-label={t.workspace.moveRight}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setImageFiles((prev) => prev.filter((item) => item.id !== imgItem.id))
                          }
                          className="p-1.5 rounded-lg border border-red-500/30 text-[#E53935]"
                          aria-label={t.workspace.removeFile}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={executeImagesToPdf}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span>{t.toolControls.imgConvertBtn}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 6: PDF TO IMAGES INTERFACE
            ---------------------------------------------------------------- */}
            {activeTool === 'pdf2img' && currentPrimaryPdf && (
              <div className="mt-6 space-y-6">
                <div
                  className={`p-4 sm:p-5 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-white/90 border-zinc-200'
                  }`}
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.pdf2imgFormat}
                    </label>
                    <select
                      value={pdf2imgFormat}
                      onChange={(e) => setPdf2imgFormat(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="png">{t.toolControls.pdf2imgFormatPng}</option>
                      <option value="jpeg">{t.toolControls.pdf2imgFormatJpg}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.pdf2imgScale}
                    </label>
                    <select
                      value={pdf2imgScale}
                      onChange={(e) => setPdf2imgScale(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value={1}>{t.toolControls.pdf2imgScale1}</option>
                      <option value={2}>{t.toolControls.pdf2imgScale2}</option>
                      <option value={3}>{t.toolControls.pdf2imgScale3}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
                      {t.toolControls.pdf2imgPages}
                    </label>
                    <select
                      value={pdf2imgScope}
                      onChange={(e) => setPdf2imgScope(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="all">{t.toolControls.pdf2imgAllPages}</option>
                      <option value="selected">{t.toolControls.pdf2imgSelectedPages}</option>
                    </select>
                  </div>
                </div>

                {/* Page Selection Grid for PDF to Images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {currentPrimaryPdf.thumbnails.map((thumb, idx) => {
                    const pageNum = idx + 1;
                    const isSelected =
                      pdf2imgScope === 'all' || selectedExportPages.includes(pageNum);

                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          if (pdf2imgScope === 'all') setPdf2imgScope('selected');
                          setSelectedExportPages((prev) =>
                            prev.includes(pageNum)
                              ? prev.filter((p) => p !== pageNum)
                              : [...prev, pageNum]
                          );
                        }}
                        className={`rounded-2xl p-2.5 border text-left transition-all ${
                          isSelected
                            ? 'ring-2 ring-[#E53935] border-[#E53935] bg-[#FFF1F2]/60 dark:bg-[#E53935]/15'
                            : theme === 'dark'
                            ? 'bg-zinc-900/50 border-zinc-800 opacity-60'
                            : 'bg-white border-zinc-200 opacity-65'
                        }`}
                      >
                        <div className="relative aspect-[1/1.4] rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-700">
                          <img
                            src={thumb}
                            alt={`Page ${pageNum}`}
                            className="w-full h-full object-contain"
                          />
                          <div
                            className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-[#E53935] text-white' : 'bg-zinc-800/70 text-white'
                            }`}
                          >
                            {isSelected ? <Check className="w-3.5 h-3.5" /> : pageNum}
                          </div>
                        </div>
                        <p className="mt-2 text-center text-xs font-bold">
                          {t.workspace.pageLabel} {pageNum}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={executePdfToImages}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center justify-center gap-2"
                  >
                    <FileImage className="w-5 h-5" />
                    <span>{t.toolControls.pdf2imgExportBtn}</span>
                  </button>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 7: ADD WATERMARK INTERFACE (WITH LIVE VISUAL PREVIEW)
            ---------------------------------------------------------------- */}
            {activeTool === 'watermark' && currentPrimaryPdf && (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Watermark Configuration Controls */}
                <div
                  className={`lg:col-span-7 p-5 rounded-2xl border space-y-4 ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-white/90 border-zinc-200'
                  }`}
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                      {t.toolControls.wmTextLabel}
                    </label>
                    <input
                      type="text"
                      value={wmText}
                      onChange={(e) => setWmText(e.target.value)}
                      placeholder={t.toolControls.wmTextPlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E53935] ${
                        theme === 'dark'
                          ? 'bg-zinc-950 border-zinc-700 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        {t.toolControls.wmFontSize}: <span className="text-[#E53935]">{wmFontSize}pt</span>
                      </label>
                      <input
                        type="range"
                        min={16}
                        max={88}
                        value={wmFontSize}
                        onChange={(e) => setWmFontSize(Number(e.target.value))}
                        className="w-full accent-[#E53935]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">
                        {t.toolControls.wmOpacity}:{' '}
                        <span className="text-[#E53935]">{Math.round(wmOpacity * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min={0.08}
                        max={1}
                        step={0.02}
                        value={wmOpacity}
                        onChange={(e) => setWmOpacity(Number(e.target.value))}
                        className="w-full accent-[#E53935]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">
                        {t.toolControls.wmRotation}: <span className="text-[#E53935]">{wmRotation}°</span>
                      </label>
                      <input
                        type="range"
                        min={-90}
                        max={90}
                        step={5}
                        value={wmRotation}
                        onChange={(e) => setWmRotation(Number(e.target.value))}
                        className="w-full accent-[#E53935]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                        {t.toolControls.wmColor}
                      </label>
                      <div className="flex items-center gap-2">
                        {[
                          '#E53935',
                          '#B91C1C',
                          '#14161C',
                          '#64748B',
                          '#0F766E'
                        ].map((hex) => (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => setWmColor(hex)}
                            style={{ backgroundColor: hex }}
                            className={`w-8 h-8 rounded-xl border-2 transition-transform ${
                              wmColor === hex
                                ? 'scale-110 border-white ring-2 ring-[#E53935]'
                                : 'border-transparent opacity-80 hover:opacity-100'
                            }`}
                            aria-label={`Color ${hex}`}
                          />
                        ))}
                        <input
                          type="color"
                          value={wmColor}
                          onChange={(e) => setWmColor(e.target.value)}
                          className="w-9 h-9 rounded-lg cursor-pointer bg-transparent"
                          aria-label={t.toolControls.wmColor}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                        {t.toolControls.wmPosition}
                      </label>
                      <select
                        value={wmPosition}
                        onChange={(e) => setWmPosition(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-zinc-950 border-zinc-700 text-white'
                            : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      >
                        <option value="center">{t.toolControls.wmPosCenter}</option>
                        <option value="tiled">{t.toolControls.wmPosTiled}</option>
                        <option value="top-left">{t.toolControls.wmPosTopLeft}</option>
                        <option value="top-right">{t.toolControls.wmPosTopRight}</option>
                        <option value="bottom-left">{t.toolControls.wmPosBottomLeft}</option>
                        <option value="bottom-right">{t.toolControls.wmPosBottomRight}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                        {t.toolControls.wmPagesTarget}
                      </label>
                      <select
                        value={wmTarget}
                        onChange={(e) => setWmTarget(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                          theme === 'dark'
                            ? 'bg-zinc-950 border-zinc-700 text-white'
                            : 'bg-white border-zinc-300 text-zinc-900'
                        }`}
                      >
                        <option value="all">{t.toolControls.wmTargetAll}</option>
                        <option value="custom">{t.toolControls.wmTargetCustom}</option>
                      </select>
                    </div>

                    {wmTarget === 'custom' && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                          {t.toolControls.splitRangeLabel}
                        </label>
                        <input
                          type="text"
                          value={wmCustomRange}
                          onChange={(e) => setWmCustomRange(e.target.value)}
                          placeholder="1-3"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border-zinc-700 text-white'
                              : 'bg-white border-zinc-300 text-zinc-900'
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={executeAddWatermark}
                      disabled={isProcessing}
                      className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white red-gradient-btn inline-flex items-center justify-center gap-2"
                    >
                      <Stamp className="w-5 h-5" />
                      <span>{t.toolControls.wmApplyBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Live Watermark Visual Preview */}
                <div
                  className={`lg:col-span-5 p-5 rounded-2xl border flex flex-col items-center justify-between ${
                    theme === 'dark'
                      ? 'bg-zinc-900/60 border-zinc-800'
                      : 'bg-white/90 border-zinc-200'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-3 self-start opacity-80">
                    {t.toolControls.wmLivePreview}
                  </p>

                  <div className="relative w-full max-w-[290px] aspect-[1/1.414] rounded-xl overflow-hidden bg-white shadow-lg border border-zinc-300 dark:border-zinc-700 flex items-center justify-center select-none">
                    {currentPrimaryPdf.thumbnails[0] && (
                      <img
                        src={currentPrimaryPdf.thumbnails[0]}
                        alt="Watermark Preview"
                        className="w-full h-full object-contain"
                      />
                    )}

                    {/* Dynamic Live Overlay */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center p-4">
                      {wmPosition === 'tiled' ? (
                        <div className="grid grid-cols-2 gap-6 w-full h-full place-items-center">
                          {Array.from({ length: 6 }).map((_, idx) => (
                            <span
                              key={idx}
                              style={{
                                color: wmColor,
                                opacity: wmOpacity,
                                transform: `rotate(${wmRotation}deg)`,
                                fontSize: `${Math.max(10, Math.round(wmFontSize * 0.28))}px`
                              }}
                              className="font-extrabold whitespace-nowrap tracking-wider"
                            >
                              {wmText || 'WATERMARK'}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`w-full h-full flex ${
                            wmPosition === 'top-left'
                              ? 'items-start justify-start'
                              : wmPosition === 'top-right'
                              ? 'items-start justify-end'
                              : wmPosition === 'bottom-left'
                              ? 'items-end justify-start'
                              : wmPosition === 'bottom-right'
                              ? 'items-end justify-end'
                              : 'items-center justify-center'
                          }`}
                        >
                          <span
                            style={{
                              color: wmColor,
                              opacity: wmOpacity,
                              transform: `rotate(${wmRotation}deg)`,
                              fontSize: `${Math.max(12, Math.round(wmFontSize * 0.42))}px`
                            }}
                            className="font-extrabold whitespace-nowrap tracking-wide"
                          >
                            {wmText || 'WATERMARK'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] mt-3 opacity-70 text-center">
                    {currentPrimaryPdf.name} ({currentPrimaryPdf.pageCount}{' '}
                    {t.workspace.pagesCount})
                  </p>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------
                TOOL 8: PDF INFORMATION & METADATA INSPECTOR
            ---------------------------------------------------------------- */}
            {activeTool === 'info' && currentPrimaryPdf && (
              <div className="mt-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold">
                    {t.toolControls.infoDocProps}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => exportPdfInfoReport('json')}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E53935]/30 text-[#E53935] hover:bg-[#FFF1F2] dark:hover:bg-zinc-800 inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.workspace.downloadJson}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => exportPdfInfoReport('txt')}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-500/30 hover:bg-zinc-500/10 inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t.workspace.downloadTxt}</span>
                    </button>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    { label: t.toolControls.infoFieldFileName, value: currentPrimaryPdf.name },
                    {
                      label: t.toolControls.infoFieldExactSize,
                      value: `${formatBytes(currentPrimaryPdf.size)} (${currentPrimaryPdf.size.toLocaleString()} bytes)`
                    },
                    {
                      label: t.workspace.totalPages,
                      value: String(currentPrimaryPdf.pageCount)
                    },
                    {
                      label: t.toolControls.infoFieldEncrypted,
                      value: t.toolControls.infoNotEncrypted
                    },
                    {
                      label: t.toolControls.infoFieldTitle,
                      value: currentPrimaryPdf.metadata.title
                    },
                    {
                      label: t.toolControls.infoFieldAuthor,
                      value: currentPrimaryPdf.metadata.author
                    },
                    {
                      label: t.toolControls.infoFieldSubject,
                      value: currentPrimaryPdf.metadata.subject
                    },
                    {
                      label: t.toolControls.infoFieldCreator,
                      value: currentPrimaryPdf.metadata.creator
                    },
                    {
                      label: t.toolControls.infoFieldProducer,
                      value: currentPrimaryPdf.metadata.producer
                    },
                    {
                      label: t.toolControls.infoFieldKeywords,
                      value: currentPrimaryPdf.metadata.keywords
                    },
                    {
                      label: t.toolControls.infoFieldCreated,
                      value: currentPrimaryPdf.metadata.creationDate
                    },
                    {
                      label: t.toolControls.infoFieldModified,
                      value: currentPrimaryPdf.metadata.modificationDate
                    }
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                        theme === 'dark'
                          ? 'bg-zinc-900/60 border-zinc-800'
                          : 'bg-white/90 border-zinc-200/80'
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {row.label}
                      </span>
                      <span
                        className={`text-sm font-bold mt-1 break-all ${
                          row.value
                            ? ''
                            : theme === 'dark'
                            ? 'text-zinc-500 italic font-normal'
                            : 'text-zinc-400 italic font-normal'
                        }`}
                      >
                        {row.value || t.toolControls.infoNotSpecified}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Per-Page Dimensions Breakdown */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold mb-3">
                    {t.toolControls.infoPageDims}
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-500/20">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead
                        className={
                          theme === 'dark'
                            ? 'bg-zinc-900 text-zinc-300'
                            : 'bg-[#FFF1F2] text-[#C62828]'
                        }
                      >
                        <tr>
                          <th className="py-3 px-4 font-bold">{t.workspace.pageLabel}</th>
                          <th className="py-3 px-4 font-bold">{t.toolControls.infoPoints}</th>
                          <th className="py-3 px-4 font-bold">{t.toolControls.infoMillimeters}</th>
                          <th className="py-3 px-4 font-bold">{t.toolControls.infoInches}</th>
                          <th className="py-3 px-4 font-bold">
                            {t.toolControls.infoOrientationLabel}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-500/15">
                        {currentPrimaryPdf.pageDims.map((dim) => (
                          <tr
                            key={dim.pageNumber}
                            className={
                              theme === 'dark' ? 'bg-zinc-900/40' : 'bg-white/80'
                            }
                          >
                            <td className="py-2.5 px-4 font-bold">#{dim.pageNumber}</td>
                            <td className="py-2.5 px-4">
                              {dim.widthPt} × {dim.heightPt} pt
                            </td>
                            <td className="py-2.5 px-4">
                              {dim.widthMm} × {dim.heightMm} mm
                            </td>
                            <td className="py-2.5 px-4">
                              {dim.widthIn} × {dim.heightIn} in
                            </td>
                            <td className="py-2.5 px-4">
                              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#E53935]/15 text-[#E53935]">
                                {dim.orientation} ({dim.rotation}°)
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================================
            E. BILINGUAL FAQ & PRIVACY ARCHITECTURE SECTION
        ==================================================================== */}
        <section id="faq-section" className="mt-16 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.faq.title}
            </h2>
            <p
              className={`text-sm sm:text-base mt-2 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
              {t.faq.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: t.faq.q1, a: t.faq.a1, icon: ShieldCheck },
              { q: t.faq.q2, a: t.faq.a2, icon: Lock },
              { q: t.faq.q3, a: t.faq.a3, icon: Github },
              { q: t.faq.q4, a: t.faq.a4, icon: Info }
            ].map((item, idx) => {
              const FaqIcon = item.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 ${
                    theme === 'dark' ? 'liquid-glass-dark' : 'liquid-glass-light'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF1F2] text-[#E53935] dark:bg-[#E53935]/15 dark:text-[#FF4D4F] flex items-center justify-center shrink-0">
                      <FaqIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold leading-snug">{item.q}</h3>
                      <p
                        className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                          theme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ====================================================================
          F. FOOTER
      ==================================================================== */}
      <footer
        className={`border-t py-10 px-4 sm:px-6 ${
          theme === 'dark'
            ? 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400'
            : 'bg-white/70 border-zinc-200/80 text-zinc-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-lg text-zinc-900 dark:text-white">
              <div className="w-7 h-7 rounded-lg red-gradient-btn flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span>
                Mo<span className="text-[#E53935]">PDF</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E53935]/15 text-[#E53935]">
                v{APP_VERSION}
              </span>
            </div>
            <p className="text-xs mt-1.5">{t.footer.tagline}</p>
            <p className="text-[11px] mt-1 opacity-75">{t.footer.localGuarantee}</p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-2">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-500/30 hover:bg-zinc-500/10 inline-flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-[11px] opacity-75">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}