/**
 * GFA BASIC 3.6 Enhanced Syntax Highlighting Extension
 * Author: Hylst
 * 
 * This extension provides comprehensive syntax highlighting and language support
 * for GFA BASIC 3.6 programming language used on Atari ST systems.
 */

const vscode = require('vscode');

/**
 * Activate the extension
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('GFA BASIC 3.6 Enhanced Syntax Highlighting extension is now active!');

    // Register completion provider for GFA BASIC keywords and functions
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'gfabasic',
        {
            provideCompletionItems(document, position, token, context) {
                // Basic completion items for common GFA BASIC instructions
                const completions = [];

                // Control flow completions
                const ifCompletion = new vscode.CompletionItem('IF', vscode.CompletionItemKind.Keyword);
                ifCompletion.insertText = new vscode.SnippetString('IF ${1:condition}\n\t$0\nENDIF');
                ifCompletion.documentation = new vscode.MarkdownString('IF conditional statement');
                completions.push(ifCompletion);

                const forCompletion = new vscode.CompletionItem('FOR', vscode.CompletionItemKind.Keyword);
                forCompletion.insertText = new vscode.SnippetString('FOR ${1:i} = ${2:1} TO ${3:10}\n\t$0\nNEXT ${1:i}');
                forCompletion.documentation = new vscode.MarkdownString('FOR loop');
                completions.push(forCompletion);

                const whileCompletion = new vscode.CompletionItem('WHILE', vscode.CompletionItemKind.Keyword);
                whileCompletion.insertText = new vscode.SnippetString('WHILE ${1:condition}\n\t$0\nWEND');
                whileCompletion.documentation = new vscode.MarkdownString('WHILE loop');
                completions.push(whileCompletion);

                // Graphics completions
                const psetCompletion = new vscode.CompletionItem('PSET', vscode.CompletionItemKind.Function);
                psetCompletion.insertText = new vscode.SnippetString('PSET ${1:x}, ${2:y}, ${3:color}');
                psetCompletion.documentation = new vscode.MarkdownString('Set pixel at coordinates (x,y) with specified color');
                completions.push(psetCompletion);

                const lineCompletion = new vscode.CompletionItem('LINE', vscode.CompletionItemKind.Function);
                lineCompletion.insertText = new vscode.SnippetString('LINE ${1:x1}, ${2:y1}, ${3:x2}, ${4:y2}');
                lineCompletion.documentation = new vscode.MarkdownString('Draw line from (x1,y1) to (x2,y2)');
                completions.push(lineCompletion);

                return completions;
            }
        },
        ' ', '\t' // Trigger completion on space and tab
    );

    // Register hover provider for GFA BASIC keywords
    const hoverProvider = vscode.languages.registerHoverProvider('gfabasic', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            // Provide hover information for common GFA BASIC keywords
            const hoverInfo = getKeywordInfo(word.toUpperCase());
            if (hoverInfo) {
                return new vscode.Hover(new vscode.MarkdownString(hoverInfo));
            }
        }
    });

    // Register document symbol provider for procedures and functions
    const symbolProvider = vscode.languages.registerDocumentSymbolProvider('gfabasic', {
        provideDocumentSymbols(document, token) {
            const symbols = [];
            const text = document.getText();
            const lines = text.split('\n');

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                // Find procedures
                const procMatch = line.match(/^PROCEDURE\s+(\w+)/i);
                if (procMatch) {
                    const symbol = new vscode.DocumentSymbol(
                        procMatch[1],
                        'Procedure',
                        vscode.SymbolKind.Function,
                        new vscode.Range(i, 0, i, line.length),
                        new vscode.Range(i, 0, i, line.length)
                    );
                    symbols.push(symbol);
                }

                // Find functions
                const funcMatch = line.match(/^FUNCTION\s+(\w+)/i);
                if (funcMatch) {
                    const symbol = new vscode.DocumentSymbol(
                        funcMatch[1],
                        'Function',
                        vscode.SymbolKind.Function,
                        new vscode.Range(i, 0, i, line.length),
                        new vscode.Range(i, 0, i, line.length)
                    );
                    symbols.push(symbol);
                }

                // Find labels
                const labelMatch = line.match(/^(\w+):/i);
                if (labelMatch) {
                    const symbol = new vscode.DocumentSymbol(
                        labelMatch[1],
                        'Label',
                        vscode.SymbolKind.Constant,
                        new vscode.Range(i, 0, i, line.length),
                        new vscode.Range(i, 0, i, line.length)
                    );
                    symbols.push(symbol);
                }
            }

            return symbols;
        }
    });

    context.subscriptions.push(completionProvider, hoverProvider, symbolProvider);
}

/**
 * Get hover information for GFA BASIC keywords
 * @param {string} keyword 
 * @returns {string|null}
 */
function getKeywordInfo(keyword) {
    const keywordInfo = {
        'PSET': '**PSET x, y, color** - Set pixel at coordinates (x,y) with specified color',
        'LINE': '**LINE x1, y1, x2, y2** - Draw line from (x1,y1) to (x2,y2)',
        'BOX': '**BOX x1, y1, x2, y2** - Draw rectangle outline',
        'PBOX': '**PBOX x1, y1, x2, y2** - Draw filled rectangle',
        'CIRCLE': '**CIRCLE x, y, radius** - Draw circle outline',
        'PCIRCLE': '**PCIRCLE x, y, radius** - Draw filled circle',
        'SETCOLOR': '**SETCOLOR index, red, green, blue** - Set color palette entry',
        'XBIOS': '**XBIOS(function, ...)** - Call XBIOS system function',
        'PEEK': '**PEEK(address)** - Read byte from memory address',
        'POKE': '**POKE address, value** - Write byte to memory address',
        'DPEEK': '**DPEEK(address)** - Read word (2 bytes) from memory address',
        'DPOKE': '**DPOKE address, value** - Write word (2 bytes) to memory address',
        'LPEEK': '**LPEEK(address)** - Read long word (4 bytes) from memory address',
        'LPOKE': '**LPOKE address, value** - Write long word (4 bytes) to memory address',
        'VSYNC': '**VSYNC** - Wait for vertical synchronization',
        'RAND': '**RAND(max)** - Generate random number between 0 and max-1',
        'SHR': '**SHR(value, bits)** - Shift right logical',
        'SHL': '**SHL(value, bits)** - Shift left logical',
        'AND': '**AND** - Logical AND operator',
        'OR': '**OR** - Logical OR operator',
        'XOR': '**XOR** - Logical XOR operator',
        'NOT': '**NOT** - Logical NOT operator',
        'FOR': '**FOR variable = start TO end [STEP increment]** - Start FOR loop',
        'NEXT': '**NEXT [variable]** - End FOR loop',
        'WHILE': '**WHILE condition** - Start WHILE loop',
        'WEND': '**WEND** - End WHILE loop',
        'REPEAT': '**REPEAT** - Start REPEAT loop',
        'UNTIL': '**UNTIL condition** - End REPEAT loop with condition',
        'IF': '**IF condition** - Start conditional block',

        'ELSE': '**ELSE** - Alternative branch in IF statement',
        'ENDIF': '**ENDIF** - End IF conditional block',
        'SELECT': '**SELECT variable** - Start SELECT CASE block',
        'CASE': '**CASE value** - Case branch in SELECT block',
        'DEFAULT': '**DEFAULT** - Default case in SELECT block',
        'ENDSELECT': '**ENDSELECT** - End SELECT CASE block',
        'PROCEDURE': '**PROCEDURE name(parameters)** - Define procedure',
        'FUNCTION': '**FUNCTION name(parameters)** - Define function',
        'RETURN': '**RETURN [value]** - Return from procedure/function',
        'GOSUB': '**GOSUB label** - Call subroutine at label',
        'PRINT': '**PRINT expression** - Output text or values',
        'INPUT': '**INPUT [prompt,] variable** - Get user input',
        'DIM': '**DIM array(size)** - Declare array',
        'DATA': '**DATA value1, value2, ...** - Define data values',
        'READ': '**READ variable** - read value from DATA',
        'RESTORE': '**RESTORE [label]** - Reset DATA pointer'
    };

    return keywordInfo[keyword] || null;
}

/**
 * Deactivate the extension
 */
function deactivate() {
    console.log('GFA BASIC 3.6 Enhanced Syntax Highlighting extension is now deactivated.');
}

module.exports = {
    activate,
    deactivate
};