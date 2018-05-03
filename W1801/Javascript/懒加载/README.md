如何判断元素是否出现在可视区域内：
1.offsetTop - scrollTop < clientHeight
2.getClientRects()/getBoundingClientRect();
el.getClientRects().top; ==> (left,right,top,bottom,width,height)
el.getClientRects().top <= clientHeight
###懒加载
####什么是懒加载
懒加载其实就是延迟加载，是一种对网页性能优化的方式，比如当访问一个页面的时候，优先显示可视区域的图片而不一次性加载所有图片，当需要显示的时候再发送图片请求，避免打开网页时加载过多资源。

####什么时候用懒加载
当页面中需要一次性载入很多图片的时候，往往都是需要用懒加载的。

####懒加载原理
<img>标签有一个属性是src，用来表示图像的URL，当这个属性的值不为空时，浏览器就会根据这个值发送请求。如果没有src属性，就不会发送请求。
我们先不给<img>设置src，把图片真正的URL放在另一个属性data-src中，在需要的时候也就是图片进入可视区域的之前，将URL取出放到src中。

####实现
HTML结构:必须将img嵌套在一个元素内部ul列表或如下模式
```
<div class="container">
  <div class="img-area">
    <img class="my-photo" alt="loading" data-src="./img/img1.png">
  </div>
  <div class="img-area">
    <img class="my-photo" alt="loading" data-src="./img/img2.png">
  </div>
  <div class="img-area">
    <img class="my-photo" alt="loading" data-src="./img/img3.png">
  </div>
  <div class="img-area">
    <img class="my-photo" alt="loading" data-src="./img/img4.png">
  </div>
  <div class="img-area">
    <img class="my-photo" alt="loading" data-src="./img/img5.png">
  </div>
</div>
```
仔细观察一下，<img>标签此时是没有src属性的，只有alt和data-src属性。

alt 属性是一个必需的属性，它规定在图像无法显示时的替代文本。
data-* 全局属性：构成一类名称为自定义数据属性的属性，可以通过HTMLElement.dataset来访问。
如何判断元素是否在可视区域

####方法一

通过document.documentElement.clientHeight获取屏幕可视窗口高度
通过element.offsetTop获取元素相对于文档顶部的距离
通过document.documentElement.scrollTop获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
然后判断②-③<①是否成立，如果成立，元素就在可视区域内。


####方法二（推荐）

通过getBoundingClientRect()方法来获取元素的大小以及位置，MDN上是这样描述的：
```
The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
```
这个方法返回一个名为ClientRect的DOMRect对象，包含了top、right、botton、left、width、height这些值。

可以看出返回的元素位置是相对于左上角而言的，而不是边距。

我们思考一下，什么情况下图片进入可视区域。

假设const bound = el.getBoundingClientRect();来表示图片到可视区域顶部距离；
并设 const clientHeight = window.innerHeight;来表示可视区域的高度。

随着滚动条的向下滚动，bound.top会越来越小，也就是图片到可视区域顶部的距离越来越小，当bound.top===clientHeight时，图片的上沿应该是位于可视区域下沿的位置的临界点，再滚动一点点，图片就会进入可视区域。

也就是说，在bound.top<=clientHeight时，图片是在可视区域内的。

我们这样判断：
```
function isInSight(el) {
  var bound = el.getBoundingClientRect();
  var clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //var clientWidth = window.innerWeight;
  return bound.top <= clientHeight + 100;
}
```
这里有个+100是为了提前加载。

####加载图片
页面打开时需要对所有图片进行检查，是否在可视区域内，如果是就加载。
```
function lazyLoad() {
    //    获取所有的img
    var imgs = imgBox.getElementsByTagName('img'), imgs_len = imgs.length;

    for (var i = index; i < imgs_len; i++) {
        //判断图片距离页面顶部的位置是否小于屏幕可见高度+页面滚动高度，
        // 即元素是否从下滚动到眼球可见位置,并且当前元素src为空或者为加载动画图片
        console.log(isInSight(imgs[i]));
        if (isInSight(imgs[i])) {
            if (imgs[i].getAttribute('src') == "") {
                //    获取data-src中属性值设置到src中
                imgs[i].src = imgs[i].dataset.src;
            }
            //    更新加载图片下标
            index = i;
        }
    }
}
```
这里应该是有一个优化的地方，设一个标识符标识已经加载图片的index，当滚动条滚动时就不需要遍历所有的图片，只需要遍历未加载的图片即可。

####函数节流
在类似于滚动条滚动等频繁的DOM操作时，总会提到“函数节流、函数去抖”。

所谓的函数节流，也就是让一个函数不要执行的太频繁，减少一些过快的调用来节流。

####基本步骤：

获取第一次触发事件的时间戳
获取第二次触发事件的时间戳
时间差如果大于某个阈值就执行事件，然后重置第一个时间
```
function throttle(fn, mustRun = 500) {
  const timer = null;
  let previous = null;
  return function() {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (!previous){
      previous = now;
    }
    const remaining = now - previous;
    if (mustRun && remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}
```
这里的mustRun就是调用函数的时间间隔，无论多么频繁的调用fn，只有remaining>=mustRun时fn才能被执行。