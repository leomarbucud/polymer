[![Build status](https://travis-ci.org/RoXuS/range-datepicker.svg?branch=master)](https://travis-ci.org/RoXuS/range-datepicker)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/roxus/range-datepicker)

## &lt;range-datepicker&gt;

![range-datepicker in action](https://raw.githubusercontent.com/roxus/range-datepicker/master/demo.png)

`range-datepicker` provides a simple datepicker with range.

### Install

    bower install range-datepicker

Inspired by [airbnb datepicker](https://github.com/airbnb/react-dates).

[See live demo](https://roxus.github.io/range-datepicker/components/range-datepicker/demo/)
[See docs](https://roxus.github.io/range-datepicker/)

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="range-datepicker.html">
    <style is="custom-style">
      div {
        height: 320px;
        width: 100%;
      }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  <range-datepicker date-from="{{dateFrom}}" date-to="{{dateTo}}"></range-datepicker>
  <range-datepicker no-range></range-datepicker>
  <range-datepicker no-range force-narrow></range-datepicker>
  <range-datepicker locale="fr"></range-datepicker>

  <range-datepicker-input date-format="MM/DD/YYYY">
    <template>
      <paper-input label="Date from" value="[[dateFrom]]" readonly></paper-input>
      <paper-input label="Date to" value="[[dateTo]]" readonly></paper-input>
    </template>
  </range-datepicker-input>
</div
```

