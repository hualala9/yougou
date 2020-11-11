window.addEventListener('load', function(){
    var focus=document.querySelector(".focus");
    var btn_l=document.querySelector(".btn_l");
    var btn_r=document.querySelector(".btn_r");
    var num=0;
    var circle=0;
    var focusWidth=focus.offsetWidth;
    //1.鼠标移入focus盒子时，按钮出现

    focus.addEventListener('mouseenter',function(){
        btn_l.style.display='block';
        btn_r.style.display='block';
        clearInterval(timer);
        timer=null;
    });
    //2.鼠标移出focus盒子时，按钮消失
    focus.addEventListener('mouseleave',function(){
        btn_l.style.display='none';
        btn_r.style.display='none';
        timer=setInterval(function(){
          btn_r.click();
        },2000)

    });
    //3.动态生成小圆圈，有多少张图片，就生成多少个小圈圈
    var ol=focus.querySelector(".circle");
    var ul=focus.querySelector("ul");
    //生成小圆圈
    for(var i=0;i<ul.children.length;i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
        //鼠标移动到小圆圈上面时，圆圈变色
        li.addEventListener('click',function(){
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='none';
            }
            this.className='current';
            var index=this.getAttribute('index');   
            num=index;
            circle=index;
            animate(ul,-index * focusWidth);

        });
        
    }
    //4选中第一个小圆圈
    ol.children[0].className='current';
    //5克隆第一张图片
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //节流阀
    var flag=true;
    //.6点击右侧按钮时，图片移动
    btn_r.addEventListener('click',function(){
        //7图片移动
        if(flag){
            flag=false;
          if(num==ul.children.length-1){
            num=0;
            ul.style.left=0;
        }
        num++;
        animate(ul,-num * focusWidth,function(){
            flag=true;
        });
        //8小圆圈变化
        circle++;
        if(circle==ol.children.length){
            circle=0;
        }
        circleChange();  
        }
        

    });
       //9点击左侧按钮，图片移动
    btn_l.addEventListener('click',function(){
        if(flag){
            //图片移动
        if(num==0){
            num=ul.children.length-1;
            ul.style.left=-num*focusWidth+'px';
        }
        num--;
        animate(ul,-num * focusWidth,function(){
            flag=true;
        });
        //小圆圈变化
        circle--;
        if(circle<0){
            circle=ol.children.length-1;
        }
        circleChange();

        }
        
    });



    function circleChange(){
       for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='none';
        }
        ol.children[circle].className='current'; 
    }
       //10.图片自动播放
      /*  var timer=setInterval(function(){
           btn_r.click();

       },2000); */
 

    

})