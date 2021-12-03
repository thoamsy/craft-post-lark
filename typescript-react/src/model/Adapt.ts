import {
  BlockLocation,
  TextStyle,
  CraftTextBlock,
} from '@craftdocs/craft-extension-api';
import { lark } from './Lark';

function textStyleToHeading(style: TextStyle): 1 | 2 | 3 | undefined {
  switch (style) {
    case 'title':
      return 1;
    case 'subtitle':
      return 2;
    case 'heading':
      return 3;
  }
}

const BlockToText = (block: CraftTextBlock) => {
  const { content } = block;
  const elements = content.map((textRun) => {
    const ltextRun = lark.textRun.factory(textRun.text);
    ltextRun
      .bold(textRun.isBold)
      .italic(textRun.isItalic)
      .codeInline(textRun.isCode)
      .strikeThrough(textRun.isStrikethrough);

    if (textRun.link?.type === 'url') {
      ltextRun.link = textRun.link.url;
    }
    return ltextRun;
  });

  const { alignmentStyle, textStyle } = block.style;

  const align = alignmentStyle;
  return lark.paragraph(elements, {
    align,
    headingLevel: textStyleToHeading(textStyle),
  });
};
