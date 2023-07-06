---
title: Vimjail - uiuctf 2023
author: richard
date: 6-5-2023
image: pyramid-svgrepo-com.svg
---

# Vimjail 1, 1.5
 --- 

vim is run with the following options: 
`vim -R -M -Z -u /home/user/vimrc`
 - R -> readonly mode
 - M -> nomodifiable mode
 - Z -> restricted mode
 - u -> vimrc file

Downloading the vimrc file we get:
```vimrc
set nocompatible
set insertmode

inoremap <c-o> nope
inoremap <c-l> nope
inoremap <c-z> nope
inoremap <c-\><c-n> nope
```
 - set nocompatible - disables vi compatibility mode

 - set insertmode - sets insert mode as the default mode

 - inoremap <c-o> nope - disables ctrl + o

 - inoremap <c-l> nope - disables ctrl + l

 - inoremap <c-z> nope - disables ctrl + z

 - inoremap <c-\><c-n> nope - disables ctrl + \ + ctrl + n

After a bit of researching, I found that `ctrl + r` which inserts the contents of a register allows us to make use of the expression or '=' register.

The expression register allows us to execute some code with limited functions and will output the result into vim.

Since we can't write anything to the file, we need someway display the flag on the screen.

We can do this with the `inputlist([List])` function which will display a list of options and return the selected option.

So now we can just use `readfile('flag.txt')` to read the flag and pass the result into inputlist.

## Final Payload:
```
ctrl + r
=
inputlist(readfile('flag.txt'))
```

# Vimjail 2, 2.5
 --- 

Now, our vimrc looks like this:
```
set nocompatible
set insertmode

inoremap <c-o> nope
inoremap <c-l> nope
inoremap <c-z> nope
inoremap <c-\><c-n> nope

cnoremap a _
cnoremap b _
cnoremap c _
cnoremap d _
cnoremap e _
cnoremap f _
cnoremap g _
cnoremap h _
cnoremap i _
cnoremap j _
cnoremap k _
cnoremap l _
cnoremap m _
cnoremap n _
cnoremap o _
cnoremap p _
cnoremap r _
cnoremap s _
cnoremap t _
cnoremap u _
cnoremap v _
cnoremap w _
cnoremap x _
cnoremap y _
cnoremap z _
cnoremap ! _
cnoremap @ _
cnoremap # _
cnoremap $ _
cnoremap % _
cnoremap ^ _
cnoremap & _
cnoremap * _
cnoremap - _
cnoremap + _
cnoremap = _
cnoremap ` _
cnoremap ~ _
cnoremap { _
cnoremap } _
cnoremap [ _
cnoremap ] _
cnoremap \| _
cnoremap \ _
cnoremap ; _
cnoremap < _
cnoremap > _
cnoremap , _
cnoremap . _
cnoremap / _
cnoremap ? _
```

And we have a viminfo file:
```
|1,4
*encoding=utf-8
|2,2,0,,"excuse me, but Real Programmers use butterflies. They open their hands and let the delicate wings flap once. The disturbances ripple outward, changing the flow of the eddy currents in the upper atmosphere. These cause momentary pockets of higher-pressure air to form, Which act as lenses that deflect incoming cosmic rays, focusing them to strike the drive platter and flip the desired bit. Nice. 'Course, there's an emacs command to do that. Oh yeah! Good ol' C-x M-c M-butterfly... Dammit, Emacs."
```

Basically, all of our input characters now are remapped to `_` and we have this long string of text in our expression history.

Once again we use the same payload as described above, but we can use the characters in the history to tab autocomplete functions we want.

For example, the i in butterflies can be tabbed to `inputlist(`.

The paragraph conveniently provides us many quotation marks, periods, enough characters for `flag.txt` and parenthesis aren't blacklisted.

Thus we can just recreate the same payload used above:
```
ctrl + r
=
inputlist(readfile('flag.txt'))
```
