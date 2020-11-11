window.addEventListener('load',function(){
    var mask=document.querySelector(".mask");
    var big=document.querySelector(".big");
    var preview_img=document.querySelector(".preview_img");
    preview_img.addEventListener('mouseover',function(){
        mask.style.display='block';
        big.style.display='block';
    });
    preview_img.addEventListener('mouseout',function(){
        mask.style.display='none';
        big.style.display='none';
    });
    preview_img.addEventListener('mousemove',function(e){
        // mask的最大移动距离
        var maskMx=this.offsetWidth-mask.offsetWidth;
        var maskMy=this.offsetHeight-mask.offsetHeight;
        //获取鼠标在盒子中的坐标
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        //mask的移动距离
        maskX=x-mask.offsetWidth/2;
        maskY=y-mask.offsetHeight/2;  
        if(maskX<=0){
            maskX=0;
        } else if(maskX>=maskMx){
            maskX=maskMx;
        }
        if(maskY<=0){
            maskY=0;
        }else if(maskY>=maskMy){
            maskY=maskMy;
        }  
        mask.style.left=maskX + 'px';
        mask.style.top=maskY+'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图片的移动距离=遮挡层的移动距离*大图片的最大移动距离/遮挡层的最大移动距离
        var bigImg=document.querySelector('.bigimg');
        var bigMax=bigImg.offsetWidth-big.offsetWidth;
        var bigMay=bigImg.offsetHeight-big.offsetHeight;
         // 大图片最大移动距离
        // var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        console.log(bigMax);
        var bigX=maskX*bigMax/maskMx;
        var bigY=maskY*bigMay/maskMy;
        bigImg.style.left=-bigX+'px';
        bigImg.style.top=-bigY+'px';
    })
})