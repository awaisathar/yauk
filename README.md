# Yet Another Urdu Keyboard
A jQuery plugin for typing in Urdu using an English keyboard. 

There are too many controls out there which convert English to Urdu.<br/>
Some of them are phonetic, some not.<br/>
Some are open-source, some not.<br/>
Some have keys that you can press, some don't.<br/>
Some work on mobile phones, some don't.<br/>
I couldn't find one with all the features so I made one.<br/>

This is a phonetic open-source mobile enabled jQuery plugin which enables typing in Urdu using an English keyboard.<br/>

## Instructions to use
- Download/clone this repository and get `yauk.min.js` or `yauk.js`
- Place it in your assets and include it with`<script src="path/to/yauk.min.js"></script>` after including jQuery
- Set Urdu input for the input field or textarea with an id e.g.
  ```javascript
   $('#q').setUrduInput();
  ```
- By default numerals are English. For urdu, pass `urduNumerals: true` in options 
  ```javascript
   $('#q').setUrduInput({urduNumerals: true});
  ```



The keyboard mapping is given in the file kb.png <br/>
<img width="500" src ="kb.png"/>

A [demo can be seen here](http://awaisathar.github.io/yauk) as well as on [urduthesaurus.com](http://urduthesaurus.com)

Yes, this is a quick hack. Yes, it has bugs. It may not work perfectly. Please contribute: I accept pull requests.



