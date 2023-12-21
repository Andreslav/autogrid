=== Autogrid Block ===
Contributors:      Andreslav
Tags:              block, grid, layout, auto-fill, columns
Tested up to:      6.4
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Create a grid with a variable number of columns! Set the number of columns and their minimum width, after which the cells will be redistributed.

== Description ==

Autogrid is a block for the WordPress block editor that allows you to create adaptive columns. The elements inside it are automatically distributed into columns, filling the available space.

The order of customization

Set the maximum number of columns and their minimum width, after reaching which the cells will be redistributed.
Specify the size of spacing between cells and their padding. These parameters can be configured adaptively, for example by setting min. the size of the container when the value should be applied.
If necessary, set the width of certain cells by specifying the number of columns they should occupy. You can specify the minimum and maximum number of columns to be displayed when the value should be applied.
Done! Test.


== Frequently Asked Questions ==

= What browsers are supported? =

The grid works well in modern browsers:
Chrome 79+, Firefox 76+, Edge 79+, Safari 16+.

Adaptability starts working only with:
Chrome 106+, Firefox 110+, Edge 106+, Safari 16+.

The information is obtained based on a comparison of the support of the CSS features used: [CSS Grid](https://caniuse.com/css-grid)), [CSS math function min()](https://caniuse.com/?search=min()), [CSS function repeat()](https://caniuse.com/?search=repeat()), [CSS Container Queries](https://caniuse.com/css-container-queries)).

== Screenshots ==

1. CSS Autogrid Block.

== Changelog ==

= 0.1.0 =
* Release
