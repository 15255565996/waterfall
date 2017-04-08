window.onload = function() {
	waterFall('main', 'box');
	var dataInt = { "data": [{ "src": "1.jpg" }, { "src": "2.jpg" }, { "src": "3.jpg" }, { "src": "4.jpg" }, { "src": "5.jpg" }] }
	window.onscroll = function() {
		if(checkScrollSlide()) {
			console.log('loading')
			var oParent = document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i = 0; i < dataInt.data.length; i++) {
				var oChind = document.createElement('div');
				oChind.className = 'box';
				oParent.appendChild(oChind);
				var oPic = document.createElement('div');
				oPic.className='pic';
				oChind.appendChild(oPic);
				var oImg= document.createElement('img');
				oImg.src="img/"+dataInt.data[i].src
				oPic.appendChild(oImg);
			}
			waterFall('main', 'box');
		}
	}
}

//当盒子的宽度一旦发生变化 也要重新获取赋值
//浏览器宽度发生变化触发
window.onresize = function() {
	var reactTL = document.getElementsByClassName('box');
	//	console.log(reactTL)
	//	console.log(reactTL.length)
	for(var i = 0; i < reactTL.length; i++) {
		reactTL[i].style.cssText = "top:0px;left:0px;";
	}
	waterFall('main', 'box')
}

//瀑布流函数
function waterFall(parent, child) {
	//将main下的所有class为box的元素提取
	var oParent = document.getElementById(parent);
	var oChild = getByClass(oParent, child);
	//	console.log(oChild.length)
	//	计算整个页面显示的列数(页面宽度/box宽度)	
	var oChildW = oChild[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / oChildW);
	//设施main的宽
	oParent.style.cssText = 'width:' + oChildW * cols + 'px;margin:0 auto;';

	//存放每一列高度的数组
	var hArr = [];
	for(var i = 0; i < oChild.length; i++) {
		if(i < cols) {
			hArr.push(oChild[i].offsetHeight)
		} else {
			var minH = Math.min.apply(null, hArr);
			console.log(minH);
			var index = getMinhIndex(hArr, minH);
			oChild[i].style.position = 'absolute';
			oChild[i].style.top = minH + 'px';
			oChild[i].style.left = oChildW * index + 'px';
			//oChild[i].style.left=oChild[index].offsetLeft+'px';
			hArr[index] += oChild[i].offsetHeight;
		}
	}
	console.log(hArr)

}

//根据class获取元素
function getByClass(parent, child) {
	var boxArr = new Array();
	var oElements = parent.getElementsByTagName('*');
	for(var i = 0; i < oElements.length; i++) {
		if(oElements[i].className == child) {
			boxArr.push(oElements[i])
		}
	}
	return boxArr;
}

//最矮的box
function getMinhIndex(arr, val) {
	for(var i in arr) {
		if(arr[i] == val) {
			return i;
		}
	}
}

//检测是否具备了滚条加载数据的条件
function checkScrollSlide() {
	var oParent = document.getElementById('main');
	var oChild = getByClass(oParent, 'box');
	//当前  倒数第二个box距离顶部距离   +  底部最后一个box的一半高度
	var lastChildH = oChild[oChild.length - 1].offsetTop + Math.floor(oChild[oChild.length - 1].offsetHeight / 2);
	//当前滚动距离
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	//当前可视区域高度
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	console.log(lastChildH + '  ' + scrollTop + '  ' + height)
	return(lastChildH < scrollTop + height) ? true : false;
}