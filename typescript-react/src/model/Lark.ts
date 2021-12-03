import { AlignmentStyle } from '@craftdocs/craft-extension-api';
type TextRun = {
  text: string;
  style?: TextStyle;
};

type RGBColor = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

type Link = {
  url: string;
};

type TextStyle = Partial<{
  bold: boolean;
  italic: boolean;
  strikeThrough: boolean;
  underline: boolean;
  codeInline: boolean;
  backColor: RGBColor;
  textColor: RGBColor;
  link: Link;
}>;

type Block = {
  type: 'paragraph' | 'gallery' | 'file' | 'table' | 'code' | 'callout';
  code: Code;
};

// type Body = {
//   blocks: [Block];
// };

type Code = {
  language: string;
  wrapContent?: boolean;
  body: {
    blocks: [Block];
  };
  zoneId: string;
};

class TextRunFactory {
  text = '';
  textStyle: TextStyle;
  constructor(text: string) {
    this.text = text;
    this.textStyle = {};
  }

  bold(value = true) {
    this.textStyle.bold = value;
    return this;
  }
  italic(value = true) {
    this.textStyle.italic = value;
    return this;
  }
  strikeThrough(value = true) {
    this.textStyle.strikeThrough = value;
    return this;
  }
  codeInline(value = true) {
    this.textStyle.codeInline = value;
    return this;
  }
  underline(value = true) {
    this.textStyle.underline = value;
    return this;
  }

  set link(link: string) {
    Object.assign(this.textStyle, {
      link: {
        url: link,
      },
    });
  }
  // set backColor(color: string) {
  // }

  // set textStyle(color: string) {

  // }
}

type Location = {
  zoneId: string;
  startIndex: number;
  endIndex: number;
};

type ParagraphStyle = Partial<{
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  collection: boolean;
  quote: boolean;
  align: AlignmentStyle;
}>;

export const lark = {
  textRun: {
    factory: (content: string) => new TextRunFactory(content),
  },
  paragraph(elements: any, style: ParagraphStyle) {
    return {
      style,
      elements,
    };
  },
};
