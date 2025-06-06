const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const jpeg = require('jpeg-js');
const { extractReceiptData } = require('./cohereExtractor');

class OCRService {
    static extractItems(text) {
        const items = [];
        const lines = text.split('\n');
        
        // Patterns: [Quantity] [Description] [Price]
        const itemPattern = /(\d+)\s+(.+?)\s+(\d+\.\d{2})$/;
        
        lines.forEach(line => {
          const match = line.match(itemPattern);
          if (match) {
            items.push({
              quantity: parseInt(match[1]),
              description: match[2].trim(),
              price: parseFloat(match[3])
            });
          }
        });
        
        return items;
      }

      static async extractText(filePath) {
        if (filePath.endsWith('.pdf')) {
          return this.extractFromPDF(filePath);
        } else {
          return this.extractFromImage(filePath);
        }
      }
    
      static async extractFromPDF(filePath) {
        try {
          const dataBuffer = fs.readFileSync(filePath);
          const data = await pdf(dataBuffer);
          const text = data.text.replace(/\n+/g, '\n').trim();
          
          // Fallback to image-based OCR if text is too short
          if (text.length < 100) {
            console.log('Using fallback OCR for PDF');
            return this.extractFromPDFImages(filePath);
          }
          
          return text;
        } catch (error) {
          console.error('PDF extraction error:', error);
          throw new Error('Failed to extract text from PDF');
        }
      }
    
      static async extractFromPDFImages(filePath) {
        try {
          const dataBuffer = fs.readFileSync(filePath);
          const pdfDoc = await PDFDocument.load(dataBuffer);
          let fullText = '';
          
          for (let i = 0; i < pdfDoc.getPageCount(); i++) {
            const page = pdfDoc.getPage(i);
            
            // Render page to PNG image
            const pngImageBytes = await page.renderToPNG({
              useObjectStreams: false,
              dpi: 200,
            });
            
            const imagePath = `${filePath}-page-${i}.png`;
            fs.writeFileSync(imagePath, pngImageBytes);
            
            // OCR the image
            const text = await this.extractFromImage(imagePath);
            fullText += text + '\n\n';
            
            // Clean up temporary file
            fs.unlinkSync(imagePath);
          }
          
          return fullText;
        } catch (error) {
          console.error('PDF image extraction error:', error);
          throw new Error('Failed to extract text from PDF images');
        }
      }
    
      static async extractFromImage(filePath) {
        try {
          // Add image preprocessing for better OCR results
          const { data } = await Tesseract.recognize(filePath, 'eng', {
            logger: m => console.log(m),
            tessedit_pageseg_mode: '6', // Assume uniform block of text
            tessedit_ocr_engine_mode: '1', // LSTM only
          });
          return data.text;
        } catch (error) {
          console.error('OCR extraction error:', error);
          throw new Error('Failed to extract text from image');
        }
      }

      static async parseReceiptData(text) {
        try {
          // Try Cohere extraction first
          const cohereData = await extractReceiptData(text);
          
          // Validate and clean data
          return {
            merchant_name: cohereData.merchant_name || this.extractMerchant(text),
            total_amount: cohereData.total_amount || this.extractTotal(text),
            purchased_at: cohereData.purchased_at || this.extractDate(text),
            items: cohereData.items || this.extractItems(text)
          };
        } catch (cohereError) {
          console.log('Using fallback parsing:', cohereError.message);
          // Fallback to regex parsing
          return {
            merchant_name: this.extractMerchant(text),
            total_amount: this.extractTotal(text),
            purchased_at: this.extractDate(text),
            items: this.extractItems(text)
          };
        }
      }

  static extractMerchant(text) {
    // Look for merchant patterns in the first 20% of text
    const firstSection = text.substring(0, text.length * 0.2);
    
    // Common receipt headers
    const merchantPatterns = [
      /(?:^|\s)([a-z0-9&.\s]+?)\s+(?:receipt|invoice|bill|ticket)/i,
      /(?:from|at|@)\s+([a-z0-9&.\s]{3,50})/i,
      /thank you for shopping at ([a-z0-9&.\s]{3,50})/i,
      /^\s*([a-z0-9&.\s]{3,50})\s*$/m
    ];
    
    for (const pattern of merchantPatterns) {
      const match = firstSection.match(pattern);
      if (match && match[1]) {
        return this.capitalize(match[1].trim());
      }
    }
    
    return 'Unknown Merchant';
  }

  static extractTotal(text) {
    // Look for total in the last 30% of text
    const lastSection = text.substring(text.length * 0.7);
    
    // Improved total patterns
    const totalPatterns = [
      /(?:total|amount due|balance|grand total)\D*(\d+\.\d{2})/i,
      /(\d+\.\d{2})\s*(?:total|amount|due)/i,
      /(?:total|amount):?\s*[\$]?\s*(\d+\.\d{2})/i
    ];
    
    for (const pattern of totalPatterns) {
      const match = lastSection.match(pattern);
      if (match && match[1]) {
        return parseFloat(match[1]);
      }
    }
    
    // Find highest number that looks like a total
    const amounts = text.match(/\d+\.\d{2}/g) || [];
    const parsedAmounts = amounts.map(parseFloat).filter(a => a > 1);
    
    if (parsedAmounts.length > 0) {
      return Math.max(...parsedAmounts);
    }
    
    return 0.0;
  }

  static extractDate(text) {
    // Comprehensive date detection
    const datePatterns = [
      /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/,
      /\b(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})\b/,
      /date\s*:\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i,
      /(\w+\s+\d{1,2},\s+\d{4})/
    ];
    
    for (const pattern of datePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        try {
          return new Date(match[1]).toISOString();
        } catch {
          // Try next pattern
        }
      }
    }
    
    return new Date().toISOString();
  }

  static capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }
  
}

module.exports = OCRService;