/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.43.0(94c055bcbdd49f04a0fa15515e848542a79fb948)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/javascript/javascript.ts
import { conf as tsConf, language as tsLanguage } from "../typescript/typescript.js";
var conf = tsConf;
var language = {
  defaultToken: "invalid",
  tokenPostfix: ".js",
  keywords: [
    "break",
    "case",
    "catch",
    "class",
    "continue",
    "const",
    "constructor",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "from",
    "function",
    "get",
    "if",
    "import",
    "in",
    "instanceof",
    "let",
    "new",
    "null",
    "return",
    "set",
    "static",
    "super",
    "switch",
    "symbol",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "undefined",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "async",
    "await",
    "of"
  ],
  typeKeywords: [],
  operators: tsLanguage.operators,
  symbols: tsLanguage.symbols,
  escapes: tsLanguage.escapes,
  digits: tsLanguage.digits,
  octaldigits: tsLanguage.octaldigits,
  binarydigits: tsLanguage.binarydigits,
  hexdigits: tsLanguage.hexdigits,
  regexpctl: tsLanguage.regexpctl,
  regexpesc: tsLanguage.regexpesc,
  tokenizer: tsLanguage.tokenizer
};
export {
  conf,
  language
};
