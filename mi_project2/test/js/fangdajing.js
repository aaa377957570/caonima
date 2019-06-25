window.onload = function () {
        forImg();
        window.onresize = function () {
            forImg();
        };
    }

    function forImg() {
        var enlarge = 4;
        var imgToBig = document.getElementsByClassName("img-to-big");
        var list = document.getElementsByClassName("result-list")[0];
        for (var i = 0; i < imgToBig.length; i++) {
            var smallBox = imgToBig[i].getElementsByClassName("small-box")[0];//小盒子
            var smallImg = smallBox.getElementsByClassName("small-img")[0];
            var tool = imgToBig[i].getElementsByClassName("tool")[0];//小盒子中的灰色区域
            var bigBox = imgToBig[i].getElementsByClassName("big-box")[0];//大盒子
            bigBox.style.left = smallBox.offsetLeft + smallBox.offsetWidth + "px";
            bigBox.style.top = smallBox.offsetTop + "px";
            var bigImg = imgToBig[i].getElementsByClassName("big-img")[0];//放大的图片
            var leftNum = smallBox.offsetParent;
            var num = leftNum.offsetLeft;
            imgSize(smallBox, smallImg, smallImg.getAttribute("src"), bigImg, enlarge);
            toBigImg(smallBox, tool, bigBox, bigImg, num, smallImg, list, enlarge);
        }

        function imgSize(smallBox, thisImg, src, bigImg, enlarge) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                var realWidth = img.width;
                var realHeight = img.height;
                if ((realWidth / smallBox.offsetWidth) >= (realHeight / smallBox.offsetHeight)) {//当展示的图片尺寸并不统一时，根据图片长宽比例确定图片以高度还是宽度为准进行缩放展示
                    thisImg.style.width = smallBox.offsetWidth + "px";
                    thisImg.style.height = "auto";
                    bigImg.style.width = smallBox.offsetWidth * enlarge + "px";
                    bigImg.style.height = "auto";
                } else {
                    thisImg.style.height = smallBox.offsetHeight + "px";
                    thisImg.style.width = "auto";
                    bigImg.style.height = smallBox.offsetHeight * enlarge + "px";
                    bigImg.style.width = "auto";
                }
            }
        }

        function toBigImg(smallBox, tool, bigBox, bigImg, num, smallImg, list, enlarge) {
            smallBox.onmouseenter = function () {
                tool.className = "tool active";
                bigBox.className = "big-box active";
            };
            //鼠标离开小盒子区域，不显示黄色区域和大盒子
            smallBox.onmouseleave = function () {
                tool.className = "tool";
                bigBox.className = "big-box";
            };
            //鼠标在小盒子内移动
            smallBox.onmousemove = function (e) {
                var _e = window.event || e;//事件对象
				var objPro = document.getElementsByClassName("pro-choose-main")[0];
				var xm = objPro.offsetLeft;
				//console.log("x:"+xm);
				//console.log(objPro);
        var x = _e.clientX - this.offsetLeft - tool.offsetWidth / 2 - num - xm - 130;//事件对象在小盒子内的横向偏移量
				var y;//竖向偏移量
				//console.log("y"+y);
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				//console.log(scrollTop);
				if(scrollTop<300){
				   y = _e.clientY - this.offsetTop - list.offsetTop - tool.offsetHeight / 2 - 230 + scrollTop;//竖向偏移量 
				}else if(scrollTop>=300){
					y = _e.clientY - this.offsetTop - list.offsetTop - tool.offsetHeight / 2 - 50;//竖向偏移量 
				}else if(scrollTop>=900){
					y = _e.clientY - this.offsetTop - list.offsetTop - tool.offsetHeight / 2 + 430 + scrollTop;//竖向偏移量 
				}
             
                if (x < 0) {
                    x = 0;//当左偏移出小盒子时，设为0
                }
                if (y < 0) {
                    y = 0;//当上偏移出小盒子时，设为0
                }
                if (x > this.offsetWidth - tool.offsetWidth) {
                    x = this.offsetWidth - tool.offsetWidth;//当右偏移出小盒子时，设为小盒子的宽度-黄色放大区域宽度
                }
                if (y > this.offsetHeight - tool.offsetHeight) {
                    y = this.offsetHeight - tool.offsetHeight;//当下偏移出小盒子时，设为小盒子的高度-黄色放大区域高度
                }
                tool.style.left = x + "px";//灰色放大区域距离小盒子左偏距
                tool.style.top = y + "px";//灰色放大区域距离小盒子上偏距
                bigImg.style.left = (-x + smallImg.offsetLeft) * enlarge + "px";//放大图片移动方向相反，偏移距离加倍
                bigImg.style.top = (-y + smallImg.offsetTop) * enlarge + "px";
            }
        }
    }