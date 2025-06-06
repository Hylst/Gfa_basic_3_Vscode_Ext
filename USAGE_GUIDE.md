# GFA BASIC 3.6 Enhanced Extension - Usage Guide

## Quick Start

### 1. Installation and Testing

1. **Install the Extension**:
   - Open VS Code
   - Press `F5` to launch the extension in development mode
   - Or package and install the `.vsix` file

2. **Test the Extension**:
   - Open the included `test_example.lst` file
   - You should immediately see enhanced syntax highlighting
   - Try typing GFA BASIC code to see auto-completion and snippets

### 2. Creating Your First GFA BASIC File

1. Create a new file with extension `.lst`
2. Start typing GFA BASIC code
3. Enjoy the enhanced features!

## Features Overview

### 🎨 Syntax Highlighting

The extension recognizes and highlights:

#### Variable Types
```gfabasic
name$     ' String variable (highlighted in string color)
count%    ' 32-bit integer (highlighted in integer color)
addr&     ' 16-bit integer (highlighted in integer color)
flag|     ' 8-bit integer (highlighted in integer color)
active!   ' Boolean variable (highlighted in boolean color)
value     ' Float variable (default highlighting)
```

#### Number Formats
```gfabasic
123       ' Decimal number
456.789   ' Float number
&H1A2B    ' Hexadecimal number
&X1010    ' Binary number
```

#### Comments
```gfabasic
' This is a line comment
PRINT "Hello" ! This is an inline comment
```

#### Control Structures
```gfabasic
' All control keywords are highlighted
IF condition THEN
  ' code here
ENDIF

FOR i = 1 TO 10
  ' loop code
NEXT i

WHILE condition
  ' loop code
WEND
```

### 📝 Code Snippets

Type these prefixes and press `Tab` to expand:

| Prefix | Expands to | Description |
|--------|------------|-------------|
| `for` | FOR loop | Basic FOR loop structure |
| `forstep` | FOR loop with STEP | FOR loop with step increment |
| `while` | WHILE loop | WHILE...WEND structure |
| `repeat` | REPEAT loop | REPEAT...UNTIL structure |
| `if` | IF statement | Basic IF...ENDIF structure |
| `ifelse` | IF ELSE statement | IF...ELSE...ENDIF structure |
| `select` | SELECT CASE | SELECT...CASE...ENDSELECT structure |
| `procedure` | PROCEDURE | Procedure definition |
| `function` | FUNCTION | Function definition |
| `pset` | PSET command | Set pixel graphics command |
| `line` | LINE command | Draw line graphics command |
| `circle` | CIRCLE command | Draw circle graphics command |
| `xbios` | XBIOS call | System XBIOS call |
| `peek` | PEEK memory | Read byte from memory |
| `poke` | POKE memory | Write byte to memory |

### 🔧 Auto-Indentation

The extension automatically indents code for:

- `FOR...NEXT` loops
- `WHILE...WEND` loops
- `REPEAT...UNTIL` loops
- `DO...LOOP` constructs
- `IF...ELSE...ENDIF` conditionals
- `SELECT...CASE...ENDSELECT` statements
- `PROCEDURE...RETURN` blocks
- `FUNCTION...ENDFUNC` blocks

### 💡 Hover Documentation

Hover over keywords to see documentation:

- **Graphics Functions**: PSET, LINE, BOX, CIRCLE, SETCOLOR, etc.
- **System Functions**: XBIOS, PEEK, POKE, VSYNC, etc.
- **Control Structures**: IF, FOR, WHILE, SELECT, etc.
- **Math Functions**: SHR, SHL, RAND, ABS, etc.

### 🧭 Symbol Navigation

The extension provides symbol navigation for:

- **Procedures**: Defined with `PROCEDURE`
- **Functions**: Defined with `FUNCTION`
- **Labels**: Defined with `label_name:`

Access via:
- `Ctrl+Shift+O` - Go to Symbol in File
- `Ctrl+T` - Go to Symbol in Workspace
- Outline view in Explorer panel

## Advanced Usage

### Custom Snippets

You can create custom snippets by:

1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Configure User Snippets"
3. Select "gfabasic"
4. Add your custom snippets

Example custom snippet:
```json
{
  "Custom Graphics Loop": {
    "prefix": "gfxloop",
    "body": [
      "FOR y& = 0 TO 199",
      "  FOR x& = 0 TO 319",
      "    color| = ${1:calculation}",
      "    PSET x&, y&, color|",
      "  NEXT x&",
      "NEXT y&"
    ],
    "description": "Graphics pixel loop"
  }
}
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Space` | Trigger auto-completion |
| `Ctrl+Shift+Space` | Trigger parameter hints |
| `Ctrl+K Ctrl+I` | Show hover information |
| `F12` | Go to definition |
| `Alt+F12` | Peek definition |
| `Shift+F12` | Find all references |
| `Ctrl+Shift+O` | Go to symbol in file |
| `Ctrl+T` | Go to symbol in workspace |

### File Organization

Recommended file structure for GFA BASIC projects:

```
project/
├── main.lst          # Main program file
├── graphics.lst      # Graphics routines
├── sound.lst         # Sound routines
├── data/
│   ├── sprites.dat   # Sprite data
│   └── levels.dat    # Level data
└── include/
    ├── constants.lst # Constant definitions
    └── macros.lst    # Macro definitions
```

## Troubleshooting

### Common Issues

1. **Syntax highlighting not working**:
   - Ensure file has correct extension (`.lst`)
   - Check VS Code language mode (bottom right corner)
   - Reload window (`Ctrl+Shift+P` → "Developer: Reload Window")

2. **Auto-completion not appearing**:
   - Press `Ctrl+Space` to manually trigger
   - Check if extension is activated
   - Verify file is recognized as GFA BASIC

3. **Indentation not working**:
   - Check VS Code indentation settings
   - Ensure "Auto Indent" is enabled
   - Verify language configuration is loaded

4. **Snippets not expanding**:
   - Press `Tab` after typing prefix
   - Check if "Tab Completion" is enabled in settings
   - Verify snippet syntax in configuration

### Performance Tips

1. **Large Files**:
   - For files over 1000 lines, consider splitting into modules
   - Use folding to collapse large procedures
   - Disable unnecessary extensions for better performance

2. **Memory Usage**:
   - Close unused files
   - Restart VS Code periodically for large projects
   - Monitor extension host performance

## Best Practices

### Code Style

1. **Variable Naming**:
   ```gfabasic
   ' Use descriptive names with proper suffixes
   player_name$     ' String for player name
   score%           ' 32-bit integer for score
   lives|           ' 8-bit integer for lives count
   game_over!       ' Boolean for game state
   ```

2. **Comments**:
   ```gfabasic
   ' Use comments to explain complex logic
   ' Calculate screen address for pixel
   screen_addr% = &HFFFF8000 + (y& * 160) + (x& / 8)
   ```

3. **Indentation**:
   ```gfabasic
   ' Proper indentation for readability
   IF player_lives| > 0
     IF enemy_collision!
       DEC player_lives|
       GOSUB player_hit_routine
     ENDIF
   ELSE
     GOSUB game_over_routine
   ENDIF
   ```

### Project Organization

1. **Modular Design**:
   - Separate graphics, sound, and game logic
   - Use procedures and functions for reusable code
   - Keep main program file clean and organized

2. **Documentation**:
   - Comment all procedures and functions
   - Document variable purposes
   - Include usage examples for complex routines

3. **Version Control**:
   - Use Git for version control
   - Commit frequently with descriptive messages
   - Tag stable versions

## Resources

### GFA BASIC References
- [Official GFA BASIC Documentation](https://gfabasic.net/stg/gfabasic.htm)
- [GFA BASIC Instruction Reference](https://www.gladir.com/CODER/GFABASIC/reference.htm)
- [Atari ST Programming Guide](https://info-coach.fr/atari/documents/general/gfabasic.pdf)

### Development Tools
- [GBE - GFA BASIC Editor](https://gfabasic.net/htm/gbe_faq.htm)
- [Atari ST Emulators](https://hatari.tuxfamily.org/)
- [Cross-development Tools](https://github.com/th-otto/tos-hyp)

### Community
- [Atari Forum](https://www.atari-forum.com/)
- [AtariAge Forums](https://atariage.com/forums/)
- [Retro Programming Communities](https://www.reddit.com/r/retroprogramming/)

---

*Happy coding with GFA BASIC 3.6! 🖥️*