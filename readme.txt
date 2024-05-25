=== Autogrid ===
Contributors:      Andreslav
Tags:              block, grid, layout, auto-fill, columns
Requires PHP:      7.0
Tested up to:      6.5
Stable tag:        2.0.6
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Create a grid with a variable number of columns! Set the number of columns and their minimum width, after which the cells will be redistributed.

== Description ==

Autogrid is a block for the WordPress block editor that allows you to create adaptive columns. The elements inside it are automatically distributed into columns, filling the available space.

The order of customization

1. Set the maximum number of columns and their minimum width, after reaching which the cells will be redistributed.
2. Specify the size of spacing between cells and their padding. These parameters can be configured adaptively, for example by setting min. the size of the container when the value should be applied.
3. If necessary, set the width of certain cells by specifying the number of columns they should occupy. You can specify the minimum and maximum number of columns to be displayed when the value should be applied.
4. Done! Test.


== Frequently Asked Questions ==

= What browsers are supported? =

The grid works well in modern browsers:
Chrome 79+, Firefox 76+, Edge 79+, Safari 16+.

Adaptability starts working only with:
Chrome 106+, Firefox 110+, Edge 106+, Safari 16+.

The information is obtained based on a comparison of the support of the CSS features used: [CSS Grid](https://caniuse.com/css-grid), [CSS math function min()](https://caniuse.com/?search=min()), [CSS function repeat()](https://caniuse.com/?search=repeat()), [CSS Container Queries](https://caniuse.com/css-container-queries).

= Are the adaptability settings working strangely? =

The Min and Max values in the adaptivity settings "Spacing between cells" and "Padding of cells" are set in px and indicate the width of the Autogrid container, not the width of the viewport.

The Min and Max values in the adaptability settings of the "Cell Size" are set in integers and literally indicate the number of columns displayed when the rule should be applied.

= Where can I see the source code? =

You can check out the source files on [Github](https://github.com/Andreslav/autogrid).


== Screenshots ==

1. Example of Autogrid block
2. Autogrid Block Settings
3. Autogrid block cell Settings
4. Autogrid block cell Settings
5. How the Autogrid block looks on the site

== Changelog ==

= 2.0.6 =
* Fixed a bug in Safari.

= 2.0.5 =
* Fixed PHP warning and formatted .php

= 2.0.3 =
* Fixed an issue where increasing the cell spacing increases the outer margins as well.
* Updated the supported settings (supports).
* Autogrid is now displayed correctly inside the "Group" blocks.

= 2.0.2 =
* Improved adaptability of cell size. Max value was interpreted incorrectly in some cases.
* Fixed a problem when the Autogrid block nested in the extended cell was displayed incorrectly.
