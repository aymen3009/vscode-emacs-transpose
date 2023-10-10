# Emacs Transpose Functions for VSCode

## Description

> Note: This extension is just a way for me to learn how to write extensions for VSCode. It is not intended to be used "Professionally".

This extension add the transpose function of Emacs to VSCOode.

## Usage 

### Transpose two characters (Transpose Chars) (<kdb>Ctrl</kbd> + <kdb>t</kbd> )

Swaps the two characters around the cursor.
If the cursor is at the end of the line or the beginning of the line, it will not do anything.

### Transpose two words (Transpose Words) (<kdb>Alt</kbd> + <kdb>t</kbd> )

Swaps the two words around the cursor and ignores whitespace.
If the cursor is in the middle of a word, it will split the word in two and swap the two parts and keep the rest as it is.
If the cursor is at the end of the line or the beginning of the line, it will not do anything.

### Transpose two lines (Transpose Lines) (<kdb>Ctrl</kbd> + <kdb>Alt</kbd> + <kdb>t</kbd> )

It swaps the the line the cursor is on with the non-empty line above it or below it if there is no non-empty line above it. And it will ignore all empty lines.

### Transpose two lines up (Transpose Lines Up) (<kdb>Ctrl</kbd> + <kdb>t</kbd> + <kdb>Up</kbd> )

It swaps the the line the cursor is on with the non-empty line above it. And it will ignore all empty lines.
If there is no non-empty line above it, it will not do anything.

### Transpose two lines down (Transpose Lines Down) (<kdb>Ctrl</kbd> + <kdb>t</kbd> + <kdb>Down</kbd> )

It swaps the the line the cursor is on with the non-empty line below it. And it will ignore all empty lines.
If there is no non-empty line below it, it will not do anything.

## TODO

- [X] Transpose two characters (transpose-chars)
- [X] Transpose two words (transpose-words)
- [X] Transpose two lines (transpose-lines)
- [X] Transpose two lines up (transpose-lines-up)
- [x] Transpose two lines down (transpose-lines-down)
- [ ] Transpose two balanced expressions (transpose-sexps)
- [ ] Transpose two sentences (transpose-sentences)
- [ ] Transpose two paragraphs (transpose-paragraphs)
- [ ] Transpose two regions (transpose-regions)

## License

This extension is licensed under the [MIT License](LICENSE). Do whatever you want with it.
