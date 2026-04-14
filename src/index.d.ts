export declare const ELLIPSIS: {
  readonly DOT: '...';
  readonly UNICODE: '…';
  readonly ARROW: '>>';
  readonly BRACKET: '[...]';
  readonly DASH: '--';
  readonly SPACE: ' ';
  readonly EMPTY: '';
};

export declare const truncateByChar: (text: string, maxLength: number, ellipsis?: string) => string;

export declare const truncateByByte: (text: string, maxBytes: number, ellipsis?: string) => string;

export declare const truncateByWord: (text: string, maxLength: number, ellipsis?: string) => string;

export interface TruncatorOptions {
  mode?: 'char' | 'byte' | 'word';
  ellipsis?: string;
}

export declare const createTruncator: (options?: TruncatorOptions) => (text: string, max: number) => string;
