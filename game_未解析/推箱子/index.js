$(document).ready(function(){	
	Game.init($('#div1')); 
	//初始化	// alert("a");
});var Game = {	
	gk: [{
		//第一关				
		map : [					
			1,1,4,4,4,4,1,1,					
			1,1,4,2,2,4,1,1,					
			1,4,4,3,2,4,4,1,					
			1,4,3,3,3,2,4,1,					
			4,4,3,3,3,3,4,4,					
			4,3,3,4,3,3,3,4,					
			4,3,3,3,3,3,3,4,					
			4,4,4,4,4,4,4,4				
		],				
		xiangzi : [					
			{x: 4, y: 3},					
			{x: 3, y: 4},					
			{x: 4, y: 5},					
			{x: 5, y: 5}				
		],				
		me : {x:3 ,y:6}	
	}],	
init:function(id){		
	this.oParent = id;		
	this.createmap(0);	
},	
createmap: function(inow){		
	this.oParent.empty();		
	this.nowJson = this.gk[inow];		
	this.oParent.css('width',Math.sqrt(this.nowJson.map.length)*50);		
	$.each(this.nowJson.map , 
	$.proxy(function(i,elem){  //$.proxy替换this指针			
	this.oParent.append('<div class="bg'+elem +'"></div>')		
},this));	 		
	this.createBox();		
	this.createMe();	
},	
createBox :function(){  //创建箱子		
	$.each(this.nowJson.xiangzi,$.proxy(function(i,elem){			
		var oBox = $('<div class="xiangzi"></div>');			
		oBox.css({"left":elem.x*50,"top":elem.y*50});			
		this.oParent.append(oBox);		
	},this))	
},	
createMe : function(){  //创建我		
	var oP = $('<div class="me"></div>');		
	oP.css({"left":this.nowJson.me.x*50,"top":this.nowJson.me.y*50});		
	oP.data('x',this.nowJson.me.x);		
	oP.data('y',this.nowJson.me.y);		
	this.oParent.append(oP);		
	this.bindMe(oP);	
},	
bindMe : function(oP){ //操作人		
	$(document).keydown($.proxy(function(ev){			
	switch(ev.which){				
	case 37://←					
	this.runMe(oP,{x:-1});				
	break;				
	case 38://shang					
	this.runMe(oP,{y:-1});				
	break;				
	case 39://you					
	this.runMe(oP,{x:1});				
	break;				
	case 40://xia					
	this.runMe(oP,{y:1});				
	break;			
}		
},this));	
},	
runMe :function(oP,opt){		
	var stepX = opt.x||0;		
	var stepY = opt.y||0;		
	if(this.nowJson.map[(oP.data('y')+stepY)*Math.sqrt(this.nowJson.map.length)+oP.data('x')+stepX] !=4){			
	oP.data('x',oP.data('x')+stepX);			
	oP.data('y',oP.data('y')+stepY);			
	oP.css('left' , oP.data('x')*50);			
	oP.css('top' , oP.data('y')*50);			
	$('.xiangzi').each($.proxy(function(i,elem){				
	if(this.pz(oP,$(elem))&&this.nowJson.map[(oP.data('y')+stepY)*Math.sqrt(this.nowJson.map.length)+oP.data('x')+stepX] !=4){//判断是否碰到墙。碰到小乌龟弹回来					
		$(elem).css('left',(oP.data('x')+stepX)*50);					
		$(elem).css('top',(oP.data('y')+stepY)*50);					
		$('.xiangzi').each($.proxy(function(j,elem2){//遇到两个箱子的情况						
			if(this.pz($(elem),$(elem2))&&elem!=elem2){							
			$(elem).css('left',(oP.data('x'))*50);							
			$(elem).css('top',(oP.data('y'))*50);							
			oP.data('x',oP.data('x')-stepX);							
			oP.data('y',oP.data('y')-stepY);							
			oP.css('left' , oP.data('x')*50);							
			oP.css('top' , oP.data('y')*50);						
		}					
	},this));				
}else if (this.pz(oP,$(elem))){					
	oP.data('x',oP.data('x')-stepX);					
	oP.data('y',oP.data('y')-stepY);					
	oP.css('left' , oP.data('x')*50);					
	oP.css('top' , oP.data('y')*50);				
}			
},this));		
}		
	this.nextShow();	
},	
nextShow :function(){//下一关		
	var iNum =0;		
	$('.bg2').each($.proxy(function(i,elem){			
	$('.xiangzi').each($.proxy(function(j,elem2){				
	if(this.pz($(elem),$(elem2))){					
	iNum++;				
	}			
},this));		
},this));		
	if(iNum==$('.xiangzi').size()){			
	alert("下一关");			
	this.createMap(1);		
}	
},	
	pz :function(obj1,obj2) {		
	var L1=obj1.offset().left;		
	var R1=obj1.offset().left+obj1.width();		
	var T1=obj1.offset().top;		
	var B1=obj1.offset().top+obj1.height();		
	var L2=obj2.offset().left;		
	var R2=obj2.offset().left+obj2.width();		
	var T2=obj2.offset().top;		
	var B2=obj2.offset().top+obj2.height();		
	if(L1>=R2||R1<=L2||B1<=T2||T1>=B2){			
	return false;		
}else{			
return true;		}	}};