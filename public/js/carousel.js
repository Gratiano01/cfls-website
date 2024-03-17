//动态获取图片高度
//创建img标签---保证图片是被浏览器加载完成的
var img = document.createElement('img')
img.src = 'img/1.jpg'
//添加监听事件，看图片是否加载成功
img.onload = function () {
  //动态获取图片的宽度和高度
  //图片的width和height属性返回的是图片的真实宽高

  //getComputedStyle:返回网页中对应标签的的css样式
  var style_height = getComputedStyle(document.querySelector('img')).height
  //console.log(style_height);//400px

  //解决：相对于窗口进行定位，注：一旦使用定位，会使内容脱离父级标签（高度坍塌）
  document.querySelector('.carousel').style.height = style_height
  //也可以通过计算(尺寸按照等比例缩放计算)
  //console.log(document.querySelector('.carousel').style.height=300*this.height/this.width+'px');
}
//定义两个计时器，第一个控制页面的切换，第二个控制切换的频率
var content = document.querySelector('.content')
//定义函数，完成一张图片的切换
//index:记录本次轮播结束时图片的下标
function onePicScroll(index, callBack) {
  //var carousel=document.querySelector('.carousel');
  //动态获取图片的宽度
  //var style_w=getComputedStyle(carousel).width;
  //以上两句相当于：
  //var style_w=getComputedStyle(document.querySelector('.carousel')).width;
  //console.log(style_w);
  var style_w = getComputedStyle(document.querySelector('.carousel'))
  var w = parseInt(style_w.width)
  var totle_step = 30 //总步数---共需多少步完成图片切换
  var current_step = 0 //当前执行步数---代表已经走的步数
  var begin = parseInt(getComputedStyle(content).left) //0
  //console.log(begin);//获取content对应div标签开始本次轮播的起始位置

  var end = -index * w //计算轮播结束时轮播图距离左侧窗口边界的距离
  var offset = end - begin //计算本次轮播总偏移量

  //定义闭包函数（在函数内使用的函数）
  //只要程序执行到这句，在进行下次页面绘制时，先调用函数，一直重复该过程。
  function starScroll() {
    current_step++
    content.style.left = begin + (offset / totle_step) * current_step + 'px'
    var scrollAni = requestAnimationFrame(starScroll)
    if (current_step >= totle_step) {
      //等价于停止计时器
      cancelAnimationFrame(scrollAni)
      callBack() //回调函数。只要调用，一定是计时器执行完毕
    }
  }
  starScroll() //调用函数，自产自销
}
//再定义计时器，每隔一段时间完成一次轮播
var current_index = 0 //记录当前轮播图片的下标
//定义变量，限制刷新频率，性能高的浏览器刷新频率快（普通浏览器1s刷新60次）
var num = 0 //用来控制轮播图的刷新频率
var auto_ani
function frequency() {
  num++
  if (num >= 180) {
    //页面刷新300次时，current_index++  该过程轮播图不执行
    current_index++
    onePicScroll(current_index, function () {
      if (current_index >= 6) {
        content.style.left = 0
        current_index = 0
      }
      //完成对分页按钮颜色的更改
      change()
    }) //执行一次轮播图的切换

    num = 0
  }
  //点击小圆点关闭自动轮播（使用全局变量，方便外界接收）
  auto_ani = requestAnimationFrame(frequency)
}
frequency()
// 计时器是异步执行操作 --- 添加判断发生在第五张切换第六张之前,
//图片还没有切换完成就直接进行第二个计时器的判断,解决方法:添加回调函数,传递本次轮播已经结束
//计时器问题：当页面隐藏时，计时器工作不会停止，将计时器全部换成requestAnimationFrame，注：requestAnimationFrame接收的是一个函数

//设置小圆点的自动切换
var pages = document.querySelectorAll('.pageNavtion span')
//定义函数，完成对分页按钮颜色的更改
function change() {
  for (var i = 0; i < pages.length; i++) {
    if (i == current_index) {
      pages[i].className = 'select'
    } else {
      pages[i].className = ''
    }
  }
}
//给每一个分页按钮关联点击事件
var orclick = false //该变量用来标明是否被点击过
//定义函数，为分页按钮关联手动轮播点击事件
function hand_scroll() {
  for (var i = 0; i < pages.length; i++) {
    //为每一个分页按钮添加一个下标
    pages[i].index = i
    pages[i].onclick = function () {
      if (orclick == false) {
        //本次轮播有效
        orclick = true
        //关闭自动轮播
        cancelAnimationFrame(auto_ani)
        num = 0 //刷新频率
        //console.log(num);
        //alert(this.index);
        //获取分页按钮下标，绑定给current_index
        current_index = this.index
        //修改对应的分页按钮颜色
        change()
        //开启完成本次轮播---通过回调函数开启自动轮播
        onePicScroll(current_index, function () {
          frequency()
          //当完成本次图片轮播
          orclick = false
        })
      }
    }
  }
}
hand_scroll()
// //获取左右箭头
var btns = document.querySelectorAll('.btns img')
//var btns=document.querySelectorAll('.btns button');
//console.log(btns);
var or_btn_click = false
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    if (or_btn_click == false) {
      or_btn_click = true //说明被点击过
      //停止自动轮播
      cancelAnimationFrame(auto_ani)
      num = 0 //频率值重置
      //获取箭头的id属性值，根据id获取点击的是哪个箭头
      var id = this.getAttribute('id')
      console.log(id)
      if (id == 'pre') {
        //判断初始下标是否为0
        if (current_index == 0) {
          current_index = 6 //切换到最后一张图片
          //将轮播图的位置修改到current_index对应下标
          var style_w = getComputedStyle(document.querySelector('.carousel'))
          var w = parseInt(style_w.width)
          content.style.left = -(current_index * w) + 'px'
        }
        current_index--
      } else {
        current_index++
      }
      //进行上一页或下一页的轮播操作
      onePicScroll(current_index, function () {
        //重新开启轮播
        frequency()
        or_btn_click = false
        if (current_index >= 6) {
          current_index = 0
          content.style.left = 0
        }
        //重设图片下小圆点的高亮色
        change()
      })
    }
  }
}
