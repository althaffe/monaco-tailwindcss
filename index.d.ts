import { IDisposable, languages } from 'monaco-editor';
import { Postcss } from 'postcss';
import parse from 'postcss-selector-parser';
import { State } from 'tailwindcss-language-service';
import expandApplyAtRules from 'tailwindcss/src/lib/expandApplyAtRules.js';
import { generateRules } from 'tailwindcss/src/lib/generateRules.js';
import { createContext, JitContext } from 'tailwindcss/src/lib/setupContextUtils.js';
import { TailwindConfig } from 'tailwindcss/tailwind-config';

export interface MonacoTailwindcssOptions {
  /**
   * @default defaultLanguageSelector
   */
  languageSelector?: languages.LanguageSelector;

  tailwindConfig?: TailwindConfig;
}

export interface JitState extends State {
  config: object;
  separator: string;
  screens: string[];
  variants: Record<string, string | null>;
  jit: true;
  jitContext: JitContext;
  modules: {
    postcss: {
      version: string;
      module: Postcss;
    };
    postcssSelectorParser: {
      module: typeof parse;
    };
    jit: {
      generateRules: {
        module: typeof generateRules;
      };
      createContext: {
        module: typeof createContext;
      };
      expandApplyAtRules: {
        module: typeof expandApplyAtRules;
      };
    };
  };
}

export interface MonacoTailwindcss extends IDisposable {
  setTailwindConfig: (tailwindConfig: TailwindConfig) => void;
}

export function configureMonacoTailwindcss(options?: MonacoTailwindcssOptions): MonacoTailwindcss;

/**
 * This data can be used with the default Monaco CSS support to support tailwind directives.
 *
 * It will provider hover information from the Tailwindcss documentation, including a link.
 */
export const tailwindcssData: languages.css.CSSDataV1;
