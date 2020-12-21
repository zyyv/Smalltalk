import Vue from 'vue';

import {
  emojisAmap,
  emojisBmap,
  emojiReg,
  emojiString,
  wChartReg,
  wChatEmojis,
  wChatToUi
} from './emjoydata'

export default function parsingEmoji(value: string) {
  if (!value) return '';
  let str = value;
  str = str.replace(/\n/gi, '<br>');
  // str = EmojiUnicode.trans(str);
  // var reg = /^\[.*\]$/gi;
  var reg = /\[+[^\[\]]+\]/g;
  str = str.replace(reg, function (s) {
    var s = s.split("[")[1].split(']')[0];
    if (emojiString.indexOf(s) != -1) {
      return '<span class="chat-emoji emoji_b ' + emojisBmap['[' + s + ']'] + '" data-name="' + s + '"></span>';
    } else if (emojisAmap[s]) {
      return '<span class="chat-emoji emoji_a ' + emojisAmap[s] + '" data-name="' + s + '"></span>';
    } else {
      return '[' + s + ']';
    };
  });
  str = str.replace(emojiReg, function (emo: string) {
    var emo = emo.replace(/\\/g, '\\');
    return '<span class="chat-emoji emoji_b ' + emojisBmap[emo] + '" data-name="' + emo + '"></span>';
  });
  // 微信emoji=》unicode表情规则
  str = str.replace(wChartReg, function (wCeo) {
    return '<span class="chat-emoji emoji_b ' + wChatEmojis[_escapeToUtf32(wCeo).toLocaleUpperCase()] + '" data-name="' + wChatToUi[_escapeToUtf32(wCeo).toLocaleUpperCase()] + '"></span>';
  });
  return str;
}

//编码转换
function _escapeToUtf32(str: string) {
  var escaped = [],
    unicodeCodes = _convertStringToUnicodeCodePoints(str),
    i = 0,
    l = unicodeCodes.length,
    hex;

  for (; i < l; i++) {
    hex = unicodeCodes[i].toString(16);
    escaped.push('0000'.substr(hex.length) + hex);
  }
  return escaped.join('-');
}

function _convertStringToUnicodeCodePoints(str: string) {
  var surrogate1st = 0,
    unicodeCodes = [],
    i = 0,
    l = str.length;

  for (; i < l; i++) {
    var utf16Code = str.charCodeAt(i);
    if (surrogate1st != 0) {
      if (utf16Code >= 0xDC00 && utf16Code <= 0xDFFF) {
        var surrogate2nd = utf16Code,
          unicodeCode = (surrogate1st - 0xD800) * (1 << 10) + (1 << 16) + (surrogate2nd - 0xDC00);
        unicodeCodes.push(unicodeCode);
      }
      surrogate1st = 0;
    } else if (utf16Code >= 0xD800 && utf16Code <= 0xDBFF) {
      surrogate1st = utf16Code;
    } else {
      unicodeCodes.push(utf16Code);
    }
  }
  return unicodeCodes;
}