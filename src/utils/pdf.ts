export type ToolId =
  | 'merge'
  | 'split'
  | 'organize'
  | 'rotate'
  | 'compress'
  | 'page-numbers'
  | 'crop'
  | 'resize'
  | 'metadata'
  | 'sign'
  | 'img2pdf'
  | 'pdf2img'
  | 'watermark'
  | 'info';

export type CategoryId = 'all' | 'organize' | 'optimize' | 'convert' | 'edit-sign' | 'info';

export interface PageDim {
  pageNumber: number;
  widthPt: number;
  heightPt: number;
  widthMm: number;
  heightMm: number;
  widthIn: string;
  heightIn: string;
  orientation: 'Landscape' | 'Portrait';
  rotation: number;
}

export interface PdfMetadata {
  title: string | null;
  author: string | null;
  subject: string | null;
  creator: string | null;
  producer: string | null;
  keywords: string | null;
  creationDate: string | null;
  modificationDate: string | null;
}

export interface ParsedPdf {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  pageCount: number;
  thumbnails: string[];
  metadata: PdfMetadata;
  pageDims: PageDim[];
}

export interface OrganizePage {
  uid: string;
  sourcePageIndex: number;
  pageNumber: number;
  rotation: number;
  thumbnail: string | null;
  widthPt: number;
  heightPt: number;
}

export interface ImageItem {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface ResultDownload {
  url: string;
  filename: string;
  size: number;
  type: 'pdf' | 'zip' | 'image';
}

export const PAPER_SIZES: Record<string, { widthPt: number; heightPt: number }> = {
  A4: { widthPt: 595.28, heightPt: 841.89 },
  A3: { widthPt: 841.89, heightPt: 1190.55 },
  A5: { widthPt: 419.53, heightPt: 595.28 },
  Letter: { widthPt: 612, heightPt: 792 },
  Legal: { widthPt: 612, heightPt: 1008 }
};

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function hexToRgbNormalized(hex: string): { r: number; g: number; b: number } {
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

export interface PageRangeResult {
  valid: boolean;
  errorKey: string | null;
  ranges: number[][];
  flatPages: number[];
}

/**
 * Parse page range strings like "1-3, 5, 8-10"
 * Returns { valid: boolean, errorKey: string | null, ranges: Array<number[]>, flatPages: number[] }
 * Note: returned page indices are 1-based.
 */
export function parsePageRanges(inputStr: string, maxPages: number): PageRangeResult {
  const cleaned = (inputStr || '').trim();
  if (!cleaned) {
    return { valid: false, errorKey: 'splitRangeEmpty', ranges: [], flatPages: [] };
  }

  const parts = cleaned.split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) {
    return { valid: false, errorKey: 'splitRangeEmpty', ranges: [], flatPages: [] };
  }

  const ranges: number[][] = [];
  const flatSet = new Set<number>();

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
      const group: number[] = [];
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
export function pagesArrayToRangeString(pages: number[]): string {
  if (!pages || pages.length === 0) return '';
  const sorted = Array.from(new Set(pages)).sort((a, b) => a - b);
  const parts: string[] = [];
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
