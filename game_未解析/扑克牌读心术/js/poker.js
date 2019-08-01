/* 
 * @auther jackielee
 * 花色0-黑桃 1-梅花 2-方块  3-红桃 4-大鬼  5-小鬼
 * 数值0-13代表 鬼,1,2,3,4,5,6,7,8,9,10,J,Q,K;
 * This JS is written by jackielee.
 * If you have any questions, please email me.
 * E(1335244575@qq.com)
 */
var allCards = [];//总牌
var radomCards = [];//随机牌存储数组
var oneStack = [];//存储栈1
var twoStack = [];//存储栈2
var threeStack = [];//存储栈3
var flag = 0;//状态标志 0=开始
var xflag = 0;
//第一步：写一个生产扑克牌对象的方法
var Cards = (function () {
    var Card = function (number, type) {
        this.number = number;
        this.type = type;
    };
    return function (number, type) {
        return new Card(number, type);
    };
})();
var poker = {
    "CreatCompeleteCard":function(){
        var index = 2;
        var arr = [];
        for (var i = 0; i <= 13; i++) {
            if (i === 0) {
                arr[0] = new Cards(i, 4);
                arr[1] = new Cards(i, 5);
            } else {
                for (var j = 0; j <= 3; j++) {
                    arr[index] = new Cards(i, j);
                    index++;
                }
            }
        }
        allCards = this.SortCards(arr);
        this.Show();
    },
    "SortCards":function(arr){
        arr.sort(function (a, b) {
            return 0.5 - Math.random();
        });
        return arr;
    },
    "Show":function(){
        //该show方法是用来在页面展示当前牌的动向
        var lenOld = allCards.length;
        var html = '<ul class="pokerlists">';
        //花色0-黑桃 1-梅花 2-方块  3-红桃 4-大鬼  5-小鬼
        for (var i = 0; i < 21; i++) {
            radomCards[i] = new Cards(allCards[i].number,allCards[i].type);
            html += '<li class="img"><img class="pk" src="./poker/' + this.typetonum(allCards[i].type) + '_' + allCards[i].number + '.png" /></li>';
        }
        html += '</ul>';
        oneStack = radomCards.slice(0, 7);
        twoStack = radomCards.slice(7, 14);
        threeStack = radomCards.slice(14, 21);
        document.getElementById("container").innerHTML = html;
    },
    "typetonum":function(type){
        switch (type) {
            case 0:type = 's';break;
            case 1:type = 'c'; break;
            case 2:type = 'd';break;
            case 3:type = 'h';break;
            case 4:type = '1';break;
            case 5:type = '0';break;
        }
        return type;
    }
};
poker.CreatCompeleteCard();


