//登录窗口显示/切换/关闭按钮
$("#login").click(function(){
	$("#logBoxShadow").css("display","block");
})
$("#logBoxShadow .close").click(function(){
	$(this).parent().parent().css("display","none");
})
$(".logbtn").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	var ind = $(this).index();
	$(".log_showBox .log_show").eq(ind).css("display","block").siblings().css("display","none");
	//提交前清空另一个。
})

// session存储用户登录信息
$(document).ready(function(){
	if(sessionStorage.usName != ""){$("#userRem").prop("checked","checked");}
	$(".log_showA").find("input[name='name']").val(sessionStorage.usName);
	$(".log_showA").find("input[name='password']").val(sessionStorage.usWord);

	if(sessionStorage.conName != ""){$("#conRem").prop("checked","checked");}
	$(".log_showB").find("input[name='name']").val(sessionStorage.conName);
	$(".log_showB").find("input[name='password']").val(sessionStorage.conWord);
})

//用户登录按钮、是否存储登录信息
$("#userlogBtn").click(function(){
	if($("#userRem").is(":checked")){
		var usName = $("#userRem").parent().find("input[name='name']").val();
		sessionStorage.usName = usName;
		var usWord = $("#userRem").parent().find("input[name='password']").val();
		sessionStorage.usWord = usWord;
	}else{
		sessionStorage.usName = "";
		sessionStorage.usWord = "";
	}
	$("#userlog").submit();
})
//管理员登录按钮
$("#contrologBtn").click(function(){
	if($("#conRem").is(":checked")){
		var conName = $("#conRem").parent().find("input[name='name']").val();
		sessionStorage.conName = conName;
		var conWord = $("#conRem").parent().find("input[name='password']").val();
		sessionStorage.conWord = conWord;
	}else{
		sessionStorage.conName = "";
		sessionStorage.conWord = "";
	}
	$("#controlog").submit();
})

// 左侧导航
$("#leftNav .ListLabel").click(function(){
	var a = $(this).parent().find(".thrNavListBox").css("display");
	if(a == "block"){
		$(this).parent().find(".thrNavListBox").css("display","none");
		$(this).parent().find(".ListMoreBtn").text("▽");
	}
	else{
		$(this).parent().find(".thrNavListBox").css("display","block");
		$(this).parent().find(".ListMoreBtn").text("△");
	}	
})
$("#leftNav .thrNavLists").click(function(){
	$(this).css({"background-color":"#96b97d","color":"#fff"});
	$(this).siblings().css({"background-color":"","color":"#333"});
	$(this).parent().parent().siblings().find(".thrNavLists").css({"background-color":"","color":"#333"});
	//向后台请求重新渲染页面
})

//右侧导航
$("#rightNav .rightNavLabel").mouseenter(function(){
	$(this).find(".navHugeBox").css("display","block");
})
$("#rightNav .rightNavLabel").mouseleave(function(){
	$(this).find(".navHugeBox").css("display","none");
})