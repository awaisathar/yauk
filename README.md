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
## Standalone JS plugins
Standalone plugin doesn't need any dependencies and is highly customizable
- include either ```urduInput.js``` or ```urduInput.min.js``` in script
- initialize it by applying it to input with first unique className (***important***)
```html
<input type='text' class='MyUniqueWriterName any-Other-classes-here'/>
```
```javascript
document.querySelector('.MyUniqueWriterName').urduInput(opts?)
```
- You can change language later to EN/UR by trigger
```javascript
urduInput_Element_Object.langEN(); 
```
```javascript
urduInput_Element_Object.langUR(); 
```
- Choose if you want to display EN/UR and layout helper button 
 ```javascript
Element.urduInput({numeric,buttons,default_language,default_style}) 
```
- Choose if you want to unbind/remove eventListener 
```javascript
urduInput_Element_Object.unbind(); 
``` 
- destroy/clear/reset the element
```javascript
urduInput_Element_Object.destroy(); 
``` 
#### Standalone plugin options
| Parameter   |      Type      |  Default |
|----------|:-------------:|------:|
| Numeric |  Object | ```{numeric:true}``` |
| buttons |    Array   |   ```["language","layout"]``` |
| default_language | string |    ```"UR"``` |
| default_style | boolean | ```true``` |
| default_image | string | remote link |



The keyboard mapping is given in the file kb.png <br/>
<img width="500" src ="kb.png"/>

A [demo can be seen here](http://awaisathar.github.io/yauk) as well as on [urduthesaurus.com](http://urduthesaurus.com)
Demo for Standalone javascript can be found here [codepen](https://codepen.io/iMultiThinker/full/YBVVyy)

Yes, this is a quick hack. Yes, it has bugs. It may not work perfectly. Please contribute: I accept pull requests.
