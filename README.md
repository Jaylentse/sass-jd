#用Sass模仿京东首页

先上最终效果图

![sass京东首页](sassjd.png "sass京东首页")

+ 自己创造的几个混合宏

```scss
/*占位符*/
%horizontal-vertical-center {
  margin: 0 auto;
}
/*混合宏*/
/*版心*/
@mixin banxin($height, $width: $center-width){
  width: $width;
  height: $height;
  @extend %horizontal-vertical-center;
}
/*分割线*/
@mixin separate($margin-left: 11px, $margin-right: 10px) {
  &::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: $separate-color;
    vertical-align: text-bottom;
    margin-left: $margin-left;
    margin-right: $margin-right;
  }
}
/*小图标*/
@mixin icon($url, $width, $height, $position: 0 0){
  display: inline-block;
  vertical-align: middle;
  width: $width;
  height: $height;
  background: url($url) no-repeat $position;
}
```
+ 自己写的清除浮动和倒三角类

```scss
/*清除浮动*/
.clearfix {
  *zoom: 1;
  &::after {
    content: '';
    display: table;
  }
}
/*倒三角*/
.dw-tr {
  position: absolute;
  height: 6px;
  width: 9px;
  overflow: hidden;
  margin-top: 13px;
  margin-left: 3px;
  &::after {
    content: '◇';
    display: block;
    position: absolute;
    font: 400 15px/15px "consolas";
    color: #686868!important;
    top: -6px;
  }
}
``` 
hover旋转倒三角

```scss
.father{
  &:hover {
    .dw-tr {
      -webkit-transform: rotate(180deg) translateY(3px);
      -moz-transform: rotate(180deg) translateY(3px);
      -ms-transform: rotate(180deg) translateY(3px);
      -o-transform: rotate(180deg) translateY(3px);
      transform: rotate(180deg) translateY(3px);
      -webkit-transform-origin: 50% 50%;
      -moz-transform-origin: 50% 50%;
      -ms-transform-origin: 50% 50%;
      -o-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }
}
```

+ 利用sass for循环插入精灵图小图标(方便快捷哈哈哈哈)

```sass
/*将图标的position存在一个二维数组里*/
$icon-pos: (0 0) (0 -27px) (0 -52px) (0 -77px) (0 -102px)
 (0 -126px) (0 -151px) (0 -176px) (0 -201px) (0 -227px)
 (0 -252px) (0 -277px);
 /*使用for循环写入background-position值*/
 @for $i from 2 through 12 {
          .icon-#{$i} {
            background-position: nth($icon-pos,$i);
          }
        }
```

+ 用for循环写入模拟响应式的图片的margin-left值

```sass
  .slogan {
    position: relative;
    height: map_get($slogan, h);
    background-color: map_get($slogan, bgc);
    img {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    @for $i from 1 through 4 {
      .slogan#{$i}{
        margin-left:  -906px+302px*$i;
      }
    }
  }
```
编译后的CSS

```css
/* line 15, ../sass/layout/_footer.scss */
.footer .slogan .slogan2 {
  margin-left: -302px;
}
/* line 15, ../sass/layout/_footer.scss */
.footer .slogan .slogan3 {
  margin-left: 0px;
}
/* line 15, ../sass/layout/_footer.scss */
.footer .slogan .slogan4 {
  margin-left: 302px;
}
```

##总结一下心得

1. `混合宏`和`@extend`用着实在是太省心了，可以少写很多不重复的样式，把属性和值都一样的公共写在`@extend(%)`里面,把属性名一样属性值不一样的公共样式写在`@mixin`中（`@mixin`与`@function`更配哦）
2. for循环和each对系列定位和插入一系列图片特别好用
3. 要修改不改变页面结构局部的小样式只需在变量模块中修改变量即可，再也不需要一个个找一个个改了
4. 数学运算可以在`width`中迅速减掉`padding`和`border-width`,再也不用按计算器去计算一系列元素定位了的`top`、`right`、`bottom`、`left`了
5. 把页面样式模块化再引进一个`.scss`文件中，不再需要再在一个很大的`css`文件里面去找一个类或者一个元素了，只需要找到模块文件然后修改即可