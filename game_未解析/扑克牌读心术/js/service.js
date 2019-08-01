/* 
 * This JS is written by jackielee.
 * If you have any questions, please email me.
 * E(1335244575@qq.com)
 */
var ser = {
    "reset":function(){
        flag = 0;
        xflag = 0;
        allCards = [];//总牌
        radomCards = [];//随机牌存储数组
        oneStack = [];//存储栈1
        twoStack = [];//存储栈2
        threeStack = [];//存储栈3
        poker.CreatCompeleteCard();
    },
    "start":function(){
        $(".pk").attr("src","./poker/bg_4.png");
        this.nodeal();
    },
    "shuffle":function(){
        var one = 0,two = 0,three = 0;
        for(var i=20;i>=0;i--){
            if((i+1) % 3 == 1){
                oneStack[one++] = radomCards[i];
            } else if((i+1)%3 == 2){
                twoStack[two++] = radomCards[i];
            } else {
                threeStack[three++] = radomCards[i];
            }
        }
        this.show();
    },
    "deal":function(){
        if(flag === 1){
            var tmp = oneStack.concat(twoStack).slice(7);
            twoStack = twoStack.concat(oneStack).slice(7);
            oneStack = tmp;
        } else if(flag === 3){
            var tmp = threeStack.concat(twoStack).slice(7);
            twoStack = twoStack.concat(threeStack).slice(7);
            threeStack = tmp;
        }
        radomCards = oneStack.concat(twoStack, threeStack);
		xflag++;
        if(xflag >= 3){
            xflag = flag = 99;
            window.wxc.xcConfirm(this.loop(radomCards,0), window.wxc.xcConfirm.typeEnum.info);
            return ;
        }
        this.shuffle();
    },
    "nodeal":function(){
        var html = '';
        if(flag === 0){
            html = this.loop(oneStack,1);
            flag=1;
        }else if(flag === 1){
			html = this.loop(twoStack,1);
            flag=2;
        } else if(flag === 2){
			html = this.loop(threeStack,1);
            flag=3;
        } else {
            alert('别闹');return;
        }
        window.wxc.xcConfirm(html, window.wxc.xcConfirm.typeEnum.success);
    },
    "show":function(){
        flag =1;
        window.wxc.xcConfirm(this.loop(oneStack,1), window.wxc.xcConfirm.typeEnum.success);
    },
	"loop":function(stack,f){
		var len = stack.length;
		var html = '<ul class="lists">';
		if(f === 1){
			for(var i = 0; i < len;i++){
				html += '<li class="img"><img class="pk" src="./poker/' + poker.typetonum(stack[i].type) + '_' + stack[i].number + '.png" /></li>';
			}
		} else {
			html += '<li class="img"><img class="pk" src="./poker/' + poker.typetonum(stack[Math.floor(len/2)].type) + '_' + stack[Math.floor(len/2)].number + '.png" /></li>';
		}
		html += '</ul>';
		return html;
	}
};

